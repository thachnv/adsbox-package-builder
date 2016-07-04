import React from 'react';
import Video from '../../objects/Video.js';
import Website from '../../objects/Website.js';
import Text from '../../objects/Text';
import TextProperties from '../TextProperties/TextProperties.js';
import ImageProperties from '../ImageProperties/ImageProperties.js';
import VideoProperties from '../VideoProperties/VideoProperties.js';
import WebProperties from '../WebProperties/WebProperties.js';
import {ARRANGEMENT, SCALING_STYLES, API} from '../../constant.js';
import InputVideoDialog from '../InputVideoDialog/InputVideoDialog';
import InputWebsiteDialog from '../InputWebsiteDialog/InputWebsiteDialog';
import InputImageDialog from '../InputImageDialog/InputImageDialog';
import InputTemplateNameDialog from '../InputTemplateNameDialog/InputTemplateNameDialog';
import classNames from 'classnames';
import api from '../../utils/api';

export default class TemplateBuilderApp extends React.Component {
  constructor() {
    super();
    this.canvas = null;
    this.state = {
      activeProp: null,
      activePropType: null,
      selectedArrangement: ARRANGEMENT.CENTER_MIDDLE,
      isPreview: false,
    };
    this.activeObject = null;
    this.arrangementButtons = [
      {label: 'Center', key: ARRANGEMENT.CENTER_MIDDLE, className: 'arrangement-center-button'},
      {label: 'Left', key: ARRANGEMENT.MIDDLE_LEFT, className: 'arrangement-left-button'},
      {label: 'Right', key: ARRANGEMENT.MIDDLE_RIGHT, className: 'arrangement-right-button'},
      {label: 'Top', key: ARRANGEMENT.CENTER_TOP, className: 'arrangement-top-button'},
      {label: 'Bottom', key: ARRANGEMENT.CENTER_BOTTOM, className: 'arrangement-bottom-button'},
    ];
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.refs.mainCanvas);
    this.canvas.on('object:selected', this.getActiveObject.bind(this));
    // const o = [{
    //   "type": "video",
    //   "originX": "center",
    //   "originY": "center",
    //   "left": 960,
    //   "top": 540,
    //   "width": 480,
    //   "height": 360,
    //   "fill": "rgb(0,0,0)",
    //   "stroke": null,
    //   "strokeWidth": 0,
    //   "strokeDashArray": null,
    //   "strokeLineCap": "butt",
    //   "strokeLineJoin": "miter",
    //   "strokeMiterLimit": 10,
    //   "scaleX": 3,
    //   "scaleY": 3,
    //   "angle": 30,
    //   "flipX": false,
    //   "flipY": false,
    //   "opacity": 1,
    //   "shadow": null,
    //   "visible": true,
    //   "clipTo": null,
    //   "backgroundColor": "",
    //   "fillRule": "nonzero",
    //   "globalCompositeOperation": "source-over",
    //   "transformMatrix": null,
    //   "skewX": 0,
    //   "skewY": 0,
    //   "src": "http://html5demos.com/assets/dizzy.mp4",
    //   "filters": [],
    //   "resizeFilters": [],
    //   "crossOrigin": "",
    //   "alignX": "none",
    //   "alignY": "none",
    //   "meetOrSlice": "meet"
    // }, {
    //   "type": "website",
    //   "originX": "center",
    //   "originY": "center",
    //   "left": 1332,
    //   "top": 616.5,
    //   "width": 440,
    //   "height": 330,
    //   "fill": "rgb(0,0,0)",
    //   "stroke": null,
    //   "strokeWidth": 0,
    //   "strokeDashArray": null,
    //   "strokeLineCap": "butt",
    //   "strokeLineJoin": "miter",
    //   "strokeMiterLimit": 10,
    //   "scaleX": 2.55,
    //   "scaleY": 2.55,
    //   "angle": 0,
    //   "flipX": false,
    //   "flipY": false,
    //   "opacity": 1,
    //   "shadow": null,
    //   "visible": true,
    //   "clipTo": null,
    //   "backgroundColor": "",
    //   "fillRule": "nonzero",
    //   "globalCompositeOperation": "source-over",
    //   "transformMatrix": null,
    //   "skewX": 0,
    //   "skewY": 0,
    //   "src": "https://support.files.wordpress.com/2009/07/pigeony.jpg?w=688",
    //   "url": "https://support.files.wordpress.com/2009/07/pigeony.jpg?w=688",
    //   "filters": [],
    //   "resizeFilters": [],
    //   "crossOrigin": "",
    //   "alignX": "none",
    //   "alignY": "none",
    //   "meetOrSlice": "meet"
    // }, {
    //   "type": "text",
    //   "originX": "center",
    //   "originY": "center",
    //   "left": 500,
    //   "top": 540,
    //   "width": 123.02,
    //   "height": 53.74,
    //   "fill": "#ba0000",
    //   "stroke": null,
    //   "strokeWidth": 1,
    //   "strokeDashArray": null,
    //   "strokeLineCap": "butt",
    //   "strokeLineJoin": "miter",
    //   "strokeMiterLimit": 10,
    //   "scaleX": 3,
    //   "scaleY": 3,
    //   "angle": 10,
    //   "flipX": false,
    //   "flipY": false,
    //   "opacity": 1,
    //   "shadow": null,
    //   "visible": true,
    //   "clipTo": null,
    //   "backgroundColor": "",
    //   "fillRule": "nonzero",
    //   "globalCompositeOperation": "source-over",
    //   "transformMatrix": null,
    //   "skewX": 0,
    //   "skewY": 0,
    //   "text": "Hello",
    //   "fontSize": 41,
    //   "fontWeight": "bold",
    //   "fontFamily": "Courier New",
    //   "fontStyle": "italic",
    //   "lineHeight": 1.16,
    //   "textDecoration": "",
    //   "textAlign": "left",
    //   "textBackgroundColor": "",
    //   "animation": "leftToRight"
    // }];
    // this.zoomObjects(o, 1 / 3);
    // this.redraw(o);
    // // console.log(o);
    // this.canvas.loadFromJSON(JSON.stringify(o));
  }

  redraw(objects) {
    setTimeout(() => {
      objects.forEach((object, index) => {
        const options = {
          originX: object.originX,
          originY: object.originY,
          left: object.left,
          top: object.top,
          width: object.width,
          height: object.height,
          scaleX: object.scaleX,
          scaleY: object.scaleY,
          angle: object.angle,
        };
        if (object.type === 'video') {
          options.src = object.src;
          this.addVideo(object.src, options, index);
        }
        if (object.type === 'image') {
          options.src = object.src;
          this.addImage(object.src, options, index);
        }
        if (object.type === 'website') {
          options.src = object.src;
          this.addWebsite(object.url, options, index);
        }
        if (object.type === 'text') {
          options.fontSize = object.fontSize;
          options.fontWeight = object.fontWeight;
          options.fontFamily = object.fontFamily;
          options.fontStyle = object.fontStyle;
          options.fill = object.fill;
          options.animation = object.animation;
          this.addText(object.text, options, index);
        }
      });
    });
  }

  getActiveObject() {
    this.activeObject = this.canvas.getActiveObject();
    if (!this.activeObject) return '';

    this.setState({
      activePropType: this.activeObject.type,
    });

    return this.activeObject;
  }

  setActiveProp(name, value) {
    const object = this.canvas.getActiveObject();
    if (!object) return;

    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  updateText(propName, value) {
    this.setActiveProp(propName, value);
  }

  updateWebsite(value) {
    this.setActiveProp('url', value);
  }

  fitObject(object) {
    const arrangement = object.arrangement;
    let scale;
    if (arrangement === ARRANGEMENT.CENTER_TOP) {
      scale = (this.canvas.height / 2 ) / object.height; // should be original height, don't use getHeight()
      object.set('scaleX', scale);
      object.set('scaleY', scale);
      this.toTop(object);
      this.toCenter(object);
    }
    if (arrangement === ARRANGEMENT.CENTER_BOTTOM) {
      scale = (this.canvas.height / 2 ) / object.height;
      object.set('scaleX', scale);
      object.set('scaleY', scale);
      this.toBottom(object);
      this.toCenter(object);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_LEFT) {
      scale = (this.canvas.width / 2 ) / object.width;
      object.set('scaleX', scale);
      object.set('scaleY', scale);
      this.toLeft(object);
      this.toMiddle(object);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_RIGHT) {
      scale = (this.canvas.width / 2 ) / object.width;
      object.set('scaleX', scale);
      object.set('scaleY', scale);
      this.toRight(object);
      this.toMiddle(object);
    }
    if (arrangement === ARRANGEMENT.CENTER_MIDDLE) {
      scale = this.canvas.height / object.height;
      object.set('scaleX', scale);
      object.set('scaleY', scale);
      this.toCenter(object);
      this.toMiddle(object);
    }
  }

  fullObject(object) {
    const arrangement = object.arrangement;
    if (arrangement === ARRANGEMENT.CENTER_TOP) {
      const scaleX = this.canvas.width / object.width;
      const scaleY = (this.canvas.height / 2 ) / object.height; // should be original height, don't use getHeight()
      object.set('scaleX', scaleX);
      object.set('scaleY', scaleY);
      this.toTop(object);
      this.toCenter(object);
    }
    if (arrangement === ARRANGEMENT.CENTER_BOTTOM) {
      const scaleX = this.canvas.width / object.width;
      const scaleY = (this.canvas.height / 2 ) / object.height; // should be original height, don't use getHeight()
      object.set('scaleX', scaleX);
      object.set('scaleY', scaleY);
      this.toBottom(object);
      this.toCenter(object);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_LEFT) {
      const scaleX = (this.canvas.width / 2 ) / object.width;
      const scaleY = this.canvas.height / object.height;
      object.set('scaleX', scaleX);
      object.set('scaleY', scaleY);
      this.toLeft(object);
      this.toMiddle(object);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_RIGHT) {
      const scaleX = (this.canvas.width / 2 ) / object.width;
      const scaleY = this.canvas.height / object.height;
      object.set('scaleX', scaleX);
      object.set('scaleY', scaleY);
      this.toRight(object);
      this.toMiddle(object);
    }
    if (arrangement === ARRANGEMENT.CENTER_MIDDLE) {
      const scaleX = this.canvas.width / object.width;
      const scaleY = this.canvas.height / object.height;
      object.set('scaleX', scaleX);
      object.set('scaleY', scaleY);
      this.toCenter(object);
      this.toMiddle(object);
    }
  }

  applyScalingStyle(object) {
    switch (object.scalingStyle) {
      case SCALING_STYLES.FULL:
        this.fullObject(object);
        break;
      case SCALING_STYLES.FIT:
        this.fitObject(object);
        break;
      case SCALING_STYLES.FREE:
        object.scaleX = 1;
        object.scaleY = 1;
        break;
      default:
        break;
    }
  }

  updateScalingStyle(value) {
    const object = this.canvas.getActiveObject();
    if (object) {
      object.scalingStyle = value;
      this.applyScalingStyle(object);
      object.setCoords();
      this.canvas.renderAll();
    }
  }

  toCenter(object) {
    const _width = object.arrangement === ARRANGEMENT.MIDDLE_LEFT || object.arrangement === ARRANGEMENT.MIDDLE_RIGHT ?
    this.canvas.width / 2 : this.canvas.width;
    object.set('left', _width / 2);
  }

  toMiddle(object) {
    const _height = object.arrangement === ARRANGEMENT.CENTER_TOP || object.arrangement === ARRANGEMENT.CENTER_BOTTOM ?
    this.canvas.height / 2 : this.canvas.height;
    object.set('top', _height / 2);
  }

  toLeft(object) {
    object.set('left', object.getWidth() / 2);
  }

  toRight(object) {
    object.set('left', this.canvas.width - object.getWidth() / 2);
  }

  toTop(object) {
    object.set('top', object.getHeight() / 2);
  }

  toBottom(object) {
    object.set('top', this.canvas.height - object.getHeight() / 2);
  }

  addText(text, options, index) {
    let _text = 'Click me to edit';
    if (text) {
      _text = text;
    }
    const defaultOptions = {
      originX: 'center',
      originY: 'center',
    };
    const textObject = new Text(_text, options || defaultOptions);
    if (!options) {
      textObject.arrangement = ARRANGEMENT.CENTER_MIDDLE;
      this.toCenter(textObject);
      this.toMiddle(textObject);
    }
    textObject.setCoords();
    this.canvas.add(textObject);
    if (index !== undefined) {
      this.canvas.moveTo(textObject, index);
    }
  }

  clickAddText() {
    this.addText('Click me to edit');
  }

  addImage(url, options, index) {
    fabric.Image.fromURL(url, (image) => {
      const defaultOptions = {
        scalingStyle: 'free',
        originX: 'center',
        originY: 'center',
      };
      image.set(options || defaultOptions);

      if (!options) {
        image.arrangement = ARRANGEMENT.CENTER_MIDDLE;
        this.toCenter(image);
        this.toMiddle(image);
      }

      image.setCoords();
      this.canvas.add(image);
      if (index !== undefined) {
        this.canvas.moveTo(image, index);
      }
    });
  }

  addVideo(url, options, index) {
    const videoElement = document.createElement('video');
    const sourceMP4 = document.createElement('source');
    sourceMP4.src = url;
    videoElement.appendChild(sourceMP4);
    videoElement.load();

    videoElement.addEventListener('loadeddata', () => {
      videoElement.width = videoElement.videoWidth;
      videoElement.height = videoElement.videoHeight;
      const defaultOptions = {
        originX: 'center',
        originY: 'center',
        src: url,
      };
      const video = new Video(videoElement, options || defaultOptions);
      if (!options) {
        video.arrangement = ARRANGEMENT.CENTER_MIDDLE;
        this.toCenter(video);
        this.toMiddle(video);
      }
      video.setCoords();
      this.canvas.add(video);
      if (index !== undefined) {
        this.canvas.moveTo(video, index);
      }
    });
  }

  addWebsite(url, options, index) {
    fabric.util.loadImage(url, (img) => {
      const website = new Website(img);
      const defaultOptions = {
        scalingStyle: 'free',
        originX: 'center',
        originY: 'center',
        url: url,
      };
      website.set(options || defaultOptions);
      if (!options) {
        website.arrangement = ARRANGEMENT.CENTER_MIDDLE;
        this.toCenter(website);
        this.toMiddle(website);
      }
      this.canvas.add(website);
      if (index !== undefined) {
        this.canvas.moveTo(website, index);
      }
    });
  }

  applyArrangement(object) {
    switch (object.arrangement) {
      case ARRANGEMENT.CENTER_MIDDLE:
        this.toCenter(object);
        this.toMiddle(object);
        break;
      case ARRANGEMENT.MIDDLE_LEFT:
        this.toMiddle(object);
        this.toLeft(object);
        break;
      case ARRANGEMENT.MIDDLE_RIGHT:
        this.toMiddle(object);
        this.toRight(object);
        break;
      case ARRANGEMENT.CENTER_TOP:
        this.toCenter(object);
        this.toTop(object);
        break;
      case ARRANGEMENT.CENTER_BOTTOM:
        this.toCenter(object);
        this.toBottom(object);
        break;
      default:
        break;
    }
  }

  updateArrangement(value) {
    this.setState({
      selectedArrangement: value,
    });
    const object = this.canvas.getActiveObject();
    if (object) {
      object.arrangement = value;
      this.applyArrangement(object);
      this.applyScalingStyle(object);
      object.setCoords();
      this.canvas.renderAll();
    }
  }

  preview() {
    if (this.state.isPreview) {
      this.zoomCanvas(this.canvas, 0.5);
      this.canvas.renderAll();
      this.canvas.calcOffset();
      this.setState({
        isPreview: false,
      });
      this.canvas.getObjects().forEach(object => {
        object.selectable = true;
        if (object.type === 'video') {
          const videoElement = object.getElement();
          // console.log(videoElement);
          // videoElement.load();
          videoElement.pause();
        }
      });
      return;
    }

    this.zoomCanvas(this.canvas, 2);
    this.canvas.deactivateAll();
    this.canvas.forEachObject(object => {
      object.selectable = false;
    });
    // this.canvas.selection = false;
    this.canvas.renderAll();
    this.canvas.calcOffset();
    this.setState({
      isPreview: true,
    });

    this.canvas.getObjects().forEach(object => {
      if (object.type === 'video') {
        const videoElement = document.createElement('video');
        const sourceMP4 = document.createElement('source');
        sourceMP4.src = object.src;
        videoElement.appendChild(sourceMP4);
        videoElement.load();
        videoElement.addEventListener('loadeddata', () => {
          videoElement.loop = true;
          videoElement.width = videoElement.videoWidth;
          videoElement.height = videoElement.videoHeight;
          object.setElement(videoElement);
          videoElement.play();
        });
      }
    });
    setTimeout(() => {
      const self = this;
      (function loop() {
        if (self.state.isPreview) {
          self.canvas.renderAll();
          setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
      })();
    });
  }

  stopActiveVideo() {
    const videoElement = this.canvas.getActiveObject().getElement();
    videoElement.load();
  }


  bringToFront() {
    const object = this.canvas.getActiveObject();
    object.bringToFront();
  }

  sendToBack() {
    const object = this.canvas.getActiveObject();
    object.sendToBack();
  }

  bringForward() {
    const object = this.canvas.getActiveObject();
    object.bringForward();
  }

  sendBackWards() {
    const object = this.canvas.getActiveObject();
    object.sendBackwards();
  }

  removeActiveObject() {
    this.canvas.getActiveObject().remove();
  }

  clearCanvas() {
    this.canvas.clear();
  }

  toJson() {
    console.log(JSON.stringify(this.canvas));
  }


  // Input dialogs
  hideInputVideoDialog() {
    this.setState({
      showInputVideoDialog: false,
    });
  }

  showInputVideoDialog() {
    this.setState({
      showInputVideoDialog: true,
    });
  }

  doneInputVideo(url) {
    this.addVideo(url);
    this.hideInputVideoDialog();
  }

  hideInputWebsiteDialog() {
    this.setState({
      showInputWebsiteDialog: false,
    });
  }

  showInputWebsiteDialog() {
    this.setState({
      showInputWebsiteDialog: true,
    });
  }

  doneInputWebsite(url) {
    this.addWebsite(url);
    this.hideInputWebsiteDialog();
  }

  hideInputImageDialog() {
    this.setState({
      showInputImageDialog: false,
    });
  }

  showInputImageDialog() {
    this.setState({
      showInputImageDialog: true,
    });
  }

  doneInputImage(url) {
    this.addImage(url);
    this.hideInputImageDialog();
  }

  hideInputTemplateNameDialog() {
    this.setState({
      showInputTemplateNameDialog: false,
    });
  }

  showInputTemplateNameDialog() {
    this.setState({
      showInputTemplateNameDialog: true,
    });
  }

  doneInputTemplateName(name) {
    const objects = this.canvas.toJSON().objects;
    this.zoomObjects(objects, 3, false);
    const requestData = {
      template: {
        name: name,
        objects: objects,
      },
    };
    console.log(JSON.stringify(objects));

    api.post(API.TEMPLATE, requestData).done(response => {
      if (response.information === 'success') {
        this.hideInputTemplateNameDialog();
      }
    }).fail(error => {
      $.notify(error.message || 'Fail to save template', {
        className: 'error',
        elementPosition: 'bottom right',
      });
    });
  }

  zoomObjects(objects, factor, render) {
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

      if (render) {
        object.setCoords();
      }
    });
  }

  zoomCanvas(canvas, factor) {
    canvas.setHeight(canvas.getHeight() * factor);
    canvas.setWidth(canvas.getWidth() * factor);
    const objects = canvas.getObjects();
    this.zoomObjects(objects, factor, true);
  }

  renderPropertiesPanel() {
    if (this.state.activePropType === 'text') {
      return (
        <TextProperties textProps={this.activeObject} updateTo={this.updateText.bind(this)}/>
      );
    }

    if (this.state.activePropType === 'image') {
      return (
        <ImageProperties imageObj={this.activeObject} updateTo={this.updateScalingStyle.bind(this)}/>
      );
    }

    if (this.state.activePropType === 'video') {
      return (
        <VideoProperties updateTo={this.updateScalingStyle.bind(this)}
                         videoObj={this.activeObject}/>
      );
    }
    if (this.state.activePropType === 'website') {
      return (
        <WebProperties updateTo={this.updateWebsite.bind(this)}
                       webObj={this.activeObject}/>
      );
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="panel panel-info pull-left main-canvas-wrapper">
          <div className="panel-heading">
            <button className="btn btn-primary"
                    onClick={this.preview.bind(this)}>{this.state.isPreview ? 'Stop Preview' : 'Preview'}</button>
          </div>
          <div className="panel-body">
            <canvas width="640" height="360" ref="mainCanvas"></canvas>
          </div>
        </div>
        <div className={this.state.isPreview ? 'hidden' : 'controller-container pull-left'}>
          <div className="object-container panel panel-info">
            <div className="panel-heading">Insert</div>
            <div className="panel-body">
              <button className="btn btn-primary" onClick={this.showInputVideoDialog.bind(this)}>Video</button>
              <button className="btn btn-primary" onClick={this.showInputImageDialog.bind(this)}>Image</button>
              <button className="btn btn-primary" onClick={this.showInputWebsiteDialog.bind(this)}>Website</button>
              <button className="btn btn-primary" onClick={this.clickAddText.bind(this)}>Text</button>
            </div>
          </div>
          <div className="object-container panel panel-info">
            <div className="panel-heading">Control</div>
            <div className="panel-body">
              <button className="btn btn-default" onClick={this.removeActiveObject.bind(this)}>Remove</button>
              <button className="btn btn-default" onClick={this.clearCanvas.bind(this)}>Clear</button>
              <button className="btn btn-primary" onClick={this.showInputTemplateNameDialog.bind(this)}>Save</button>
            </div>
          </div>
          <div className="arrangement-container">
            <div className="object-container panel panel-info">
              <div className="panel-heading">Arrangement</div>
              <div className="panel-body">
                {this.arrangementButtons.map((button) => {
                  const classes = ['btn', 'btn-default', 'icon-button', button.className];
                  if (button.key === this.state.selectedArrangement) {
                    classes.push('active');
                  }
                  return (
                    <button onClick={this.updateArrangement.bind(this, button.key)} key={button.key}
                            className={classNames(...classes)} value={button.key}></button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="layer-order-container">
            <div className="object-container panel panel-info">
              <div className="panel-heading">Layer Order</div>
              <div className="panel-body">
                <button className="btn btn-default icon-button bring-to-front-button"
                        onClick={this.bringToFront.bind(this)}>
                </button>
                <button className="btn btn-default icon-button send-to-back-button"
                        onClick={this.sendToBack.bind(this)}>
                </button>
                <button className="btn btn-default icon-button bring-forward-button"
                        onClick={this.bringForward.bind(this)}>
                </button>
                <button className="btn btn-default icon-button send-backwards-button"
                        onClick={this.sendBackWards.bind(this)}>
                </button>
              </div>
            </div>
          </div>
          <div className="properties-container">
            {this.renderPropertiesPanel()}
          </div>
        </div>
        <InputVideoDialog show={this.state.showInputVideoDialog}
                          done={this.doneInputVideo.bind(this)}
                          onHide={this.hideInputVideoDialog.bind(this)}/>
        <InputWebsiteDialog show={this.state.showInputWebsiteDialog}
                            done={this.doneInputWebsite.bind(this)}
                            onHide={this.hideInputWebsiteDialog.bind(this)}/>
        <InputImageDialog show={this.state.showInputImageDialog}
                          done={this.doneInputImage.bind(this)}
                          onHide={this.hideInputImageDialog.bind(this)}/>
        <InputTemplateNameDialog show={this.state.showInputTemplateNameDialog}
                                 done={this.doneInputTemplateName.bind(this)}
                                 onHide={this.hideInputTemplateNameDialog.bind(this)}/>
        <div className="clearfix"></div>
      </div>
    );
  }
}
