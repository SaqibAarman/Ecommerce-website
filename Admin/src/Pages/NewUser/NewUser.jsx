import React from "react";
import "./NewUser.css";

const NewUser = () => {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserFormItem">
          <label>User Name</label>
          <input type="text" placeholder="john" />
        </div>
        <div className="newUserFormItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div>
        <div className="newUserFormItem">
          <label>Email</label>
          <input type="email" placeholder="john@mail.com" />
        </div>

        <div className="newUserFormItem">
          <label>Password</label>
          <input type="password" placeholder="Password" />
        </div>
        <div className="newUserFormItem">
          <label>Phone Number</label>
          <input type="text" placeholder="+91 5768568681" />
        </div>
        <div className="newUserFormItem">
          <label>Address</label>
          <input type="text" placeholder="Mysore | IND" />
        </div>
        <div className="newUserFormItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="others" value="others" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserFormItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
};

export default NewUser;
