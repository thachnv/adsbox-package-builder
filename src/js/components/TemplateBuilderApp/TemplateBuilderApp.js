import React from 'react';
import Video from '../../objects/Video.js';
import Website from '../../objects/Website.js';
import TextProperties from '../TextProperties/TextProperties.js';
import ImageProperties from '../ImageProperties/ImageProperties.js';
import VideoProperties from '../VideoProperties/VideoProperties.js';
import WebProperties from '../WebProperties/WebProperties.js';
import {ARRANGEMENT, SCALING_STYLES} from '../../constant.js';
import InputVideoDialog from '../InputVideoDialog/InputVideoDialog';
import InputWebsiteDialog from '../InputWebsiteDialog/InputWebsiteDialog';
import InputImageDialog from '../InputImageDialog/InputImageDialog';
import classNames from 'classnames';

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
      {label: 'Center', key: ARRANGEMENT.CENTER_MIDDLE},
      {label: 'Left', key: ARRANGEMENT.MIDDLE_LEFT},
      {label: 'Right', key: ARRANGEMENT.MIDDLE_RIGHT},
      {label: 'Top', key: ARRANGEMENT.CENTER_TOP},
      {label: 'Bottom', key: ARRANGEMENT.CENTER_BOTTOM},
    ];
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.refs.mainCanvas);
    this.canvas.on('object:selected', this.getActiveObject.bind(this));
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

  addText() {
    const text = new fabric.Text('Click me to edit', {
      originX: 'center',
      originY: 'center',
    });
    this.toCenter(text);
    this.toMiddle(text);
    this.canvas.add(text);
  }

  addImage(url) {
    this.hideInputUrlDialog();
    fabric.Image.fromURL(url, (image) => {
      image.set({
        scalingStyle: 'free',
        originX: 'center',
        originY: 'center',
      });
      this.toCenter(image);
      this.toMiddle(image);
      this.canvas.add(image);
    });
  }

  addVideo(url) {
    const videoElement = document.createElement('video');
    const sourceMP4 = document.createElement('source');
    sourceMP4.src = url;
    videoElement.appendChild(sourceMP4);
    videoElement.load();

    videoElement.addEventListener('loadeddata', () => {
      videoElement.width = videoElement.videoWidth;
      videoElement.height = videoElement.videoHeight;
      const video = new Video(videoElement, {
        originX: 'center',
        originY: 'center',
        url: url,
      });
      this.toCenter(video);
      this.toMiddle(video);
      this.canvas.add(video);
    });
  }

  addWebsite() {
    const url = this.refs.inputUrl.value;
    fabric.util.loadImage(url, (img) => {
      const website = new Website(img);
      website.set({
        scalingStyle: 'free',
        originX: 'center',
        originY: 'center',
        url: url,
      });
      this.toCenter(website);
      this.toMiddle(website);
      this.canvas.add(website);
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
      this.setState({
        isPreview: false,
      });
      return;
    }
    this.setState({
      isPreview: true,
    });
    this.canvas.getObjects().forEach(object => {
      if (object.type === 'video') {
        const videoElement = document.createElement('video');
        const sourceMP4 = document.createElement('source');
        sourceMP4.src = object.url;
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
      showInputVideoDialog: false,
    });
  }

  showInputWebsiteDialog() {
    this.setState({
      showInputVideoDialog: true,
    });
  }

  doneInputWebsite(url) {
    this.addVideo(url);
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
              <button className="btn btn-primary" onClick={this.showInputVideoDialog.bind(this)}>
                Video
              </button>
              <button className="btn btn-primary" onClick={this.showInputImageDialog.bind(this)}>
                Image
              </button>
              <button className="btn btn-primary" onClick={this.showInputWebsiteDialog.bind(this)}>
                Website
              </button>
              <button className="btn btn-primary" onClick={this.addText.bind(this)}>Text</button>
              <button className="btn btn-default" onClick={this.removeActiveObject.bind(this)}>Remove</button>
              <button className="btn btn-default" onClick={this.clearCanvas.bind(this)}>Clear</button>
              <button className="btn btn-default" onClick={this.toJson.bind(this)}>To JSON</button>
            </div>
          </div>
          <div className="arrangement-container">
            <div className="object-container panel panel-info">
              <div className="panel-heading">Arrangement</div>
              <div className="panel-body">
                {this.arrangementButtons.map((button) => {
                  const classes = ['btn', 'btn-default'];
                  if (button.key === this.state.selectedArrangement) {
                    classes.push('active');
                  }
                  return (<button onClick={this.updateArrangement.bind(this, button.key)} key={button.key}
                                  className={classNames(...classes)} value={button.key}>{button.label}</button>);
                })}
              </div>
            </div>
          </div>
          <div className="layer-order-container">
            <div className="object-container panel panel-info">
              <div className="panel-heading">Layer Order</div>
              <div className="panel-body">
                <button className="btn btn-default" onClick={this.bringToFront.bind(this)}>
                  Bring to Front
                </button>
                <button className="btn btn-default" onClick={this.sendToBack.bind(this)}>
                  Send To Back
                </button>
                <button className="btn btn-default" onClick={this.bringForward.bind(this)}>
                  Bring Forward
                </button>
                <button className="btn btn-default" onClick={this.sendBackWards.bind(this)}>
                  Send Backwards
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
      </div>
    );
  }
}
