import React, { Component } from 'react';
import { Storage } from 'aws-amplify';

class PlayButton extends Component {
  state = { src: null, s3key: null };

  async componentDidMount() {
    const { s3key } = this.props;
    const src = await Storage.get(s3key);
    this.setState({ src, s3key });
  }

  render() {
    const { src, s3key } = this.state;
    if (!src) return null;
    return (
      <li className="filelist list-inline-item d-flex flex-row w-30 mb-1 h-5 ">
        <button
          className="playbutton toolTip btn-light btn mr-1 d-flex "
          onClick={evt => this.props.playVideo(evt, src, s3key, true)}
        >
          <span className="button-filename">{this.props.s3key}</span>
          <span className="toolTiptext">{this.props.s3key}</span>
        </button>

        <button
          className="btn btn-light"
          index={this.props.index}
          onClick={evt => this.props.deleteVideo(evt, src, s3key, this.props.index)}
        >
          {'Delete'}
        </button>
      </li>
    );
  }
}

export default PlayButton;
