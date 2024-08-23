import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LogIn/Login";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
