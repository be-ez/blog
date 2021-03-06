import React, { Component } from "react"
import { graphql } from "gatsby"
import Img from 'gatsby-image'
import {
  Box,
  Card,
  Heading,
  Text
} from 'rebass'


import PropTypes from 'prop-types';
import * as LivePhotosKit from 'livephotoskit';

class LivePhotosKitReact extends Component {

  slowLoadLivePhotoKit () {
    const {
      photoSrc,
      videoSrc,
      onCanPlay,
      onError,
      onEnded,
      onPhotoLoad,
      onVideoLoad,
      playbackStyle,
      style,
    } = this.props;
    const _style = { width: '100%', height: '100%', ...style };
    this._player = LivePhotosKit.Player(this._node);

    this._player.photoSrc = photoSrc;
    this._player.videoSrc = videoSrc;
    this._player.addEventListener('canplay', evt => {
      if (onCanPlay === undefined) { return; }
      onCanPlay(evt);
    });
    this._player.addEventListener('error', evt => {
      if (onError === undefined) { return; }
      onError(evt);
    });
    this._player.addEventListener('ended', evt => {
      if (onEnded === undefined) { return; }
      onEnded(evt);
    });
    this._player.addEventListener('videoload', evt => {
      if (onVideoLoad === undefined) { return; }
      onVideoLoad(evt);
    });
    this._player.addEventListener('photoload', evt => {
      if (onPhotoLoad === undefined) { return; }
      onPhotoLoad(evt);
    });
    this._player.playbackStyle = playbackStyle;

    for (var key in _style) {
      if (_style.hasOwnProperty(key)) {
        this._player.style[key] = _style[key];
      }
    }
  }


  componentDidMount () {
    const {
        svgSrc
      } = this.props;
    this.slowLoadLivePhotoKit()
  }

  play () {
    this._player.play();
  }

  pause () {
    this._player.play();
  }

  toggle () {
    this._player.toggle();
  }

  stop () {
    this._player.stop();
  }

  seekTo (currentTime) {
    this._player.currentTime = currentTime;
  }

  get player () {
    return this._player;
  }

  get duration () {
    return this._player.duration;
  }

  render () {
    return (
      <div
        ref={ c => {
          return (this._node = c);
        } }
      >
      </div>
    );
  }
}

LivePhotosKitReact.propTypes = {
  photoSrc: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  onCanPlay: PropTypes.func,
  onError: PropTypes.func,
  onEnded: PropTypes.func,
  onPhotoLoad: PropTypes.func,
  onVideoLoad: PropTypes.func,
  playbackStyle: PropTypes.string,
  style: PropTypes.object,
};

export default function ContentfulLivePhoto({content}) {
  return (
      <Box
        width={1}
        height={1}
        Flex
      ><Card className="livephoto">
      <LivePhotosKitReact 
        photoSrc={content.still.file.url}
        videoSrc={content.video.file.url}
        fluid={content.still.fluid}
        ></LivePhotosKitReact>
        </Card></Box>
  )
}

export const cardFragment = graphql`
  fragment ContentfulLivePhotoFragment on ContentfulLivePhoto {
    id
    still {
      file {
        url
        fileName
        contentType
      }
    }
    video {
      id
      file {
        url
        fileName
        contentType
      }
    }
  }
`
