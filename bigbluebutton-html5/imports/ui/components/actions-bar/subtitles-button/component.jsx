import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import withShortcutHelper from '/imports/ui/components/shortcut-help/service';
import Styled from './styles';
import { useSubtitleSettings } from '/imports/ui/hooks/useSubtitleSettings';
import { FontAwesomeIcon } from 'react-icons';
import { FaClosedCaptioning } from 'react-icons/fa';

const SubtitlesButton = ({ intl, shortcuts, amIModerator }) => {
    const { settings, updateSettings } = useSubtitleSettings();
    const { enabled, visible } = settings;

    const intlMessages = defineMessages({
        enableSubtitles: {
            id: 'app.actionsBar.subtitles.enable',
            defaultMessage: 'Включить субтитры',
        },
        disableSubtitles: {
            id: 'app.actionsBar.subtitles.disable',
            defaultMessage: 'Выключить субтитры',
        },
        visibleSubtitles: {
            id: 'app.actionsBar.subtitles.visible',
            defaultMessage: 'Сделать субтитры видимыми',
        },
        invisibleSubtitles: {
            id: 'app.actionsBar.subtitles.invisible',
            defaultMessage: 'Скрыть субтитры',
        },
    });

    const handleToggleEnabled = () => {
        updateSettings({ enabled: !enabled });
        document.activeElement.blur();
    };

    const handleToggleVisibility = () => {
        updateSettings({ visible: !visible });
        document.activeElement.blur();
    };

    const enableLabel = enabled
        ? intlMessages.disableSubtitles
        : intlMessages.enableSubtitles;

    const visibilityLabel = visible
        ? intlMessages.invisibleSubtitles
        : intlMessages.visibleSubtitles;

    return (
        <>
            {/* Кнопка для модератора — включает/выключает субтитры */}
            {/* {amIModerator && (
                <Styled.SubtitlesButton
                    data-test="toggleSubtitlesBtn"
                    icon="closed_caption"
                    label={intl.formatMessage(enableLabel)}
                    onClick={handleToggleEnabled}
                    color={enabled ? 'primary' : 'default'}
                    accessKey={shortcuts?.subtitles}
                    hideLabel
                    circle
                    size="lg"
                    title={enabled ? 'Выключить субтитры для всех' : 'Включить субтитры для всех'}
                />
            )} */}

            <Styled.SubtitlesButton
                data-test="toggleVisibilityBtn"
                icon="closed_caption"
                label={intl.formatMessage(visibilityLabel)}
                onClick={handleToggleVisibility}
                color={visible ? 'primary' : 'default'}
                hideLabel
                circle
                size="lg"
                disabled={!enabled}
                title={
                    !enabled
                    ? 'Субтитры выключены'
                    : visible
                        ? 'Скрыть субтитры'
                        : 'Показать субтитры'
                }
            />

            
        </>
    );
};

SubtitlesButton.propTypes = {
    intl: PropTypes.shape({
        formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    shortcuts: PropTypes.shape({
        subtitles: PropTypes.string,
    }),
    amIModerator: PropTypes.bool,
};

export default withShortcutHelper(SubtitlesButton, ['subtitles']);
