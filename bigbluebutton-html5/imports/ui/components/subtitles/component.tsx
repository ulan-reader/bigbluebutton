// import React, { useEffect, useRef, useState } from 'react';
// import { useSubtitleSettings } from '../../hooks/useSubtitleSettings';

// const LiveSubtitles = () => {
//     const { settings, updateSettings } = useSubtitleSettings();
//     const [text, setText] = useState('');
//     const wsRef = useRef<WebSocket | null>(null);
//     const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
//     const containerRef = useRef<HTMLDivElement | null>(null);
//     const [connected, setConnected] = useState(false);

//     const connect = () => {
//         const ws = new WebSocket('ws://localhost:3030/ws');
//         wsRef.current = ws;

//         ws.onopen = () => {
//             console.log('✅ WS connected');
//             setConnected(true);
//         }

//         ws.onmessage = async (event) => {
//             try {
//                 const data = JSON.parse(event.data);
//                 if (!data?.text) return;

//                 // --- Новый логика для "final" ---
//                 if (data.f_type === 'final') {
//                     setTimeout(() => setText(data.text.trim()), 600);
//                     return;
//                 }
//                 setText(data.text.trim());

//                 setText((prev) => {
//                     // если текст в начале пустой, просто обновляем
//                     if (!prev.trim()) return data.text.trim();
//                     // иначе заменяем на новый (не накапливаем)
//                     return data.text.trim();
//                 });
//             } catch (e) {
//                 console.error('Ошибка парсинга WS:', e);
//             }
//             };

//         ws.onclose = () => {
//             console.warn('⚠️ WebSocket закрыт, попытка переподключения...');
//             setConnected(false);
//             // Переподключаем через 3 секунды
//             reconnectTimeout.current = setTimeout(connect, 3000);
//         }

//         ws.onerror = (err) => {
//             console.error('❌ WebSocket ошибка:', err);
//             ws.close();
//         };
//     };

//     useEffect(() => {
//         if (settings.mode === 'recorded') setText('');
//     }, [settings.mode]);

//     useEffect(() => {
//         connect();

//         return () => {
//             if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
//             wsRef.current?.close();
//         };
//     }, []);

//     useEffect(() => {
//         const ws = wsRef.current;

//         if (!ws || ws.readyState !== WebSocket.OPEN) return;

//         if (!settings.enabled) {
//             updateSettings({ visible: false });
//             ws.send('stop');
//             return;
//         } else {
//             ws.send('start');
//         }

//         switch (settings.mode) {
//             case 'realtime':
//                 ws.send('realtime');
//                 break;
//             case 'recorded':
//                 setText('');
//                 ws.send('recorded');
//                 break;
//             default:
//                 ws.send('stop');
//         }
//     }, [settings.enabled, settings.mode]);

    
//     useEffect(() => {
//         const el = containerRef.current;
//         if (!el) return;

//         // если текст пустой — прокручиваем в начало
//         if (!text.trim()) el.scrollLeft = 0;
//         // иначе — в конец (чтобы текст не обрезался)
//         else el.scrollLeft = el.scrollWidth;

//     }, [text]);

//     return (
//         <div
//             style={{
//                 gridColumn: '1 / span 3',
//                 display: settings.visible ? 'flex' : 'none',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 padding: '6px 10px',
//                 background: 'rgba(255,255,255,0.85)', // слегка видимый фон
//                 borderRadius: '6px',
//                 margin: '4px auto',
//                 maxWidth: '80%', // ближе к центру
//                 boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
//                 height: '40px',
//             }}
//         >
//             <div
//                 ref={containerRef}
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     overflowX: 'auto',
//                     whiteSpace: 'nowrap',
//                     fontSize: '16px',
//                     color: '#111',
//                     fontWeight: 500,
//                     textAlign: 'center',
//                     scrollbarWidth: 'none',
//                     msOverflowStyle: 'none',
//                     width: '100%',
//                 }}
//             >
//                 {connected
//                     ? text || <span style={{ opacity: 0.4 }}>Ожидание субтитров...</span>
//                     : <span style={{ opacity: 0.4 }}>🔄 Переподключение...</span>}
//                 {/* {text} */}
//                 {/* {text} || <span style={{ opacity: 0.4 }}>Ожидание субтитров...</span>} */}
//             </div>
//         </div>
//     );
// };

