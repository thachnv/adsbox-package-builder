import React from 'react';
import {Modal} from 'react-bootstrap';
import {API} from '../../constant.js';
import api from '../../utils/api';

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
      console.log(response);
      this.props.done(response);
    });
  }

  changeUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Input URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-xs-2">URL</label>
              <div className="col-xs-10">
                <input onChange={this.changeUrl.bind(this)} className="form-control"
                       placeholder="Input Website URL" ref="inputUrl"/>
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
