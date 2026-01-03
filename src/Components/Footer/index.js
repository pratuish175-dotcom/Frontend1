import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer className="footer-section mt-5">
      <div className="container">

        {/* Footer Top */}
        <div className="row footer-top">

          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Contact Us</h4>
            <p className="footer-text">📞 +919059324396</p>
            <p className="footer-text">✉yakshigroup@gmail.com.com</p>
            <p className="footer-text">📍 Andra Pradesh, India</p>

            <div className="footer-social-icons mt-3">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><Link to="#">Leggings</Link></li>
              <li><Link to="#">Jeggings</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Customer Service</h4>
            <ul className="footer-links">
              <li><Link to="#">Track Order</Link></li>
              <li><Link to="#">Returns</Link></li>
              <li><Link to="#">Shipping Policy</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Contact Support</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4 className="footer-title">Newsletter</h4>
            <p className="footer-text">Subscribe to get special offers & updates.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom mt-4">
          <p>© 2024 Fashion Store. All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
