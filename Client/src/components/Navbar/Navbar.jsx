import "./navbar.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

//Import reac-Icons
import { FaVideo } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";


export default function Dashboard() {
  const [loggedInUser, SetLoggedInUser] = useState("");

  useEffect(() => {
    SetLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout', {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      setTimeout(()=>{
        navigate("/");
      })
    } catch (err) {
      console.error('Logout failed:', err);
      
    }
  };

  return (
    <div className="dashBoard_Container">
      <div className="logoDiv">
        <FaVideo style={{ fontSize: "20px" }} />
        <span className="LogoName">VStream</span>
      </div>

      {/* <div className="NavBarItems">
        <ul className="NavbarUl">
          <li className="navList">
            <a href="#" className="LinkLoc">
              All
            </a>
          </li>
          <li className="navList">
            <a href="#">Actions</a>
          </li>
          <li className="navList">
            <a href="#">Funny</a>
          </li>
          <li className="navList">
            <a href="#">Movies</a>
          </li>
        </ul>
      </div> */}

      <div className="NavbarBtn">
        <button className="btnlogIn" style={{ color: "black" }}>
          {loggedInUser}
          <CiLogin className="logInIcon" />
        </button>

        <button
          onClick={handleLogout}
          className="btnNormal"
          style={{ color: "white" }}
        >
          LogOut
          <CiLogout className="logOutIcon" />
        </button>
      </div>
    </div>
  );
}
