import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaUser, FaLock, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const SignIn = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  // Hide header/footer on sign in page
  useEffect(() => {
    context.setisHeaderFooterShow(false);
    return () => context.setisHeaderFooterShow(true);
  }, [context]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) validationErrors.email = "Email is required";
    if (!password) validationErrors.password = "Password is required";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await fetch(`${API_URL}/api/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TO LOCAL STORAGE
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", data.user.name);
      localStorage.setItem("userId", data.user._id);

      // ✅ UPDATE CONTEXT (IMPORTANT)
      context.setIsLogin(true);
      context.setUsername(data.user.name);
      context.setUserId(data.user._id);
      context.setCurrentUser({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      });

      toast.success("Login successful 🎉");

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <section className="signInPage">
      <div className="signInBox">
        <h2 className="text-center">Sign In</h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
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

          {/* PASSWORD */}
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

        {/* SOCIAL LOGIN UI */}
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
