import React from 'react';
import Button from '@mui/material/Button';
import { FaFacebook, FaSquareInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div className="container-fluid bg-dark text-light py-5 mt-5">
      <div className="row">
        
        <div className="col-md-2 mb-3">
          <h1 id="name"><span>Flex</span> Up</h1>
          <p>Pain is just a weakness leaving your body.</p>
          <p>Track your workouts, fuel your body, and push your limits—FlexUp helps you grow stronger every day.</p>
        </div>
        
        <div className="col-md-2 mb-3">
          <h4 className="quick">Quick Links</h4>
          <ul className="list-unstyled">
            <li>Log Workout</li>
            <li>Workout History</li>
            <li>Exercise Library</li>
          </ul>
        </div>

        <div className="col-md-2 mb-3">
          <h4 className="quick">Nutrition</h4>
          <ul className="list-unstyled">
            <li>Meal Tracker</li>
            <li>Daily Summary</li>
            <li>Nutrition Tips</li>
          </ul>
        </div>

        <div className="col-md-2 mb-3">
          <h4 className="quick">Progress</h4>
          <ul className="list-unstyled">
            <li>Weight Logs</li>
            <li>Charts and Graphs</li>
            <li>Transformation Journey</li>
          </ul>
        </div>

        <div className="col-md-4 mb-3">
          <h4 className="quick">Account</h4>
          <ul className="list-unstyled">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>

          <div className="d-flex gap-3 fs-5 mt-3">
            <FaFacebook className="social-icon" />
            <FaSquareInstagram className="social-icon" />
            <FaLinkedin className="social-icon" />
            <FaXTwitter className="social-icon" />
          </div>

          <div className="mt-4">
            <input type="email" placeholder="Join our newsletter" className="form-control mb-2" />
            <Button variant="contained" color="success" className='subscribe'>Subscribe</Button>
          </div>

          <p className="mt-3 text-muted fst-italic">“No excuses. Just progress.”</p>
        </div>

      </div>
    </div>
  );
}

export default Footer;
