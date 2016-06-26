import React from 'react';
import classNames from 'classnames';
import {SCALING_STYLES, SCALING_STYLE_BUTTONS} from '../../constant.js';
export default class ImageProperties extends React.Component {
  constructor() {
    super();
    this.state = {
      scalingStyle: SCALING_STYLES.FREE,
    };
    this.scalingStyleButtons = SCALING_STYLE_BUTTONS;
  }

  componentWillMount() {
    this.setState(this.getImageProps(this.props.imageObj));
  }

  componentWillReceiveProps(props) {
    this.setState(this.getImageProps(props.imageObj));
  }

  getImageProps(imageObj) {
    return {
      scalingStyle: imageObj.scalingStyle,
    };
  }

  selectScalingStyle(e) {
    const value = e.target.value;
    this.setState({
      scalingStyle: value,
    });
    this.props.updateTo('scalingStyle', value);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">Image Properties</div>
        <div className="panel-body">
          <div className="text-properties">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-xs-2">Scaling Style</label>
                <div className="col-xs-10">
                  {this.scalingStyleButtons.map((button) => {
                    const classes = ['btn', 'btn-default'];
                    if (button.key === this.state.scalingStyle) {
                      classes.push('active');
                    }
                    return (<button type="button" onClick={this.selectScalingStyle.bind(this)} key={button.key}
                                    className={classNames(...classes)} value={button.key}>{button.label}</button>);
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
