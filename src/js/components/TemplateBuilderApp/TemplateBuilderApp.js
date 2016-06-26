import React from 'react';
import Video from '../../objects/Video.js';
import TextProperties from '../TextProperties/TextProperties.js';
import ImageProperties from '../ImageProperties/ImageProperties.js';
import VideoProperties from '../VideoProperties/VideoProperties.js';
import {Modal} from 'react-bootstrap';
import {ARRANGEMENT} from '../../constant.js';

export default class TemplateBuilderApp extends React.Component {
  constructor() {
    super();
    this.canvas = null;
    this.state = {
      activeProp: null,
      activePropType: null,
      selectedArrangement: 'Center',
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

  updateScalingStyle(propName, value) {
    if (propName === 'scalingStyle') {
      if (value === 'full') {
        const object = this.canvas.getActiveObject();
        object.left = 0;
        object.top = 0;
        object.scaleX = this.canvas.width / object.width;
        object.scaleY = this.canvas.height / object.height;
        this.canvas.renderAll();
        return;
      }
      if (value === 'fit') {
        const object = this.canvas.getActiveObject();
        object.scaleX = this.canvas.height / object.height;
        object.scaleY = this.canvas.height / object.height;
        this.toCenter(object);
        this.toTop(object);
        this.canvas.renderAll();
      }
      if (value === 'free') {
        const object = this.canvas.getActiveObject();
        object.scaleX = 1;
        object.scaleY = 1;
        this.canvas.renderAll();
      }
    }
  }

  addVideo() {
    const url = this.refs.inputUrl.value;
    this.hideInputUrlDialog();

    const video1El = document.createElement('video');

    const sourceMP4 = document.createElement('source');
    sourceMP4.src = url;
    video1El.appendChild(sourceMP4);
    video1El.load();
    video1El.addEventListener('loadeddata', () => {
      video1El.width = video1El.videoWidth;
      video1El.height = video1El.videoHeight;
      const video1 = new Video(video1El, {
        left: 0,
        top: 0,
        angle: 0,
        centeredScaling: true,
      });
      this.canvas.add(video1);
    });
  }

  toCenter(object) {
    object.left = this.canvas.width / 2 - object.getWidth() / 2;
  }

  toMiddle(object) {
    object.top = this.canvas.height / 2 - object.getHeight() / 2;
  }

  toLeft(object) {
    object.left = 0;
  }

  toRight(object) {
    object.set('left', this.canvas.width - object.getWidth());
  }

  toTop(object) {
    object.set('top', 0);
  }

  toBottom(object) {
    object.set('top', this.canvas.height - object.getHeight());
  }

  addImage() {
    const url = this.refs.inputUrl.value;
    this.hideInputUrlDialog();
    fabric.Image.fromURL(url, (image) => {
      image.set({
        left: 0,
        top: 0,
        angle: 0,
        scalingStyle: 'free',
      });
      this.toRight(image);
      this.toBottom(image);
      image.scale(1).setCoords();

      this.canvas.add(image);
    });
  }

  showInputUrlDialog(type) {
    this.setState({showModal: true, urlType: type});
  }

  hideInputUrlDialog() {
    this.setState({showModal: false});
  }

  clickArrangement(value) {
    const object = this.canvas.getActiveObject();
    switch (value) {
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
    this.canvas.renderAll();
  }

  playActiveVideo() {
    const object = this.canvas.getActiveObject();
    const videoElement = object.getElement();
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
    const self = this;
    (function loop() {
      if (!videoElement.paused || !videoElement.ended) {
        self.canvas.renderAll();
        setTimeout(loop, 1000 / 30); // drawing at 30fps
      }
    })();
  }

  stopActiveVideo() {
    const videoElement = this.canvas.getActiveObject().getElement();
    videoElement.load();
  }

  addText() {
    const text = new fabric.Text('Click me to edit', {
      left: 0,
      top: 0,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      originX: 'left',
      hasRotatingPoint: true,
      centerTransform: true,
    });

    this.canvas.add(text);
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
                         clickStop={this.stopActiveVideo.bind(this)}
                         clickPlay={this.playActiveVideo.bind(this)}
                         videoObj={this.activeObject}/>
      );
    }
  }

  renderInputDialog() {
    return (
      <Modal show={this.state.showModal} onHide={this.hideInputUrlDialog.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Input URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-xs-2">Url</label>
              <div className="col-xs-10">
                <input className="form-control" ref="inputUrl"/>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary"
                  onClick={this.state.urlType === 'image' ? this.addImage.bind(this) : this.addVideo.bind(this)}>Ok
          </button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <div className="app-container">
        <div className="panel panel-info pull-left main-canvas-wrapper">
          <div className="panel-heading">Preview</div>
          <div className="panel-body">
            <canvas width="640" height="360" ref="mainCanvas"></canvas>
          </div>
        </div>
        <div className="controller-container pull-left">
          <div className="object-container panel panel-info">
            <div className="panel-heading">Insert</div>
            <div className="panel-body">
              <button className="btn btn-primary" onClick={this.showInputUrlDialog.bind(this, 'video')}>Video</button>
              <button className="btn btn-primary" onClick={this.showInputUrlDialog.bind(this, 'image')}>Image</button>
              <button className="btn btn-primary" onClick={this.addText.bind(this)}>Text</button>
              <button className="btn btn-primary">Web</button>
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
                  return (<button onClick={this.clickArrangement.bind(this, button.key)} key={button.key}
                                  className="btn btn-default" value={button.key}>{button.label}</button>);
                })}
              </div>
            </div>
          </div>
          <div className="layer-order-container">
            <div className="object-container panel panel-info">
              <div className="panel-heading">Layer Order</div>
              <div className="panel-body">
                <button className="btn btn-default send-to-back-btn" onClick={this.bringToFront.bind(this)}>
                  Bring2Front
                </button>
                <button className="btn btn-default" onClick={this.sendToBack.bind(this)}>Send2Back</button>
                <button className="btn btn-default" onClick={this.bringForward.bind(this)}>BringForward</button>
                <button className="btn btn-default" onClick={this.sendBackWards.bind(this)}>SendBackwards</button>
              </div>
            </div>
          </div>
          <div className="properties-container">
            {this.renderPropertiesPanel()}
          </div>
        </div>
        {this.renderInputDialog()}
      </div>
    );
  }
}
