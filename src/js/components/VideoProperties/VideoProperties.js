import React from 'react';
import classNames from 'classnames';
import {SCALING_STYLES, SCALING_STYLE_BUTTONS} from '../../constant.js';

export default class VideoProperties extends React.Component {
  constructor() {
    super();
    this.state = {
      scalingStyle: 'free',
    };
    this.scalingStyleButtons = SCALING_STYLE_BUTTONS;
  }

  componentWillMount() {
    this.setState(this.getVideoProps(this.props.videoObj));
  }

  componentWillReceiveProps(props) {
    this.setState(this.getVideoProps(props.videoObj));
  }

  getVideoProps(videoObj) {
    return {
      scalingStyle: videoObj.scalingStyle || 'free',
    };
  }

  selectScalingStyle(e) {
    const value = e.target.value;
    this.setState({
      scalingStyle: value,
    });
    this.props.updateTo(value);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">Video Properties</div>
        <div className="panel-body">
          <div className="video-properties">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-xs-3">Scaling Style</label>
                <div className="col-xs-9">
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
