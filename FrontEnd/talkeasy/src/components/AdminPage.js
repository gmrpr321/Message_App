import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import classes from "../styles/AdminPage.module.css";
import { AiFillDelete } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
const create_url = "http://127.0.0.1:8000/user/createUser/";
const remove_url = "http://127.0.0.1:8000/user/removeUser/";
const logout_url = "http://127.0.0.1:8000/user/logout/";
const AdminPage = () => {
  // State for the new user input
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const userList = useSelector((state) => state.auth.userData.peopleList);
  let dispList = [];
  const dispatch = useDispatch();
  for (let i = 0; i < userList.length; i++) {
    dispList.push({ id: i, user: userList[i] });
  }
  function handleNewUsername(event) {
    setNewUsername(event.target.value);
  }
  function handleNewPassword(event) {
    setNewPassword(event.target.value);
  }
  function removeUser(id) {
    const username = userList[id];
    axios.post(remove_url, { username }).then((response) => {
      console.log(response);
      dispatch(authActions.removeUser(username));
    });
  }
  function logoutpage() {
    axios
      .get(logout_url)
      .then(() => {
        console.log("Admin Logged Out");
        dispatch(authActions.loggedOut(3));
      })
      .catch((error) => console.log(error));
  }

  function handleNewuser() {
    if (newUsername.trim() !== "" && newPassword.trim() !== "") {
      const serverData = { username: newUsername, password: newPassword };
      axios
        .post(create_url, serverData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setNewPassword("");
      setNewUsername("");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.headingBox}>
          <button
            onClick={logoutpage}
            variant="outline-secondary"
            className={classes.logoutButton}
          >
            <BiLogOut />
          </button>
          <div className={classes.heading}>
            <h1>AdminPage</h1>
          </div>
        </div>
        <div className={classes.newMemberBox}>
          <h3>Add User</h3>
          <input
            type="text"
            value={newUsername}
            placeholder="Enter Username"
            onChange={handleNewUsername}
          />
          <input
            type="text"
            value={newPassword}
            placeholder="Enter Password"
            onChange={handleNewPassword}
          />
          <button onClick={handleNewuser}>Create User</button>
        </div>
        <div className={classes.removeUserBox}>
          <div className={classes.removeUserHead}>Remove User</div>
          <div className={classes.removeUserList}>
            {dispList.map((element) => {
              return (
                <div className={classes.userTile} key={element.id}>
                  <div>{element.user}</div>
                  <div
                    onClick={removeUser.bind(null, element.id)}
                    className={classes.removeButton}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
