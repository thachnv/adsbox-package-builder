// import config from '../business/config.js';
import cache from './request-cache';
var API_END_POINT = 'http://polls.apiblueprint.org/api/v1/';
const $ = window.jQuery;

const api = {
  _log: false,
  extraOptions: {
    headers: {
      // 'request-id': Math.round(Math.random() * 1000000),
    },
    contentType: 'application/json;charset=UTF-8',
    type: 'json',
    crossDomain: true,
  },

  log(...args) {
    this._log && console.log('[API]', ...args);
  },
  /**
   * This method return a $.Deferred will resolve when the request is complete (or cache)
   */
  _sendRequest(url, data, method, disableCache, extraHeaders) {
    const cacheKey = url + '[' + (data ? JSON.stringify(data)
      + JSON.stringify(extraHeaders) : '') + ']';

    const extraOptions = JSON.parse(JSON.stringify(this.extraOptions));
    extraOptions.headers = Object.assign({}, extraOptions.headers, extraHeaders);

    const ajax = () => {
      const options = $.extend({}, {
        data: JSON.stringify(data),
      }, extraOptions, {
        url: API_END_POINT + url,
        method,
      });
      this.log('Request sent: ', cacheKey, options);
      return $.ajax(options).then((response) => {
        cache.set(cacheKey, response);
        this.log('Request cached: ' + cacheKey);
        return response;
      });
    };

    if (disableCache) {
      this.log('Request sent without cache: ' + cacheKey);
      return ajax();
    }
    // Use cache
    // Try to get data from cache
    const response = cache.get(cacheKey);
    if (response) {
      this.log('Returning cached request: ' + cacheKey);
      return $.Deferred().resolve(response);
    }

    this.log('Asked for cache but not found, sending request: ' + cacheKey);
    // No cache available
    return ajax();
  },
  get(url, data, disableCache, extraHeaders) {
    return this._sendRequest(url, data, 'GET', disableCache, extraHeaders);
  },
  /**
   * Post requests never use cache
   */
  post(url, data) {
    return this._sendRequest(url, data, 'POST', true);
  },
  put(url, data, extraHeaders) {
    return this._sendRequest(url, data, 'PUT', true, extraHeaders);
  },
  delete(url, data, extraHeaders) {
    return this._sendRequest(url, data, 'DELETE', true, extraHeaders);
  },
  upload(url, formData) {
    return $.ajax({
      url: API_END_POINT + url,
      type: 'PUT',
      data: formData,
      processData: false,
      contentType: false,
    });
  },
  uploadPost(url, formData) {
    return $.ajax({
      url: API_END_POINT + url,
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
    });
  },
  clearCache(key) {
    this.log('Clear cache:', key);
    cache.clear(key);
  },
};

export default api;
