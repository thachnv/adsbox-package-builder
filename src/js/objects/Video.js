export default fabric.util.createClass(fabric.Image, {
  type: 'video',
  initialize: function init(element, options) {
    this.callSuper('initialize', element, options);
    options && this.set('url', options.url);
  },
  toObject: function toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), { url: this.url });
  },
});
