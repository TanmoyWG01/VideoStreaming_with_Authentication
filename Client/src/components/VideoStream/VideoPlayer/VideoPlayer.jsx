import React, { useRef, useEffect } from "react";
import "./videoPlayer.css"
import { useParams } from "react-router-dom";

export default function VideoPlayer() {
  // const videoRef = useRef(null);
  const {videoId} = useParams()

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.pause()
  //     videoRef.current.removeAttribute("src", `http://localhost:8080/video/${videoId}`)
  //     videoRef.current.load();
  //     videoRef.current.play();
  //   }
  // },[videoId]);

  return (
    <div>
      <video videoId={videoId} className="videoGet" controls autoPlay> 
        <source  src={`http://localhost:8080/video/${videoId}`} type="video/mp4"/>
        Your browser does not support the video tag.
      </video> 
    </div>
  );
}

// ref={videoRef} for play video in a single page without reload then need to use it
