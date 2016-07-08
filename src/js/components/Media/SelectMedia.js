import React from 'react';
import MediaStore from '../../stores/MediaStore';
import MediaActions from '../../actions/MediaActions';
import MediaItem from './MediaItem';

export default class SelectMedia extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      mediaList: null,
      selectedMedia: null,
    };
    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount() {
    MediaStore.addChangelistener(this.onDataChange);
    MediaActions.getMediaList(this.props.type);
  }

  componentWillUnmount() {
    MediaStore.removeChangeListener(this.onDataChange);
  }

  onDataChange() {
    this.setState({
      mediaList: MediaStore.getMediaList(),
      selectedMedia: MediaStore.getSelectedMedia(),
    });
  }

  render() {
    if (!this.state.mediaList) {
      return <div>Loading</div>;
    }
    return (
      <div className="row">
        {this.state.mediaList.map((media) =>
          <MediaItem
            key={media.id}
            active={this.state.selectedMedia ? this.state.selectedMedia.id === media.id : null}
            mediaInfo={media}
          />)}
      </div>
    );
  }
}
