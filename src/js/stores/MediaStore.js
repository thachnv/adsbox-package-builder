import AppDispatcher from '../third-party/dispatcher.js';
import { ActionTypes } from '../constant';
import Store from './Store.js';

let _selectedMedia = null;
let _mediaList = null;

class MediaStore extends Store {
  constructor(...args) {
    super(...args);
    this.registerActionHandlers();
  }

  setMediaList(data) {
    _mediaList = data;
  }

  setSelectedMedia(data) {
    _selectedMedia = data;
  }

  getMediaList() {
    return _mediaList;
  }

  getSelectedMedia() {
    return _selectedMedia;
  }

  registerActionHandlers() {
    return AppDispatcher.register((action) => {
      if (action.actionType === ActionTypes.GET_MEDIA_SUCCESS) {
        this.setMediaList(action.data);
        this.emitChange();
        return;
      }
      if (action.actionType === ActionTypes.SELECT_MEDIA) {
        this.setSelectedMedia(action.data);
        this.emitChange();
        return;
      }
      if (action.actionType === ActionTypes.REMOVE_SELECTED_MEDIA) {
        this.setSelectedMedia(null);
        this.emitChange();
      }
    });
  }
}

export default new MediaStore();
