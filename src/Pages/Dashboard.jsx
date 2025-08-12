import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-main">
      <h1 className="main-title">Unlock your inner beast</h1>
      <Link to={'/workouts'}><button className="cta-button">Start Tracking</button> </Link>
      <p className="quote">"The pain you feel today will be the strength you feel tomorrow."</p>
    </div>
  );
};

export default Dashboard;
