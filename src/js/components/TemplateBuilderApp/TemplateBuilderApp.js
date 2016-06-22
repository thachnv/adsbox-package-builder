import React from 'react';
import TextProperties from '../TextProperties/TextProperties.js';

export default class TemplateBuilderApp extends React.Component {
  constructor() {
    super();
    this.canvas = null;
    this.state = {
      activeProp: null,
      activePropType: null,
    };
    this.activeObject = null;
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.refs.mainCanvas)
    this.canvas.on('object:selected', this.getActiveObject.bind(this));

  }

  addText() {
    const textSample = new fabric.Text('Click me to edit', {
      left: 2,
      top: 2,
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      originX: 'left',
      hasRotatingPoint: true,
      centerTransform: true
    });

    this.canvas.add(textSample);
  }

  getActiveObject(name) {
    this.activeObject = this.canvas.getActiveObject();
    if (!this.activeObject) return '';

    this.setState({
      activePropType: this.activeObject.type,
    });

    return this.activeObject;

    // if (object.type === 'text') {
    //   this.setState({
    //     activeProp: object['text']
    //   })
    // }

    // return object[name] || '';
  }

  setActiveProp(name, value) {
    var object = this.canvas.getActiveObject();
    if (!object) return;

    object.set(name, value).setCoords();
    this.canvas.renderAll();
  }

  updateText(propName, value) {
    this.setActiveProp(propName, value);
  }


  addVideo() {

  }

  renderPropertiesPanel() {
    if (this.state.activePropType === 'text') {
      return (
        <TextProperties textProps={this.activeObject} updateTo={this.updateText.bind(this)}/>
      )
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="main-canvas-wrapper pull-left">
          <canvas width="500" height="500" ref="mainCanvas"></canvas>
        </div>
        <div className="controller-container pull-left">
          <div className="object-container">
            <button className="btn btn-primary" onClick={this.addVideo.bind(this)}>Video</button>
            <button className="btn btn-primary">Image</button>
            <button className="btn btn-primary" onClick={this.addText.bind(this)}>Text</button>
            <button className="btn btn-primary">Web</button>
          </div>
          <div className="arrangement-container">
          </div>
          <div className="properties-container">
            {this.renderPropertiesPanel()}
          </div>
          <div className="layer-order-container">
          </div>
        </div>
      </div>
    )
  }
}