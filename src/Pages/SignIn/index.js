import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaUser, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SignIn = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    context.setisHeaderFooterShow(false);
    // cleanup: show header/footer again on unmount
    return () => context.setisHeaderFooterShow(true);
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
  
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8080/api/user/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          return alert(data.message || "Login failed");
        }
  
        // ✅ Save all needed data
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userId", data.user.id); // ✅ Important
  
        context.setIsLogin(true);
        context.setUsername(data.user.name);
        context.setisHeaderFooterShow(true);
  
        navigate("/");
      } catch (err) {
        console.error("Login error:", err);
      }
    }
  };
  return (
    <section className="signInPage">
      <div className="signInBox">
        <h2 className="text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <FaUser className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="inputGroup">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <p className="forgotPassword">Forgot password?</p>

          <div className="buttonContainer">
            <Button type="submit" variant="contained" color="primary">
              SIGN IN
            </Button>
            <Link to="/">
              <Button variant="outlined">Cancel</Button>
            </Link>
          </div>

          <p>
            Not Registered? <Link to="/signUp">Sign Up</Link>
          </p>
        </form>

        <p className="socialText">Or Continue with</p>
        <div className="socialIcons">
          <button className="googleLogin">
            <FcGoogle className="socialIcon" /> Google
          </button>
          <button className="facebookLogin">
            <FaFacebook className="socialIcon facebook" /> Facebook
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
