import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/images/logo.png';
import CountryDropdown from "../CountryDropdown";
import { FiUser } from 'react-icons/fi';
import { FaList } from 'react-icons/fa';
import { IoBagOutline } from 'react-icons/io5';
import SearchBox from './SearchBox';
import Navigation from './Navigation';
import { useContext, useState, useRef, useEffect } from 'react';
import { MyContext } from "../../App";

const Header = () => {
  const context = useContext(MyContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate(); // <-- Added navigate hook

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    context.setIsLogin(false);
    context.setUsername("");
    navigate('/signIn');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCartClick = () => {
    navigate('/cart'); // <-- Navigate to cart page when cart icon clicked
  };

  return (
    <div className="headerWrapper">
      <div className="top-strip bg-purple">
        <div className="container">
          <p className="mb-0 mt-0 text-center">
            Due to the <b>COVID 19</b> epidemic, orders may be processed with a slight delay
          </p>
        </div>
      </div>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="logoWrapper d-flex align-items-center col-sm-2">
              <Link to='/'><img src={Logo} alt='Logo' /></Link>
            </div>
            <div className="col-sm-10 d-flex align-items-center part2">
              {context.countryList.length !== 0 && <CountryDropdown />}
              <SearchBox />
              <div className='part3 d-flex align-items-center ml-auto'>

                {/* Login/Signup / User Dropdown */}
                {!context.isLogin ? (
                  <Link to="/signIn">
                    <Button 
                      className="btn-blue mr-3" 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <div className='user-dropdown-wrapper position-relative mr-3' ref={dropdownRef}>
                    <Button className='circle' onClick={() => setDropdownOpen(!dropdownOpen)}>
                      <FiUser />
                    </Button>
                    {dropdownOpen && (
                      <div
                        className="user-dropdown-card-glow position-absolute"
                        style={{
                          right: 0,
                          top: '110%',
                          backgroundColor: '#fff',
                          borderRadius: '14px',
                          padding: '1rem',
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                          width: '200px',
                          zIndex: 1000,
                          animation: 'fadeInDropdown 0.3s ease',
                          border: '2px solid transparent',
                          backgroundImage:
                            'linear-gradient(#fff, #fff), linear-gradient(135deg, #ff00cc, #3333ff, #00ffcc)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                        }}
                      >
                        <div className="text-center mb-2">
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              backgroundColor: '#f0f0f0',
                              margin: '0 auto 8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem',
                              fontWeight: 'bold',
                              color: '#4a4a4a',
                            }}
                          >
                            {context.username?.charAt(0).toUpperCase()}
                          </div>
                          <div style={{ fontWeight: '500', fontSize: '0.9rem' }}>{context.username}</div>
                        </div>
                        <hr style={{ margin: '0.5rem 0' }} />
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '10px' }}>
                          <li className="d-flex align-items-center gap-2 py-1 dropdown-item-hover" style={{ fontSize: '0.85rem' }}>
                            <FiUser size={16} />
                            <span>My Account</span>
                          </li>
                          <li className="d-flex align-items-center gap-2 py-1 dropdown-item-hover" style={{ fontSize: '0.85rem' }}>
                            <IoBagOutline size={16} />
                            <li
  className="d-flex align-items-center gap-2 py-1 dropdown-item-hover"
  style={{ fontSize: '0.85rem', cursor: "pointer" }}
  onClick={() => {
    setDropdownOpen(false);
    navigate("/orders");
  }}
>
  <span>My Orders</span>
</li>

                          </li>
                          <li className="d-flex align-items-center gap-2 py-1 dropdown-item-hover" style={{ fontSize: '0.85rem' }}>
                            <FaList size={16} />
                            <Link to="/wishlist" style={{ textDecoration: "none", color: "inherit" }}>
  <span className="ml-2">My Wishlist</span>
</Link>

                          </li>
                        </ul>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          size="small"
                          onClick={handleLogout}
                          style={{
                            borderRadius: '10px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            padding: '4px 8px',
                          }}
                        >
                          Logout
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                

                {/* Cart Button */}
                <div className='ml-auto cartTab d-flex align-items-center'>
  <span className='price'>Rs {context.cartTotal.toFixed(2)}</span>
  <div className='position-relative ml-2'>
    <Button className='circle' onClick={handleCartClick}>
      <IoBagOutline />
      {context.cartData?.length > 0 && (  // <--- Notice the ?. safe access
        <span 
          className='count d-flex align-items-center justify-content-center'
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px'
          }}
        >
          {context.cartData?.length || 0}
        </span>
      )}
    </Button>
  </div>
</div>


              </div>
            </div>
          </div>
        </div>
      </header>
      <Navigation />
    </div>
  );
};

export default Header;
