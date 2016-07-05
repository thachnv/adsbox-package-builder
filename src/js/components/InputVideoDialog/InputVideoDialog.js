import React from 'react';
import {Modal} from 'react-bootstrap';
import {API} from '../../constant.js';
import api from '../../utils/api';

export default class InputVideoDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      selectedFile: null,
    };
  }

  change() {
    const file = this.refs.file.files[0];
    this.setState({
      selectedFile: file,
    });
  }

  changeUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  done() {
    if (this.state.selectedFile) {
      const data = new FormData();
      data.append('uploadfile', this.state.selectedFile);
      this.setState({
        isLoading: true,
      });
      api.uploadPost(API.UPLOAD, data).done(response => {
        const video = response.asset;
        this.props.done(video.url);
      }).fail((error) => {
        console.log(error);
      }).always(()=> {
        this.setState({
          isLoading: false,
        });
      });
    } else {
      this.props.done(this.state.url);
    }
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
              <label className="control-label col-xs-2">Upload</label>
              <div className="col-xs-10 file-upload-control">
                <label className="btn btn-primary btn-file">
                  Browse <input type="file" ref="file" style={{display: 'none'}} onChange={this.change.bind(this)}/>
                </label>
              </div>
              <div className="col-xs-offset-2 col-xs-10 preview-before-upload">
                {this.state.selectedFile ? <div>{this.state.selectedFile.name}</div> : <div>No file chosen</div>}
              </div>
            </div>
          </form>
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
