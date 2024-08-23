import Navbar from "../Navbar/Navbar";
import VideoStream from "../VideoStream/VideoStream";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../LogIn/Login";


export default function Home() {
  const [isAuthSuccess, setIsAuthSuccess] = useState(false);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
       
          const response = await axios.get("http://localhost:8080",{
            withCredentials: true 
          })

          if (response.status === 200) {
            setIsAuthSuccess(true);
          } else {
            setIsAuthSuccess(false);
          }
     
      } catch (error) {
        setIsAuthSuccess(false);
      }
    };

    checkAuthStatus();
  }, [isAuthSuccess]);

  return (
    <div>
      {isAuthSuccess ? (
        <>
          <Navbar />
          <VideoStream />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