// export default LiveSubtitles;
// был нормальный код, но сейчас временно отключен
import React, { useEffect, useRef, useState } from 'react';
import { useSubtitleSettings } from '../../hooks/useSubtitleSettings';

const LiveSubtitles = () => {
    const { settings } = useSubtitleSettings();
    const [text, setText] = useState('');
    const [displayedText, setDisplayedText] = useState('');
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const [connected, setConnected] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const typingTimeout = useRef<NodeJS.Timeout | null>(null);

    const connect = () => {
        if (wsRef.current) return;

        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.hostname;
        // const port = 3030;
        const ws = new WebSocket(`${protocol}//${host}/subtitles`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('✅ WS connected');
            setConnected(true);
            // ws.send(settings.mode === 'realtime' ? 'realtime' : 'recorded');
            // if (settings.enabled) ws.send('start');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (!data?.text) return;
                const newText = data.text.trim();
                setText(newText);
            } catch (e) {
                console.error('Ошибка парсинга WS:', e);
            }
        };

        ws.onclose = () => {
            console.warn('⚠️ WebSocket закрыт, попытка переподключения...');
            setConnected(false);
            wsRef.current = null;
            reconnectTimeout.current = setTimeout(connect, 3000);
        };

        ws.onerror = (err) => {
            console.error('❌ WebSocket ошибка:', err);
            ws.close();
        };
    };

    useEffect(() => {
        connect();
        return () => {
            if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
            if (typingTimeout.current) clearTimeout(typingTimeout.current);
            wsRef.current?.close();
            wsRef.current = null;
        };
    }, []);

    // useEffect(() => {
    //     const ws = wsRef.current;
    //     if (!ws || ws.readyState !== WebSocket.OPEN) return;

    //     if (!settings.enabled) {
    //         updateSettings({ visible: false });
    //         ws.send('stop');
    //         setText('');
    //         setDisplayedText('');
    //         return;
    //     }

    //     ws.send(settings.mode === 'realtime' ? 'realtime' : 'recorded');
    //     ws.send('start');
    // }, [settings.enabled, settings.mode]);

    // 🧠 эффект "печатания"
    useEffect(() => {
        if (!text) {
            setDisplayedText('');
            return;
        }

        // если до этого текст был пуст — запускаем печать посимвольно
        if (!displayedText.trim()) {
            let i = 0;
            const chars = text.split('');
            const printNext = () => {
                setDisplayedText(chars.slice(0, i + 1).join(''));
                i++;
                if (i < chars.length) {
                typingTimeout.current = setTimeout(printNext, 35); // скорость печати
                }
            };
            printNext();
        } else {
            // если был уже текст — просто заменяем без анимации
            setDisplayedText(text);
        }
    }, [text]);

    // автопрокрутка
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollLeft = displayedText.trim() ? el.scrollWidth : 0;
    }, [displayedText]);

    return (
        <div
            style={{
                display: settings.visible ? 'flex' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.85)',
                borderRadius: '6px',
                margin: '4px auto',
                maxWidth: '80%',
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                height: '40px',
            }}
        >
            <div
                ref={containerRef}
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                fontSize: '16px',
                color: '#111',
                fontWeight: 500,
                textAlign: 'center',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                width: '100%',
                }}
            >
                {connected
                ? displayedText || <span style={{ opacity: 0.4 }}>Ожидание субтитров...</span>
                : <span style={{ opacity: 0.4 }}>🔄 Переподключение...</span>}
            </div>
        </div>
    );
};

export default LiveSubtitles;
