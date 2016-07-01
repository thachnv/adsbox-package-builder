import React from 'react';
import {Modal} from 'react-bootstrap';
import {API, INPUT_WEBSITE_URL_FORM_VALIDATOR} from '../../constant.js';
import api from '../../utils/api';
import Validator from '../../utils/Validator';

export default class UploadDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
    };
  }

  done() {
    api.post(API.WEBPAGE_SCREENSHOT, {
      url: this.state.url,
    }).done(response => {
      const webpageScreenshotUrl = response.result;
      this.props.done(webpageScreenshotUrl);
    });
  }

  changeUrl(e) {
    if (Validator.validateForm(this.refs.inputWebsiteUrlForm, INPUT_WEBSITE_URL_FORM_VALIDATOR)) {
      this.setState({
        url: e.target.value,
      });
    }
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Input URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" ref="inputWebsiteUrlForm">
            <div className="form-group">
              <label className="control-label col-xs-2">URL</label>
              <div className="col-xs-10">
                <input onChange={this.changeUrl.bind(this)}
                       className="form-control" name="websiteUrl"
                       placeholder="Input Website URL"/>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary"
                  onClick={this.done.bind(this)}>Ok
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
