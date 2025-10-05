import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import logo from '../../assets/img/logo.png';
import defaultProfilePic from '../../assets/img/profile-sample.jpg';

function Header({ currentUser, onLogout }) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 100;

  const [profilePic, setProfilePic] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (currentUser && currentUser.role === 'Employee') {
      setProfilePic(defaultProfilePic);
    } else {
      setProfilePic(null);
    }
  }, [currentUser]);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
    setDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  const renderLoginUI = () => {
    if (!currentUser) {
      // User is logged out
      return <li><Link className="nav-link" to="/login">Login</Link></li>;
    }

    if (currentUser.role === 'Employee') {
      // User is an Employee
      return (
        <li className="login-dropdown" ref={dropdownRef}>
          <img 
            src={profilePic} 
            alt="Profile" 
            className="profile-picture" 
            onClick={() => setDropdownOpen(!isDropdownOpen)} 
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/dashboard">Dashboard</Link>
              <a href="#" onClick={handleLogoutClick}>Logout</a>
            </div>
          )}
        </li>
      );
    }

    if (currentUser.role === 'Client') {
      // UPDATED: Show profile picture for clients
      return (
         <li className="login-dropdown" ref={dropdownRef}>
            <img 
              src={currentUser.profileImageUrl || defaultProfilePic} 
              alt="Client Profile" 
              className="profile-picture" 
              onClick={() => setDropdownOpen(!isDropdownOpen)} 
            />
             {isDropdownOpen && (
                <div className="dropdown-menu">
                    <a href="#" onClick={handleLogoutClick}>Logout</a>
                </div>
            )}
        </li>
      );
    }
  };

  return (
    <header id="header" className={`fixed-top d-flex align-items-center ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/" className="logo me-3 d-flex align-items-center">
              <img src={logo} alt="Prominix Limited" className="img-fluid" />
            </Link>
            <h1 className="company-name m-0" style={{ fontSize: '34px' }}>
              <Link to="/" className="text-white text-decoration-none">Prominix Limited</Link>
            </h1>
          </div>
          <nav id="navbar" className={`navbar order-last order-lg-0 ${isMobileNavOpen ? 'navbar-mobile' : ''}`}>
            <ul>
              <li><Link className="nav-link" to="/">Home</Link></li>
              <li><Link className="nav-link" to="/howitworks">How It Works</Link></li>
              <li><Link className="nav-link" to="/aboutus">About Us</Link></li>
              <li><Link className="nav-link" to="/faqs">FAQ's</Link></li>
              {renderLoginUI()}
            </ul>
            <i className={`bi bi-list mobile-nav-toggle`} onClick={() => setMobileNavOpen(!isMobileNavOpen)}></i>
          </nav>
        </div>
      </header>
  );
}

export default Header;