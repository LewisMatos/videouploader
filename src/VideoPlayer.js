import React from 'react';
import ReactPlayer from 'react-player';

export default function VideoPlayer(props) {
  return (
    <ReactPlayer url={props.url} className="player" width="100%" height="100%" playing={props.autoplay} controls />
  );
}
