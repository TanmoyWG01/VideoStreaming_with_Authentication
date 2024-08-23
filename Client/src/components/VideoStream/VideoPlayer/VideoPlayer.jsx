import React, { useRef, useEffect } from "react";
import "./videoPlayer.css"

export default function VideoPlayer({ videoId }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.removeAttribute("src")
      videoRef.current.load()
    }
  });
  return (
    <div>
      <video ref={videoRef} className="videoGet" controls autoPlay>
        <source src={`http://localhost:8080/video/${videoId}`} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
