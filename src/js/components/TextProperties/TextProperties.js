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
    };
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
                <label className="control-label col-xs-2">Text</label>
                <div className="col-xs-10">
                  <input className="form-control" value={this.state.text}
                         onChange={this.handleTextChange.bind(this, 'text')}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-2">Font</label>
                <div className="col-xs-10">
                  <input className="form-control" value={this.state.fontFamily}
                         onChange={this.handleTextChange.bind(this, 'fontFamily')}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-2">Color</label>
                <div className="col-xs-10">
                  <input type="color" value={this.state.fill}
                         onChange={this.handleTextChange.bind(this, 'fill')}/>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-2">Size</label>
                <div className="col-xs-10">
                  <input type="number" value={this.state.fontSize}
                         onChange={this.handleTextChange.bind(this, 'fontSize')}
                         className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-2 col-xs-10">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleCheckBoxChange.bind(this, 'bold')}
                             checked={this.state.bold}/> Bold
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-2 col-xs-10">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" onChange={this.handleCheckBoxChange.bind(this, 'italic')}
                             checked={this.state.italic}/> Italic
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
