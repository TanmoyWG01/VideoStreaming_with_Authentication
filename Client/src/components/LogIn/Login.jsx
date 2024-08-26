import "./login.css";
import Video from "../../assets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { handleSuccess, handleError } from "../Utils/Utils";

//ReactIcons

import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
    } else{
      navigate("/")
    }
  },[navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyInfo = { ...loginInfo };
    copyInfo[name] = value;
    setLoginInfo(copyInfo);
  };
  //  console.log('loginInfo ->', loginInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Write all the field!");
    }

    try {
      const url = "/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      const { success, error, jwtToken, name } = result;

      if (success) {
        handleSuccess("Login Successful");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/");
          navigate(0);
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError("Error!, Check again everything");
      }

      //  console.log(result)
      
    } catch (err) {
      handleError(err);
    }
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="LoginWrapper">
      <video src={Video} autoPlay loop muted />
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoFocus
              id="username"
              className="lInput"
              // autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              className="lInput"
              onChange={handleChange}
            />
            {showPassword ? (
              <BsEye className="eyeIcon" onClick={handleShow} />
            ) : (
              <BsEyeSlash className="eyeIcon" onClick={handleShow} />
            )}
          </div>
          

          <button className="LoginBtn">Login</button>
          <div className="register-link">
            <p>
              Don't have an account <Link to="/signup">SignUp </Link>
            </p>
          </div>
        </form>
        <ToastContainer style={{ top: "-100px" }} />
      </div>
    </div>
  );
}
