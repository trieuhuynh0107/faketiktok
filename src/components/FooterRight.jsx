import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";


function FooterRight({ likes, comments, saves, shares, profilePic, videoRef }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faHeart);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const closeSharePopup = () => {
    setShowSharePopup(false);
  };

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000); // Delay in milliseconds
  };

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('k')) {
        return parseFloat(count) * 1000;
      }
    }
    return parseInt(count);
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };
const [muted, setMuted] = useState(false);

const handleMuteClick = () => {
  if (videoRef?.current) {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  }
};
const handleSaveClick = () => {
  setSaved(!saved);

  if (videoRef?.current) {
    const videoUrl = videoRef.current.src;
    navigator.clipboard.writeText(videoUrl)
      .then(() => console.log("Copied:", videoUrl))
      .catch(err => console.error("Copy failed:", err));
  }
};

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {/* Displaying the user profile picture */}
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: '45px', height: '45px', color: '#616161' }}
          />
        ) : null}
        {/* The user add icon */}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: '15px', height: '15px', color: '#FF0000' }}
          onClick={handleUserAddClick}
        />
      </div>

      <div className="sidebar-icon">
        {/* The heart icon for liking */}
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: '35px',
            height: '35px',
            color: liked ? '#FF0000' : 'white',
          }}
          onClick={handleLikeClick}
        />
        {/* Displaying the formatted likes count */}
        <p>{formatLikesCount(parseLikesCount(likes)) + (liked ? 1 : 0)}</p>
      </div>

      <div className="sidebar-icon">
        {/* The comment icon */}
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        <p>{comments}</p> {/* Displaying the number of comments */}
      </div>

     <div className="sidebar-icon" onClick={handleSaveClick}>
        <FontAwesomeIcon
          icon={faBookmark}
          style={{
            width: '35px',
            height: '35px',
            color: saved ? '#ffc107' : 'white'
          }}
        />
        <p>{saves}</p>
      </div>


      <div className="sidebar-icon" onClick={handleMuteClick}>
        <FontAwesomeIcon
          icon={muted ? faVolumeXmark : faVolumeHigh}
          className="icon"
        />
        <p>{muted ? "Muted" : "Sound"}</p>
      </div>

      <div className="sidebar-icon" onClick={handleShareClick}>
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        <p>{shares}</p>
      </div>


      <div className="sidebar-icon record">
        {/* Displaying the record icon */}
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>
      {showSharePopup && (
      <div className="share-popup">
        <div className="share-popup-content">
          <button className="close-btn" onClick={closeSharePopup}>✖</button>
          <h3>Share to:</h3>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Threads</li>
          </ul>
        </div>
      </div>
    )}
    </div>
  );
}

export default FooterRight;
