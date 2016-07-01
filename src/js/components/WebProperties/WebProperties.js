import React from 'react';
import Validator from '../../utils/Validator';
import {INPUT_WEBSITE_URL_FORM_VALIDATOR} from '../../constant';
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
      this.props.updateTo(url);
    }
  }

  getWebProps(webObj) {
    return {
      url: webObj.url || '',
    };
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
                         value={this.state.url} onChange={this.onChangeUrl.bind(this)}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
