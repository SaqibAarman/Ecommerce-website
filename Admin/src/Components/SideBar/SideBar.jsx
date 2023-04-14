import React from "react";
import "./SideBar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sideBar">
      <div className="sideBarWrapper">
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">DashBoard</h3>
          <ul className="sideBarList">
            <Link to="/" className="link">
              <li className="sideBarListItem active">
                <LineStyle className="sideBarIcons" />
                Home
              </li>
            </Link>
            <li className="sideBarListItem">
              <Timeline className="sideBarIcons" />
              Analytics
            </li>
            <li className="sideBarListItem">
              <TrendingUp className="sideBarIcons" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Quick Menu</h3>
          <ul className="sideBarList">
            <Link to="/users" className="link">
              <li className="sideBarListItem">
                <PermIdentity className="sideBarIcons" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sideBarListItem">
                <Storefront className="sideBarIcons" />
                Products
              </li>
            </Link>
            <li className="sideBarListItem">
              <AttachMoney className="sideBarIcons" />
              Transactions
            </li>

            <li className="sideBarListItem">
              <BarChart className="sideBarIcons" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Notifications</h3>
          <ul className="sideBarList">
            <li className="sideBarListItem">
              <MailOutline className="sideBarIcons" />
              Mail
            </li>
            <li className="sideBarListItem">
              <DynamicFeed className="sideBarIcons" />
              Feedback
            </li>
            <li className="sideBarListItem">
              <ChatBubbleOutline className="sideBarIcons" />
              Message
            </li>
          </ul>
        </div>
        <div className="sideBarMenu">
          <h3 className="sideBarTitle">Staff</h3>
          <ul className="sideBarList">
            <li className="sideBarListItem ">
              <WorkOutline className="sideBarIcons" />
              Manage
            </li>
            <li className="sideBarListItem">
              <Timeline className="sideBarIcons" />
              Analytics
            </li>
            <li className="sideBarListItem">
              <Report className="sideBarIcons" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
