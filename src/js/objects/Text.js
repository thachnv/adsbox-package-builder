export default fabric.util.createClass(fabric.Text, {
  initialize: function init(element, options) {
    this.callSuper('initialize', element, options);
    options && this.set('animation', options.animation);
  },
  toObject: function toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), { animation: this.animation });
  },
});
