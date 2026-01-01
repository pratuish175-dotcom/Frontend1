import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { FaUser, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { signup } from "../../utils/api"; // Your API function

const SignUp = () => {
  const context = useContext(MyContext);

  useEffect(() => {
    context.setisHeaderFooterShow(false);
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.phone) validationErrors.phone = "Phone number is required";
    if (!formData.password) validationErrors.password = "Password is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsSubmitting(true);
        const res = await signup(formData);

        if (res.success) {
          alert("Account created successfully!");
          navigate("/SignIn");
        } else {
          alert(res.message || "Sign up failed.");
        }
      } catch (err) {
        console.error(err);
        alert("Server error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="signUpPage">
      <div className="signUpBox">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <p className="error">{errors.name}</p>}

          <div className="inputGroup">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="inputGroup">
            <FaPhone className="icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          {errors.phone && <p className="error">{errors.phone}</p>}

          <div className="inputGroup">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="buttonGroup">
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "SIGN UP"}
            </Button>
            <Link to="/SignIn">
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </Link>
          </div>

          <p className="alreadyHaveAccount">
            Already have an account? <Link to="/SignIn">Sign In</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
