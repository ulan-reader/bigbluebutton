import ObservableStorage from './observable';
import { SubtitleSettings } from '../../Types/subtitle';

const storage = new ObservableStorage(window.localStorage, 'SUB_');

const defaultState: SubtitleSettings = {
    enabled: true,
    visible: false,
    mode: 'recorded',
};

if (!storage.getItem('subtitleSettings')) {
    storage.setItem('subtitleSettings', defaultState);
}

export default storage;
