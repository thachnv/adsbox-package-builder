import React from 'react';

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

  getWebProps(webObj) {
    return {
      url: webObj.url || '',
    };
  }

  handleUrlChanged(e) {
    const url = e.target.value;
    this.setState({
      url: url,
    });
    this.props.updateTo(url);
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading">Video Properties</div>
        <div className="panel-body">
          <div className="video-properties">
            <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label col-xs-2">URL</label>
                <div className="col-xs-10">
                  <input type="text" className="form-control" value={this.state.url} onChange={this.handleUrlChanged.bind(this)}/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
