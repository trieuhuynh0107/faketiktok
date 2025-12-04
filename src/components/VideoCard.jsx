import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, shares, comments, saves, profilePic, setVideoRef, autoplay } = props;
  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  

  return (
  <div className="video">
    <video
      className="player"
      onClick={onVideoPress}
      ref={(ref) => {
        videoRef.current = ref;
        setVideoRef(ref);
      }}
      loop
      src={url}
      muted
    ></video>

    <div className="bottom-controls">
      <div className="footer-left">
        {/* The left part of the container */}
      </div>
      <div className="footer-right">
        {/* The right part of the container */}
      </div>
    </div>
  </div>
);
};

export default VideoCard;
