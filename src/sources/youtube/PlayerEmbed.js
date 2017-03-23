import React from 'react';
import PropTypes from 'prop-types';
import YouTube from '@u-wave/react-youtube';

export default class YouTubePlayerEmbed extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    media: PropTypes.object,
    seek: PropTypes.number,
    volume: PropTypes.number,
    showControls: PropTypes.bool
  };

  static defaultProps = {
    showControls: false
  };

  handleYTPause = (event) => {
    event.target.playVideo();
  };

  refPlayer = (player) => {
    this.player = player;
  };

  render() {
    const { active, media, seek, volume, showControls } = this.props;

    return (
      <YouTube
        ref={this.refPlayer}
        video={active ? media.sourceID : null}
        width="100%"
        height="100%"
        autoplay
        modestBranding
        volume={volume / 100}
        playbackRate={1}
        controls={showControls}
        showRelatedVideos={false}
        showInfo={false}
        annotations={false}
        startSeconds={(seek || 0) + (media.start || 0)}
        endSeconds={media.end || media.duration}
        onPause={this.handleYTPause}
      />
    );
  }
}
