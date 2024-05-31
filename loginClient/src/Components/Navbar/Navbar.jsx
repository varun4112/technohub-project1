import React from "react";
import "./navbar.css";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router";

function Nav({ profilePic, userName }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    googleLogout();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div id="navBar">
      <div id="BrandName">D'Watch</div>
      <div>
        <ul id="navList">
          <li id="listItem">Products</li>
          <li id="listItem1">About</li>
          <li id="listItem1">Contact</li>
          <li id="listItem1">
            <i
              class="fa-solid fa-cart-shopping"
              style={{ color: " #7cd50a;" }}
            ></i>
          </li>
          <li id="dropdownButton">
            <div class="dropdown" data-bs-toggle="dropdown">
              <img id="userAvtar" src={profilePic} alt="" /> {userName}
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
