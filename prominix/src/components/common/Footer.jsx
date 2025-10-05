import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>Prominix Limited</h3>
                <p>Address<br /><br />
                  <strong>Phone:</strong> +91 8077210847<br />
                  <strong>Email:</strong> contactprominix@gmail.com<br />
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <Link to="/">Home</Link></li>
                <li><i className="bx bx-chevron-right"></i> <Link to="/aboutus">About Us</Link></li>
              </ul>
            </div>
            <div className="col-lg-6 col-md-6">
              <p>Prominix Limited is a dynamic startup IT company...</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>Prominix Limited</span></strong>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;