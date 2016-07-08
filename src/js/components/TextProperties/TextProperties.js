import React from 'react';
export default class TextProperties extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      fontFamily: '',
      fill: '',
      fontSize: 10,
      italic: false,
      bold: false,
      animation: '',
    };
    this.fonts = [
      'Times New Roman',
      'Arial',
      'Courier New',
      'Comic Sans MS',
      'Impact',
      'Tahoma',
      'Trebuchet MS',
      'Verdana',
      'Courier New',
    ];
    this.animations = [
      {
        label: 'None',
        value: '',
      },
      {
        label: 'Left To Right',
        value: 'leftToRight',
      },
      {
        label: 'Right To Left',
        value: 'rightToLeft',
      },
    ];
    this.fontSizes = [
      {
        label: '24',
        value: 24,
      },
      {
        label: '32',
        value: 32,
      },
      {
        label: '40',
        value: 40,
      },
      {
        label: '48',
        value: 48,
      },
      {
        label: '56',
        value: 56,
      },
    ];
  }

  componentWillMount() {
    this.setState(this.getTextProps(this.props.textProps));
  }

  componentWillReceiveProps(props) {
    this.setState(this.getTextProps(props.textProps));
  }

  getTextProps(object) {
    return {
      text: object.text,
      fontFamily: object.fontFamily,
      fill: object.fill,
      fontSize: object.fontSize,
      italic: object.fontStyle === 'italic',
      bold: object.fontWeight === 'bold',
    };
  }

  handleCheckBoxChange(key, e) {
    const value = e.target.checked;
    const newState = {};
    newState[key] = value;
    this.setState(newState);

    if (key === 'bold') {
      let fontWeightValue;
      if (value) {
        fontWeightValue = 'bold';
      } else {
        fontWeightValue = 'normal';
      }
      this.props.updateTo('fontWeight', fontWeightValue);
      return;
    }

    if (key === 'italic') {
      let fontStyleValue;
      if (value) {
        fontStyleValue = 'italic';
      } else {
        fontStyleValue = 'normal';
      }
      this.props.updateTo('fontStyle', fontStyleValue);
    }
  }

  handleTextChange(key, e) {
    const newState = {};
    const value = e.target.value;
    newState[key] = value;
    this.setState(newState);
    this.props.updateTo(key, value);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">Text Properties</div>
        <div className="panel-body">
          <div className="text-properties">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-xs-3">Text</label>
                <div className="col-xs-9">
                  <input className="form-control" value={this.state.text}
                         onChange={this.handleTextChange.bind(this, 'text')}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-3">Font</label>
                <div className="col-xs-9">
                  <select className="form-control" value={this.state.fontFamily}
                          onChange={this.handleTextChange.bind(this, 'fontFamily')}>
                    {this.fonts.map((font, index) => {
                      return (
                        <option value={font} key={index}>{font}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-3">Color</label>
                <div className="col-xs-9">
                  <input type="color" value={this.state.fill}
                         onChange={this.handleTextChange.bind(this, 'fill')}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-3">Size</label>
                <div className="col-xs-9">
                  <select className="form-control" value={this.state.fontSize}
                          onChange={this.handleTextChange.bind(this, 'fontSize')}>
                    {this.fontSizes.map((fontSize, index) => {
                      return (
                        <option value={fontSize.value} key={index}>{fontSize.label}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-3 col-xs-9">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleCheckBoxChange.bind(this, 'bold')}
                             checked={this.state.bold}/> Bold
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-3 col-xs-9">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleCheckBoxChange.bind(this, 'italic')}
                             checked={this.state.italic}/> Italic
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-3">Animation</label>
                <div className="col-xs-9">
                  <select className="form-control" value={this.state.animation}
                          onChange={this.handleTextChange.bind(this, 'animation')}>
                    {this.animations.map(animation => {
                      return (
                        <option value={animation.value} key={animation.value}>{animation.label}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
