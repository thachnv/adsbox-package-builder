export default {
  zoom(objects, factor) {
    objects.forEach(object => {
      const scaleX = object.scaleX;
      const scaleY = object.scaleY;
      const left = object.left;
      const top = object.top;

      const tempScaleX = scaleX * factor;
      const tempScaleY = scaleY * factor;
      const tempLeft = left * factor;
      const tempTop = top * factor;

      object.scaleX = tempScaleX;
      object.scaleY = tempScaleY;
      object.left = tempLeft;
      object.top = tempTop;

      if (typeof object.setCoords === 'function') {
        object.setCoords();
      }
    });
  },
  alignCenter(object, containerWidth) {
    object.set('left', (containerWidth - object.getWidth()) / 2);
  },
  alignLeft(object, containerWidth) {
    // object.set('left', this.canvas.width / 2 - object.getWidth() / 2);
    object.set('left', containerWidth / 2 - object.getWidth());
    // object.set('left', 0);
    object.setCoords();
  },
  alignRight(object, containerWidth) {
    object.set('left', containerWidth / 2);
  },
  alignMiddle(object, containerHeight) {
    object.set('top', (containerHeight - object.getHeight()) / 2);
  },
  alignTop(object, containerHeight) {
    object.set('top', containerHeight / 2 - object.getHeight());
  },
  alignBottom(object, containerHeight) {
    object.set('top', containerHeight / 2);
  },
  full(object, containerWidth, containerHeight) {
    const scaleX = containerWidth / object.width;
    const scaleY = containerHeight / object.height;
    object.set('scaleX', scaleX);
    object.set('scaleY', scaleY);
  },
  fill(object, containerWidth, containerHeight) {
    const widthRatio = containerWidth / object.width;
    const heightRatio = containerHeight / object.height;
    let scale;
    if (widthRatio > heightRatio) {
      scale = widthRatio;
    } else {
      scale = heightRatio;
    }
    object.set('scaleX', scale);
    object.set('scaleY', scale);
    object.setCoords();
  },
  fit(object, containerWidth, containerHeight) {
    const widthRatio = containerWidth / object.width;
    const heightRatio = containerHeight / object.height;
    let scale;
    if (widthRatio > heightRatio) {
      scale = heightRatio;
    } else {
      scale = widthRatio;
    }
    object.set('scaleX', scale);
    object.set('scaleY', scale);
    object.setCoords();
  },
};
