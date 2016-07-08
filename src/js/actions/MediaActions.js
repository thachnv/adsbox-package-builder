import AppDispatcher from '../third-party/dispatcher.js';
import { ActionTypes, API } from '../constant';
import Api from '../utils/api.js';

export default {
  getMediaList(type) {
    const offset = 0;
    const limit = 100;
    let url = `${API.MEDIA}?offset=${offset}&limit=${limit}`;
    if (type) {
      url += `&asset_type=${type}`;
    }
    Api
      .get(url)
      .done((response) => {
        AppDispatcher.dispatch({
          actionType: ActionTypes.GET_MEDIA_SUCCESS,
          data: response.assets,
        });
      });
  },
  selectMedia(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SELECT_MEDIA,
      data: id,
    });
  },
  removeSelectedMedia() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.REMOVE_SELECTED_MEDIA,
    });
  },
};
