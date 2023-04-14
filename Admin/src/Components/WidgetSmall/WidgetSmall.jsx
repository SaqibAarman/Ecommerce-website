import React, { useState, useEffect } from "react";
import "./WidgetSmall.css";
import { Visibility } from "@material-ui/icons";
import { userRequest } from "../../requestMethod";

const WidgetSmall = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="widgetSmall">
      <span className="widgetSmallTitle">New Join Members</span>
      <ul className="widgetSmallList">
        {users.map((user) => (
          <li className="widgetSmallListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmallImg"
            />
            <div className="widgetSmallUser">
              <span className="widgetSmallUserName">{user.username}</span>
            </div>
            <button className="widgetSmallButton">
              <Visibility className="widgetSmallIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSmall;
