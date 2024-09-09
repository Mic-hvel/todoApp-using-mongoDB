import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>Sorry the page you are looking for was not found</h1>
      <Link to="/home" className="link-button">
        Return to home
      </Link>
    </div>
  );
};

export default NotFound;
