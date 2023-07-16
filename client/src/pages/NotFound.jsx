import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  document.title = "404";
  const location = useLocation();
  return (
    <center style={{ color: "#000" }}>
      <h2>
        {location.pathname} Page is Not Available.&nbsp;
        <Link to="/">
          <span style={{ color: "#000" }}>Go Home</span>
        </Link>
      </h2>
    </center>
  );
};

export default NotFound;
