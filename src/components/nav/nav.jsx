import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <div className="topnav">
        <Link to="/home">
          <i class="fa-solid fa-gauge"></i> Dashboard
        </Link>
        <Link to="/manage">
          <i class="fa-solid fa-layer-group"></i> Manage
        </Link>
        {/* <Link to="/">
          <i class="fa-sharp fa-solid fa-list-check"></i>Track
        </Link>
        <Link to="/">
          <i class="fa-solid fa-tag"></i>Report
        </Link>
        <Link to="/">
          <i class="fa-solid fa-users"></i>Users
        </Link> */}
      </div>

      {/* <input type="checkbox" id="check" />
      <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
      </label>
      <div className="menu">
        <h2>ADMIN</h2>
        <ul>
          <li>
            <a href="#">
              <i class="fa-solid fa-gauge"></i>Dashboard
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-layer-group"></i>Projects
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-sharp fa-solid fa-list-check"></i>Tasks
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-tag"></i>Report
            </a>
          </li>
          <li>
            <a href="#">
              <i class="fa-solid fa-users"></i>Users
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default Navbar;
