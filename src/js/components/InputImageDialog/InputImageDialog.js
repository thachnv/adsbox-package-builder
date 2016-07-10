import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { API } from '../../constant.js';
import api from '../../utils/api';
import SelectMedia from '../Media/SelectMedia';
import MediaStore from '../../stores/MediaStore';
import MediaActions from '../../actions/MediaActions';

export default class UploadDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      selectedFile: null,
      currentActiveTab: 'upload',
      uploadProgress: 0,
    };
    this.onUploadProgress = this.onUploadProgress.bind(this);
    this.done = this.done.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.change = this.change.bind(this);
  }

  onUploadProgress(progress) {
    let _progress = progress;
    if (this.state.isLoading && progress >= 99) {
      _progress = 99;
    }
    this.setState({
      uploadProgress: _progress,
    });
  }

  done() {
    if (this.state.currentActiveTab === 'upload') {
      if (this.state.selectedFile) {
        const data = new FormData();
        data.append('uploadfile', this.state.selectedFile);
        this.setState({
          isLoading: true,
        });
        api.uploadPost(API.UPLOAD, data, this.onUploadProgress)
          .done(response => {
            const image = response.asset;
            this.props.done(image.url);
          })
          .fail((error) => {
            $.notify(error.message || 'Fail to upload image', {
              className: 'error',
              elementPosition: 'bottom right',
            });
          })
          .always(() => {
            this.setState({
              isLoading: false,
            });
          });
      } else {
        this.props.done(this.state.url);
      }
    } else {
      const imageUrl = MediaStore.getSelectedMedia().url;
      MediaActions.removeSelectedMedia();
      this.props.done(imageUrl);
    }
  }

  change() {
    const reader = new FileReader();
    const file = this.refs.file.files[0];

    this.setState({
      selectedFile: file,
    });

    reader.onload = (e) => {
      this.refs.image.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  changeUrl(e) {
    this.setState({
      url: e.target.value,
    });
  }

  selectTab(tab) {
    this.setState({
      currentActiveTab: tab,
    });
  }

  renderNavTabs() {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li role="presentation" className="active">
          <a
            href="#upload" onClick={() => this.selectTab('upload')}
            aria-controls="upload" role="tab" data-toggle="tab"
          >
            Upload
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

  renderUploadPane() {
    if (this.state.isLoading) {
      return (
        <div className="col-xs-12">
          <ProgressBar
            bsStyle="success"
            now={this.state.uploadProgress}
            label={`${this.state.uploadProgress}%`}
          />
        </div>
      );
    }

    return (
      <div className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-xs-2">URL</label>
          <div className="col-xs-10">
            <input
              className="form-control" value={this.state.url}
              placeholder="Input Image URL" onChange={this.changeUrl}
              ref="inputUrl"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-xs-2">Upload</label>
          <div className="col-xs-10 file-upload-control">
            <label className="btn btn-primary btn-file">
              Browse
              <input
                type="file" ref="file" style={{ display: 'none' }}
                onChange={this.change}
              />
            </label>
          </div>
          <div className="col-xs-offset-2 col-xs-10 preview-before-upload">
            {this.state.selectedFile ?
              <img alt="upload-preview" className="upload-image-preview" ref="image" />
              : <div>No file chosen</div>}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show} onHide={this.props.onHide}
        backdrop={this.state.isLoading ? 'static' : true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Input URL</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderNavTabs()}
          <div className="tab-content">
            <div role="tabpanel" className="tab-pane active" id="upload">
              {this.renderUploadPane()}
              <div className="clearfix"></div>
            </div>
            <div role="tabpanel" className="tab-pane" id="select">
              <SelectMedia type="image" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary" disabled={this.state.isLoading}
            onClick={this.done}
          >Ok
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}
