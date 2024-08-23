import "./videoStream.css";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import { useState } from "react";


const videos = [
  {
      id: "video1",
      name: 'Play Video 1',
      thumbnail: 'https://images.unsplash.com/photo-1459184070881-58235578f004?q=80&w=1732&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'This is a description of Sample Video 1.',
  },
  {
      id: "video2",
      name: 'Play Video 2',
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'This is a description of Sample Video 2.',
  },
  {
    id: "video3",
    name: 'Play Video 3',
    thumbnail: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This is a description of Sample Video 3.',
},
{
  id: "video4",
  name: 'Play Video 4',
  thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'This is a description of Sample Video 4.',
},
{
  id: "video5",
  name: 'Play Video 5',
  thumbnail: 'https://images.unsplash.com/photo-1485662765173-b710c399cd34?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description: 'This is a description of Sample Video 5.',
},
  
];


export default function VideoStream() {
  const [videoId, setVideoId] = useState(null)


  const playVideo = (e, videoId) =>{
    e.preventDefault
    setVideoId(videoId)
  }

  return (
    <>
     <div className="videoPlayer">
        {videoId && <VideoPlayer videoId={videoId} />}
      </div>
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} onClick={(e) => playVideo(e, video.id)} className="video-card">
            <div className="video-thumbnail">
              <img src={video.thumbnail} alt={`Thumbnail of ${video.name}`} />
            </div>
            <div className="video-info">
              <span className="video-title">{video.name}</span>
              <p className="video-description">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )

}
