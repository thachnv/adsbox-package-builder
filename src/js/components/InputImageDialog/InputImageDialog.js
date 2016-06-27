import React from 'react';
import {Modal} from 'react-bootstrap';
import {API} from '../../constant.js';
import api from '../../utils/api';

export default class UploadDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      selectedFile: null,
    };
  }

  change() {
    const reader = new FileReader();
    const file = this.refs.file.files[0];

    this.setState({
      selectedFile: file,
    });

    reader.onload = (e) => {
      const blobData = e.target.result;
      this.refs.image.src = blobData;
    };

    reader.readAsDataURL(file);
  }

  changeUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  done() {
    if (this.state.selectedFile) {
      const data = new FormData();
      data.append(this.state.selectedFile);
      api.uploadPost(API.UPLOAD, data).done(response => {
        console.log(response);
        this.props.done(response);
      }).fail((error) => {
        console.log(error);
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
              <label className="control-label col-xs-2">URL</label>
              <div className="col-xs-10">
                <input className="form-control" value={this.state.url}
                       placeholder="Input Image URL" onChange={this.changeUrl.bind(this)}
                       ref="inputUrl"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-xs-2">Upload</label>
              <div className="col-xs-10 file-upload-control">
                <label className="btn btn-primary btn-file">
                  Browse <input type="file" ref="file" style={{display: 'none'}} onChange={this.change.bind(this)}/>
                </label>
              </div>
              <div className="col-xs-offset-2 col-xs-10 preview-before-upload">
                {this.state.selectedFile ? <img ref="image" height="300"/> : <div>No file chosen</div>}
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
