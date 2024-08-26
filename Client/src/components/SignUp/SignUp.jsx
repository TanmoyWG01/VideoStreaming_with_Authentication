import { useEffect, useState } from "react";
import Video from "../../assets/video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../Utils/Utils";

//ReactIcons

import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

//Imported Animation

import Aos from "aos";
import "aos/dist/aos.css";

export default function SignUp() {
  const [info, SetInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token){
      navigate("/")
    } 
  },[navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyInfo = { ...info };
    copyInfo[name] = value;
    SetInfo(copyInfo);
  };

  // console.log('info ->', info);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = info;
    if (!name || !email || !password) {
      return handleError("Write all the field!");
    }

    try {
      const url = "/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const result = await response.json();

      const { success, error } = result;

      if (success) {
        handleSuccess("SignUp Successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError("Error! check everything again.");
      }

      // console.log(result);


    } catch (err) {
      handleError(err);
    }
  };

  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="LoginWrapper" >
        <video src={Video} autoPlay loop muted />
        <div className="wrapper" data-aos="fade-down" >
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div className="input-box" data-aos="fade-down">
              <input
                name="name" 
                type="text"
                placeholder="Username"
                id="username"
                className="lInput"
                autoFocus
                autoComplete="off"
                onChange={handleChange}
                value={info.name}
              />
            </div>
            <div className="input-box" data-aos="fade-up">
              <input
                name="email"
                type="email"
                placeholder="Email"
                id="email"
                className="lInput"
                autoComplete="off"
                onChange={handleChange}
                value={info.email}
              />
            </div>

            <div className="input-box" data-aos="fade-down">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="lInput"
                onChange={handleChange}
                value={info.password}
              />

              {showPassword ? (
                <BsEye className="eyeIcon" onClick={handleShow} />
              ) : (
                <BsEyeSlash className="eyeIcon" onClick={handleShow} />
              )}
            </div>

            <button className="LoginBtn" data-aos="fade-down">Sign Up</button>
            <div className="register-link">
              <p>
                Already have an account <Link to="/">Login </Link>
              </p>
            </div>
          </form>
          <ToastContainer style={{ top: "-90px" }} />
        </div>
      </div>
    </div>
  );
}
