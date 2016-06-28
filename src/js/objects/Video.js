export default fabric.util.createClass(fabric.Image, {
  type: 'video',
  initialize: function init(element, options) {
    this.callSuper('initialize', element, options);
    options && this.set('src', options.src);
  },
  toObject: function toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), { src: this.src });
  },
});
