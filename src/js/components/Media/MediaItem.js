import React from 'react';
import Video from '../../objects/Video.js';
import Website from '../../objects/Website.js';
import Text from '../../objects/Text';
import TextProperties from '../TextProperties/TextProperties.js';
import ImageProperties from '../ImageProperties/ImageProperties.js';
import VideoProperties from '../VideoProperties/VideoProperties.js';
import WebProperties from '../WebProperties/WebProperties.js';
import { ARRANGEMENT, SCALING_STYLES, API, ARRANGEMENT_BUTTONS } from '../../constant.js';
import InputVideoDialog from '../InputVideoDialog/InputVideoDialog';
import InputWebsiteDialog from '../InputWebsiteDialog/InputWebsiteDialog';
import InputImageDialog from '../InputImageDialog/InputImageDialog';
import InputTemplateNameDialog from '../InputTemplateNameDialog/InputTemplateNameDialog';
import classNames from 'classnames';
import api from '../../utils/api';
import ObjectUtil from '../../utils/ObjectUtil';
import MediaStore from '../../stores/MediaStore';
import MediaActions from '../../actions/MediaActions';

export default class MediaItem extends React.Component {
  constructor(...args) {
    super(...args);
    this.selectMedia = this.selectMedia.bind(this);
  }

  selectMedia() {
    MediaActions.selectMedia(this.props.mediaInfo);
  }

  render() {
    const wrapperClasses = ['col-xs-4', 'media-item'];
    if (this.props.active) {
      wrapperClasses.push('active');
    }
    return (
      <div className={classNames(...wrapperClasses)}>
        <div className="panel panel-success">
          <div className="panel-heading">{this.props.mediaInfo.filename}</div>
          <div className="panel-body" onClick={this.selectMedia}>
            <img
              alt="thumbnail"
              src={this.props.mediaInfo.thumbnail}
            />
          </div>
        </div>
      </div>
    );
  }
}
