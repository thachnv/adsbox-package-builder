import React from 'react';
import Validator from '../../utils/Validator';
import { INPUT_WEBSITE_URL_FORM_VALIDATOR, SCALING_STYLE_BUTTONS } from '../../constant';
import classNames from 'classnames';
export default class WebProperties extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
    };
  }

  componentWillMount() {
    this.setState(this.getWebProps(this.props.webObj));
  }

  componentWillReceiveProps(props) {
    this.setState(this.getWebProps(props.webObj));
  }

  onChangeUrl(e) {
    if (Validator.validateForm(this.refs.inputWebsiteUrlForm, INPUT_WEBSITE_URL_FORM_VALIDATOR)) {
      const url = e.target.value;
      this.setState({
        url: url,
      });
      this.props.updateTo('url', url);
    }
  }

  getWebProps(webObj) {
    return {
      url: webObj.url || '',
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
        <div className="panel-heading">Video Properties</div>
        <div className="panel-body">
          <div className="video-properties">
            <form className="form-horizontal" ref="inputWebsiteUrlForm">
              <div className="form-group">
                <label className="control-label col-xs-2">URL</label>
                <div className="col-xs-10">
                  <input type="text" className="form-control" name="websiteUrl"
                         value={this.state.url} onChange={this.onChangeUrl.bind(this)} />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-xs-3">Scaling Style</label>
                <div className="col-xs-9">
                  {SCALING_STYLE_BUTTONS.map((button) => {
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
