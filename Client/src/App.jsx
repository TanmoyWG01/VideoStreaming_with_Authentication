import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LogIn/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import VideoPlayer from "./components/VideoStream/VideoPlayer/VideoPlayer";
import Chat from "./components/Chat/chat";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/video/:videoId" element={<VideoPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
