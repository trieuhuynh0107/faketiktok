import React from 'react';
import './VideoInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faComment, 
  faBookmark, 
  faShare,
  faTimes,
  faCalendar,
  faEye,
  faMusic,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const VideoInfo = ({ video, isVisible, onClose }) => {
  if (!isVisible || !video) return null;

  // Format numbers
  const formatNumber = (num) => {
    if (typeof num === 'string') {
      return num;
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Get upload date (mock - you can customize this)
  const getUploadDate = () => {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 7) + 1;
    const uploadDate = new Date(today.setDate(today.getDate() - daysAgo));
    return uploadDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  // Calculate total engagement
  const calculateTotal = () => {
    let likesNum = typeof video.likes === 'number' ? video.likes : 
                   parseFloat(video.likes.replace('K', '')) * 1000;
    return likesNum + video.comments + video.saves + video.shares;
  };

  const totalEngagement = calculateTotal();

  return (
    <>
      <div className="video-info-overlay" onClick={onClose}></div>
      <div className="video-info-panel">
        {/* Close button */}
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header */}
        <div className="info-header">
          <img src={video.profilePic} alt={video.username} className="info-profile-pic" />
          <div className="info-user-details">
            <h2>
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '16px', marginRight: '5px' }} />
              @{video.username}
            </h2>
            <p className="upload-date">
              <FontAwesomeIcon icon={faCalendar} /> Uploaded {getUploadDate()}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="info-section">
          <h3>📝 Description</h3>
          <p className="info-description">{video.description}</p>
        </div>

        {/* Song Info */}
        <div className="info-section">
          <h3>
            <FontAwesomeIcon icon={faMusic} /> Sound
          </h3>
          <p className="info-song">{video.song}</p>
        </div>

        {/* Stats */}
        <div className="info-section">
          <h3>📊 Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <FontAwesomeIcon icon={faHeart} className="stat-icon likes" />
              <div>
                <p className="stat-number">{formatNumber(video.likes)}</p>
                <p className="stat-label">Likes</p>
              </div>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faComment} className="stat-icon comments" />
              <div>
                <p className="stat-number">{formatNumber(video.comments)}</p>
                <p className="stat-label">Comments</p>
              </div>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faBookmark} className="stat-icon saves" />
              <div>
                <p className="stat-number">{formatNumber(video.saves)}</p>
                <p className="stat-label">Saves</p>
              </div>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faShare} className="stat-icon shares" />
              <div>
                <p className="stat-number">{formatNumber(video.shares)}</p>
                <p className="stat-label">Shares</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Engagement */}
        <div className="info-section">
          <div className="engagement-total">
            <FontAwesomeIcon icon={faEye} />
            <span>Total Engagement: {formatNumber(totalEngagement)}</span>
          </div>
        </div>

        {/* Video URL */}
        <div className="info-section">
          <h3>🔗 Video URL</h3>
          <div className="url-container">
            <input 
              type="text" 
              value={`https://faketiktok.com/@${video.username}/video/${Math.random().toString(36).substr(2, 9)}`}
              readOnly 
              className="url-input"
              onClick={(e) => e.target.select()}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="info-section">
          <div className="additional-info">
            <p>💡 <strong>Tip:</strong> Press <kbd>→</kbd> key to open this panel</p>
            <p>📱 Scroll or drag to switch videos</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoInfo;