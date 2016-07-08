import React from 'react';
import { Modal } from 'react-bootstrap';
import { API, INPUT_WEBSITE_URL_FORM_VALIDATOR } from '../../constant.js';
import api from '../../utils/api';
import Validator from '../../utils/Validator';
import SelectMedia from '../Media/SelectMedia';
import MediaStore from '../../stores/MediaStore';
import MediaActions from '../../actions/MediaActions';

export default class UploadDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      currentActiveTab: 'inputUrl',
    };
    this.changeUrl = this.changeUrl.bind(this);
    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(tab) {
    this.setState({
      currentActiveTab: tab,
    });
  }

  done() {
    if (this.state.currentActiveTab === 'inputUrl') {
      this.setState({
        isLoading: true,
      });
      api.post(API.WEBPAGE_SCREENSHOT, {
        url: this.state.url,
      }).done(response => {
        const website = response.asset;
        this.props.done(website);
      }).always(() => {
        this.setState({
          isLoading: false,
        });
      });
    } else {
      const website = MediaStore.getSelectedMedia();
      MediaActions.removeSelectedMedia();
      this.props.done(website);
    }
  }

  changeUrl(e) {
    if (Validator.validateForm(this.refs.inputWebsiteUrlForm, INPUT_WEBSITE_URL_FORM_VALIDATOR)) {
      this.setState({
        url: e.target.value,
      });
    }
  }

  renderNavTabs() {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li role="presentation" className="active">
          <a
            href="#input-url" onClick={() => this.selectTab('inputUrl')}
            aria-controls="input-url" role="tab" data-toggle="tab"
          >
            Input URL
          </a>
        </li>
        <li role="presentation">
          <a
            href="#select" onClick={() => this.selectTab('select')}
            aria-controls="select" role="tab" data-toggle="tab"
          >
            Select from Library
          </a>
        </li>
      </ul>
    );
  }

  renderInputURLPane() {
    return (
      <div className="form-horizontal" ref="inputWebsiteUrlForm">
        <div className="form-group">
          <label className="control-label col-xs-2">URL</label>
          <div className="col-xs-10">
            <input
              onChange={this.changeUrl}
              className="form-control" name="websiteUrl"
              placeholder="Input Website URL"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Input URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderNavTabs()}
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="input-url">
              {this.renderInputURLPane()}
            </div>
            <div role="tabpanel" className="tab-pane" id="select">
              <SelectMedia type="website" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" disabled={this.state.isLoading}
                  onClick={this.done.bind(this)}>Ok
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
