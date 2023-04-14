import React from "react";
import "./TopBar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

const TopBar = () => {
  return (
    <div className="topBar">
      <div className="topBarWrapper">
        <div className="topLeft">
          <span className="logo">MY-SHOP</span>
        </div>
        <div className="topRight">
          <div className="topBarIconContainer">
            <NotificationsNone />
            <span className="iconBadge">2</span>
          </div>
          <div className="topBarIconContainer">
            <Language />
          </div>
          <div className="topBarIconContainer">
            <Settings />
          </div>
          <img
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
