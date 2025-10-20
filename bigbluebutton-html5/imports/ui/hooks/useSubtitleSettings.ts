import { useEffect, useState } from 'react';
import subtitlesStorage from '../services/storage/subtitles';
import { SubtitleSettings } from '../Types/subtitle';

export const useSubtitleSettings = () => {
    const [settings, setSettings] = useState<SubtitleSettings>(
        (subtitlesStorage.getItem('subtitleSettings') as SubtitleSettings) ?? {
            enabled: true,
            visible: false,
            mode: 'recorded',
        }
    );

    useEffect(() => {
        const update = (value: unknown) => {
        try {
            if (typeof value === 'object' && value !== null && 'enabled' in value && 'visible' in value && 'mode' in value) {
                setSettings(value as SubtitleSettings);
            }
        } catch {
        // игнорируем мусор
        }
    };

    subtitlesStorage.registerObserver('subtitleSettings', update);
    return () => subtitlesStorage.revokeObserver('subtitleSettings', update);
    }, []);

    const updateSettings = (patch: Partial<SubtitleSettings>) => {
        const current = (subtitlesStorage.getItem('subtitleSettings') as SubtitleSettings) ?? {};
        const newSettings = { ...current, ...patch };
        subtitlesStorage.setItem('subtitleSettings', newSettings);
    };

    return { settings, updateSettings };
};
