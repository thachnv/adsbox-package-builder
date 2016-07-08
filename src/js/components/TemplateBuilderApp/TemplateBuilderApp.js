import React from 'react';
import Video from '../../objects/Video.js';
import Website from '../../objects/Website.js';
import Text from '../../objects/Text';
import TextProperties from '../TextProperties/TextProperties.js';
import ImageProperties from '../ImageProperties/ImageProperties.js';
import VideoProperties from '../VideoProperties/VideoProperties.js';
import WebProperties from '../WebProperties/WebProperties.js';
import { ARRANGEMENT, SCALING_STYLES, API, ARRANGEMENT_BUTTONS } from '../../constant.js';
import InputVideoDialog from '../InputVideoDialog/InputVideoDialog';
import InputWebsiteDialog from '../InputWebsiteDialog/InputWebsiteDialog';
import InputImageDialog from '../InputImageDialog/InputImageDialog';
import InputTemplateNameDialog from '../InputTemplateNameDialog/InputTemplateNameDialog';
import classNames from 'classnames';
import api from '../../utils/api';
import ObjectUtil from '../../utils/ObjectUtil';

function parseUrlArgs(href) {
  if (href) {
    const _tmp = href.split('/');
    return _tmp[_tmp.length - 1];
  }
  return null;
}
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

    // Add objects methods
    this.showInputImageDialog = this.showInputImageDialog.bind(this);
    this.showInputVideoDialog = this.showInputVideoDialog.bind(this);
    this.showInputWebsiteDialog = this.showInputWebsiteDialog.bind(this);
    this.clickAddText = this.clickAddText.bind(this);

    // Canvas control methods
    this.clearCanvas = this.clearCanvas.bind(this);
    this.removeActiveObject = this.removeActiveObject.bind(this);
    this.showInputTemplateNameDialog = this.showInputTemplateNameDialog.bind(this);

    // Update properties methods
    this.updateText = this.updateText.bind(this);
    this.updateScalingStyle = this.updateScalingStyle.bind(this);
    this.updateWebsite = this.updateWebsite.bind(this);
    this.updateArrangement = this.updateArrangement.bind(this);

    this.preview = this.preview.bind(this);

    this.sendToBack = this.sendToBack.bind(this);
    this.sendBackWards = this.sendBackWards.bind(this);
    this.bringToFront = this.bringToFront.bind(this);
    this.bringForward = this.bringForward.bind(this);
    this.doneInputImage = this.doneInputImage.bind(this);
    this.doneInputVideo = this.doneInputVideo.bind(this);
    this.doneInputWebsite = this.doneInputWebsite.bind(this);
    this.doneInputTemplateName = this.doneInputTemplateName.bind(this);
    this.hideInputImageDialog = this.hideInputImageDialog.bind(this);
    this.hideInputVideoDialog = this.hideInputVideoDialog.bind(this);
    this.hideInputWebsiteDialog = this.hideInputWebsiteDialog.bind(this);
    this.hideInputTemplateNameDialog = this.hideInputTemplateNameDialog.bind(this);
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.refs.mainCanvas, {
      preserveObjectStacking: true,
    });
    this.canvas.on('object:selected', this.getActiveObject.bind(this));
    // const id = window.selectedPackage;
    const id = parseUrlArgs(window.location.href);
    console.log(id);
    if (id) {
      api.get(`${API.TEMPLATE}/${id}`).done((response) => {
        const objects = response.content.objects;
        ObjectUtil.zoom(objects, 1 / 3);
        this.redraw(objects);
      });
    }
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
          this.addWebsite(object.url, object.src, options, index);
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

  updateText(propName, value) {
    this.setActiveProp(propName, value);
  }

  updateWebsite(value) {
    this.setActiveProp('url', value);
  }

  fitObject(object) {
    const arrangement = object.arrangement;
    if (arrangement === ARRANGEMENT.CENTER_TOP) {
      ObjectUtil.fit(object, this.canvas.width, this.canvas.height / 2);
      ObjectUtil.alignTop(object, this.canvas.height);
      // ObjectUtil.alignCenter(object, this.canvas.width);
      object.centerH();
    }
    if (arrangement === ARRANGEMENT.CENTER_BOTTOM) {
      ObjectUtil.fit(object, this.canvas.width, this.canvas.height / 2);
      ObjectUtil.alignBottom(object, this.canvas.height);
      object.centerH();
      // ObjectUtil.alignCenter(object, this.canvas.width);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_LEFT) {
      ObjectUtil.fit(object, this.canvas.width / 2, this.canvas.height);
      ObjectUtil.alignLeft(object, this.canvas.width);
      // ObjectUtil.alignMiddle(object, this.canvas.height);
      object.centerV();
    }
    if (arrangement === ARRANGEMENT.MIDDLE_RIGHT) {
      ObjectUtil.fit(object, this.canvas.width / 2, this.canvas.height);
      ObjectUtil.alignRight(object, this.canvas.width);
      // ObjectUtil.alignMiddle(object, this.canvas.height);
      // object.adjustPosition('right');
      object.centerV();
    }
    if (arrangement === ARRANGEMENT.CENTER_MIDDLE) {
      ObjectUtil.fit(object, this.canvas.width, this.canvas.height);
      object.center();
      // ObjectUtil.alignCenter(object, this.canvas.width);
      // ObjectUtil.alignMiddle(object, this.canvas.height);
    }
  }

  fillObject(object) {
    const arrangement = object.arrangement;
    if (arrangement === ARRANGEMENT.CENTER_TOP || arrangement === ARRANGEMENT.CENTER_BOTTOM) {
      ObjectUtil.fill(object, this.canvas.width, this.canvas.height / 2);
      this.toTop(object);
      this.toCenter(object);
    }
    if (arrangement === ARRANGEMENT.CENTER_BOTTOM) {
      ObjectUtil.fill(object, this.canvas.width, this.canvas.height / 2);
      this.toBottom(object);
      this.toCenter(object);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_LEFT) {
      ObjectUtil.fill(object, this.canvas.width / 2, this.canvas.height);
      // ObjectUtil.alignLeft(object);
      // this.toMiddle(object);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_RIGHT) {
      ObjectUtil.fill(object, this.canvas.width / 2, this.canvas.height);
      ObjectUtil.alignRight(object, this.canvas.width);
      this.toMiddle(object);
    }
    if (arrangement === ARRANGEMENT.CENTER_MIDDLE) {
      let scale = this.canvas.width / object.width;
      const containerWidth = this.canvas.width / 2;
      const containerHeight = this.canvas.height;
      if (containerWidth / object.width > containerHeight / object.height) {
        scale = this.canvas.width / object.width;
      } else {
        scale = this.canvas.height / object.height;
      }
      object.set('scaleX', scale);
      object.set('scaleY', scale);
      this.toCenter(object);
      this.toMiddle(object);
    }
  }

  fullObject(object) {
    const arrangement = object.arrangement;
    if (arrangement === ARRANGEMENT.CENTER_TOP) {
      ObjectUtil.full(object, this.canvas.width, this.canvas.height / 2);
      ObjectUtil.alignTop(object, this.canvas.height);
      ObjectUtil.alignCenter(object, this.canvas.width);
    }
    if (arrangement === ARRANGEMENT.CENTER_BOTTOM) {
      ObjectUtil.full(object, this.canvas.width, this.canvas.height / 2);
      ObjectUtil.alignBottom(object, this.canvas.height);
      ObjectUtil.alignCenter(object, this.canvas.width);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_LEFT) {
      ObjectUtil.full(object, this.canvas.width / 2, this.canvas.height);
      ObjectUtil.alignLeft(object, this.canvas.width);
      ObjectUtil.alignMiddle(object, this.canvas.height);
    }
    if (arrangement === ARRANGEMENT.MIDDLE_RIGHT) {
      ObjectUtil.full(object, this.canvas.width / 2, this.canvas.height);
      ObjectUtil.alignRight(object, this.canvas.width);
      ObjectUtil.alignMiddle(object, this.canvas.height);
    }
    if (arrangement === ARRANGEMENT.CENTER_MIDDLE) {
      ObjectUtil.full(object, this.canvas.width, this.canvas.height);
      ObjectUtil.alignCenter(object, this.canvas.width);
      ObjectUtil.alignMiddle(object, this.canvas.height);
    }
    if (arrangement === ARRANGEMENT.FULL_SCREEN) {
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
      case SCALING_STYLES.FILL:
        this.fullObject(object);
        // this.applyArrangement(object);
        break;
      case SCALING_STYLES.FIT:
        this.fitObject(object);
        break;
      case SCALING_STYLES.RESET:
        object.set('scaleX', 1);
        object.set('scaleY', 1);
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
    const width = object.arrangement === ARRANGEMENT.MIDDLE_LEFT ||
    object.arrangement === ARRANGEMENT.MIDDLE_RIGHT ?
    this.canvas.width / 2 : this.canvas.width;
    object.set('left', width / 2);
  }

  toMiddle(object) {
    const height = object.arrangement === ARRANGEMENT.CENTER_TOP ||
    object.arrangement === ARRANGEMENT.CENTER_BOTTOM ?
    this.canvas.height / 2 : this.canvas.height;
    object.set('top', height / 2);
  }

  toTop(object) {
    object.set('top', this.canvas.getHeight() / 2 - object.getHeight() / 2);
  }

  toBottom(object) {
    object.set('top', this.canvas.getHeight() / 2 + object.getHeight() / 2);
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
    textObject.lockScalingX = true;
    textObject.lockScalingY = true;
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
        scalingStyle: SCALING_STYLES.RESET,
        // originX: 'center',
        // originY: 'center',
      };
      image.set(options || defaultOptions);

      if (!options) {
        image.set('arrangement', ARRANGEMENT.CENTER_MIDDLE);
        // ObjectUtil.alignMiddle(image, this.canvas.height);
        // ObjectUtil.alignCenter(image, this.canvas.width);
        // this.toCenter(image);
        // this.toMiddle(image);
        image.center();
      }
      if (image.getWidth() > this.canvas.width || image.getHeight() > this.canvas.height) {
        this.fitObject(image);
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

    this.setState({
      isLoading: true,
    });

    videoElement.addEventListener('loadeddata', () => {
      this.setState({
        isLoading: false,
      });
      videoElement.width = videoElement.videoWidth;
      videoElement.height = videoElement.videoHeight;
      const defaultOptions = {
        // originX: 'center',
        // originY: 'center',
        src: url,
      };
      const video = new Video(videoElement, options || defaultOptions);
      if (!options) {
        video.arrangement = ARRANGEMENT.CENTER_MIDDLE;
        // this.toCenter(video);
        // this.toMiddle(video);
        video.center();
      }
      video.setCoords();
      if (video.getWidth() > this.canvas.width || video.getHeight() > this.canvas.height) {
        this.fitObject(video);
      }
      this.canvas.add(video);
      if (index !== undefined) {
        this.canvas.moveTo(video, index);
      }
    });
  }

  addWebsite(url, thumbnail, options, index) {
    fabric.util.loadImage(thumbnail, (img) => {
      const website = new Website(img);
      const defaultOptions = {
        scalingStyle: SCALING_STYLES.RESET,
        originX: 'center',
        originY: 'center',
        url,
      };
      website.set(options || defaultOptions);
      if (!options) {
        website.arrangement = ARRANGEMENT.CENTER_MIDDLE;
        this.toCenter(website);
        this.toMiddle(website);
      }
      if (website.getWidth() > this.canvas.width || website.getHeight() > this.canvas.height) {
        this.fitObject(website);
      }
      this.canvas.add(website);
      if (index !== undefined) {
        this.canvas.moveTo(website, index);
      }
    });
  }

  applyArrangement(object) {
    switch (object.arrangement) {
      case ARRANGEMENT.FULL_SCREEN:
        this.toCenter(object);
        this.toMiddle(object);
        this.fullObject(object);
        break;
      case ARRANGEMENT.CENTER_MIDDLE:
        this.toCenter(object);
        this.toMiddle(object);
        this.fillObject(object);
        break;
      case ARRANGEMENT.MIDDLE_LEFT:
        ObjectUtil.fill(object, this.canvas.width / 2, this.canvas.height);
        ObjectUtil.alignMiddle(object, this.canvas.height);
        ObjectUtil.alignLeft(object, this.canvas.width);
        break;
      case ARRANGEMENT.MIDDLE_RIGHT:
        ObjectUtil.fill(object, this.canvas.width / 2, this.canvas.height);
        ObjectUtil.alignMiddle(object, this.canvas.height);
        ObjectUtil.alignRight(object, this.canvas.width);
        break;
      case ARRANGEMENT.CENTER_TOP:
        ObjectUtil.fill(object, this.canvas.width, this.canvas.height / 2);
        ObjectUtil.alignCenter(object, this.canvas.width);
        ObjectUtil.alignTop(object, this.canvas.height);
        break;
      case ARRANGEMENT.CENTER_BOTTOM:
        ObjectUtil.fill(object, this.canvas.width, this.canvas.height / 2);
        ObjectUtil.alignCenter(object, this.canvas.width);
        ObjectUtil.alignBottom(object, this.canvas.height);
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
      object.setAngle(0);
      this.applyArrangement(object);
      // this.applyScalingStyle(object);
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

  doneInputWebsite(website) {
    this.addWebsite(website.url, website.thumbnail);
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
      content_name: name,
      objects,
    };

    api.post(API.TEMPLATE, requestData).done(() => {
      this.hideInputTemplateNameDialog();
      $.notify('Save template success', {
        className: 'success',
        elementPosition: 'bottom right',
      });
    }).fail(error => {
      $.notify(error.message || 'Fail to save template', {
        className: 'error',
        elementPosition: 'bottom right',
      });
    });
  }


  zoomCanvas(canvas, factor) {
    canvas.setHeight(canvas.getHeight() * factor);
    canvas.setWidth(canvas.getWidth() * factor);
    const objects = canvas.getObjects();
    ObjectUtil.zoom(objects, factor);
  }

  renderPropertiesPanel() {
    const _currentActivePropType = this.state.activePropType;
    if (_currentActivePropType === 'text') {
      return (
        <TextProperties
          textProps={this.activeObject}
          updateTo={this.updateText}
        />
      );
    }

    if (_currentActivePropType === 'image') {
      return (
        <ImageProperties
          imageObj={this.activeObject}
          updateTo={this.updateScalingStyle}
        />
      );
    }

    if (_currentActivePropType === 'video') {
      return (
        <VideoProperties
          updateTo={this.updateScalingStyle}
          videoObj={this.activeObject}
        />
      );
    }
    if (_currentActivePropType === 'website') {
      return (
        <WebProperties
          updateTo={this.updateWebsite}
          webObj={this.activeObject}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="app-container">
        <div className="panel panel-default pull-left main-canvas-wrapper">
          <div className="panel-heading">
            <button
              className="btn btn-primary"
              onClick={this.preview}
            >{this.state.isPreview ? 'Stop Preview' : 'Preview'}</button>
          </div>
          <div className="panel-body">
            <canvas width="640" height="360" ref="mainCanvas"></canvas>
          </div>
        </div>
        <div className={this.state.isPreview ? 'hidden' : 'controller-container pull-left'}>
          <div className="object-container panel panel-default">
            <div className="panel-heading">Insert</div>
            <div className="panel-body">
              <button
                className="btn btn-primary"
                onClick={this.showInputVideoDialog}
              >Video
              </button>
              <button
                className="btn btn-primary"
                onClick={this.showInputImageDialog}
              >Image
              </button>
              <button
                className="btn btn-primary"
                onClick={this.showInputWebsiteDialog}
              >Website
              </button>
              <button
                className="btn btn-primary"
                onClick={this.clickAddText}
              >Text
              </button>
            </div>
          </div>
          <div className="object-container panel panel-default">
            <div className="panel-heading">Control</div>
            <div className="panel-body">
              <button
                className="btn btn-default"
                onClick={this.removeActiveObject}
              >Remove
              </button>
              <button
                className="btn btn-default"
                onClick={this.clearCanvas}
              >Clear
              </button>
              <button
                className="btn btn-primary"
                onClick={this.showInputTemplateNameDialog}
              >Save
              </button>
            </div>
          </div>
          <div className="arrangement-container">
            <div className="object-container panel panel-default">
              <div className="panel-heading">Arrangement</div>
              <div className="panel-body">
                {ARRANGEMENT_BUTTONS.map((button) => {
                  const classes = ['btn', 'btn-default', 'icon-button', button.className];
                  if (button.key === this.state.selectedArrangement) {
                    classes.push('active');
                  }
                  return (
                    <button
                      onClick={() => this.updateArrangement(button.key)}
                      key={button.key}
                      className={classNames(...classes)} value={button.key}
                    ></button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="layer-order-container">
            <div className="object-container panel panel-default">
              <div className="panel-heading">Layer Order</div>
              <div className="panel-body">
                <button
                  className="btn btn-default icon-button bring-to-front-button"
                  onClick={this.bringToFront}
                ></button>
                <button
                  className="btn btn-default icon-button send-to-back-button"
                  onClick={this.sendToBack}
                ></button>
                <button
                  className="btn btn-default icon-button bring-forward-button"
                  onClick={this.bringForward}
                ></button>
                <button
                  className="btn btn-default icon-button send-backwards-button"
                  onClick={this.sendBackWards}
                ></button>
              </div>
            </div>
          </div>
          <div className="properties-container">
            {this.renderPropertiesPanel()}
          </div>
        </div>
        <InputVideoDialog
          show={this.state.showInputVideoDialog}
          done={this.doneInputVideo}
          onHide={this.hideInputVideoDialog}
        />
        <InputWebsiteDialog
          show={this.state.showInputWebsiteDialog}
          done={this.doneInputWebsite}
          onHide={this.hideInputWebsiteDialog}
        />
        <InputImageDialog
          show={this.state.showInputImageDialog}
          done={this.doneInputImage}
          onHide={this.hideInputImageDialog}
        />
        <InputTemplateNameDialog
          show={this.state.showInputTemplateNameDialog}
          done={this.doneInputTemplateName}
          onHide={this.hideInputTemplateNameDialog}
        />
        <div
          className={this.state.isLoading ? classNames('main-loading-wrapper') : classNames('hide')}
        >
          <div className="loading-spinner"></div>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}
