import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';

const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://res.cloudinary.com/dxtwiciz0/image/upload/v1764610694/cleaning-service/rkwbyi4jx7tggjcgiiy0.png',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://res.cloudinary.com/dxtwiciz0/image/upload/v1764271471/cleaning-service/ecseyabmwqhcs2v6rcwx.png',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://res.cloudinary.com/dxtwiciz0/image/upload/v1764684613/cleaning-service/ebss05sqoyzef4hyjxjp.jpg',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://dayve.vn/wp-content/uploads/2021/12/Cach-ve-vit-Donald-buoc-7.png',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const videoRefs = useRef([]);
  
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setVideos(videoUrls);
    setFilteredVideos(videoUrls);
  }, []);

  useEffect(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const videoElement = entry.target;
        videoElement.play();
      } else {
        const videoElement = entry.target;
        videoElement.pause();
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, observerOptions);

  videoRefs.current.forEach((videoRef) => {
    if (videoRef) {  
      observer.observe(videoRef);
    }
  });

  return () => {
    observer.disconnect();
  };
}, [filteredVideos]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const currentY = e.clientY;
    const diff = startY - currentY;

    if (diff > 50) {
      const container = containerRef.current;
      if (container) {
        container.scrollBy({
          top: window.innerHeight,
          behavior: 'smooth'
        });
      }
      setIsDragging(false);
    }
    else if (diff < -50) {
      const container = containerRef.current;
      if (container) {
        container.scrollBy({
          top: -window.innerHeight,
          behavior: 'smooth'
        });
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredVideos(videos);
      return;
    }

    const filtered = videos.filter(video => {
      const hashtag = query.toLowerCase().replace('#', '');
      return video.description.toLowerCase().includes(`#${hashtag}`);
    });

    setFilteredVideos(filtered);
    
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div className="app">
      <div 
        className="container"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <TopNavbar className="top-navbar" onSearch={handleSearch} /> 
        
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <VideoCard
              key={index}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              saves={video.saves}
              comments={video.comments}
              shares={video.shares}
              url={video.url}
              profilePic={video.profilePic}
              setVideoRef={handleVideoRef(index)}
              autoplay={index === 0}
            />
          ))
        ) : (
          <div style={{ 
            color: 'white', 
            textAlign: 'center', 
            marginTop: '50px',
            fontSize: '18px' 
          }}>
            No videos found with this hashtag 😢
          </div>
        )}
        
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;