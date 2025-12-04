import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = ({ onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    onSearch(''); 
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon"/>
      
      {!isSearchOpen ? (
        <>
          <h2>Following | <span>For You</span></h2>
          <FontAwesomeIcon 
            icon={faSearch} 
            className="icon"
            onClick={handleSearchClick}
            style={{ cursor: 'pointer' }}
          />
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search hashtag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            autoFocus
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '20px',
              outline: 'none',
              marginRight: '10px'
            }}
          />
          <FontAwesomeIcon 
            icon={faTimes} 
            className="icon"
            onClick={handleCloseSearch}
            style={{ cursor: 'pointer' }}
          />
        </>
      )}
    </div>
  );
};

export default TopNavbar;