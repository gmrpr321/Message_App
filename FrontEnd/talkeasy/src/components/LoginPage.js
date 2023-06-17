import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useState } from "react";
import classes from "../styles/LoginPage.module.css";
import axios from "axios";
const base_url = "http://127.0.0.1:8000/user/login/";
// const userData = {
//   username: "demoUser",
//   isAdmin: false,
//   groupList: ["Maths", "Science", "English"],
//   peopleList: ["userOne", "secondUser", "thirdUser"],
//   groupData: [
//     {
//       groupName: "Maths",
//       members: ["userOne", "secondUser", "thirdUser"],
//       messages: [
//         {
//           user: "userOne",
//           messageContent: "this is funny",
//           messageReaction: false,
//         },
//         {
//           user: "userTwo",
//           messageContent: "this is not funny",
//           messageReaction: true,
//         },
//         {
//           user: "userTwo",
//           messageContent: "this is almost funny",
//           messageReaction: true,
//         },
//       ],
//     },
//     {
//       groupName: "Science",
//       members: ["three", "Four", "five"],
//       messages: [
//         {
//           user: "three",
//           messageContent: "this is very funny",
//           messageReaction: false,
//         },
//         {
//           user: "Four",
//           messageContent: "this is not funny",
//           messageReaction: false,
//         },
//         {
//           user: "five",
//           messageContent: "this is almost funny funny",
//           messageReaction: true,
//         },
//       ],
//     },
//     {
//       groupName: "English",
//       members: ["Six", "Seven", "Eight"],
//       messages: [
//         {
//           user: "six",
//           messageContent: "this is very funny",
//           messageReaction: false,
//         },
//         {
//           user: "seven",
//           messageContent: "this is not funny",
//           messageReaction: true,
//         },
//         {
//           user: "eight",
//           messageContent: "this is almost funny funny",
//           messageReaction: true,
//         },
//       ],
//     },
//   ],
// };
function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const userNameChangeHandler = (event) => setUserName(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    const dataToServer = { username, password };
    let data;
    axios
      .post(base_url, dataToServer)
      .then((response) => {
        data = response.data["data"];
        console.log(data);
        dispatch(authActions.setUserInit(data));
      })
      .catch((error) => {
        console.log(error);
      });
    //send API request
    // axios
    //   .put("http://127.0.0.1:8000/student/student/21CSdqgse", data)
    //   .then((response) => {
    //     console.log("Data successfully sent!", response);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending data", error);
    //   });
    //
    console.log(data);
  };
  return (
    <main className={classes.container}>
      <div className={classes.msg}>
        <h1>Talk Easy</h1>
      </div>
      <section>
        <form onSubmit={submitHandler} className={classes.form}>
          <div>
            <label htmlFor="username" className={classes.username}>
              Username
            </label>
            <input
              type="text"
              id="username"
              className={classes.input}
              onChange={userNameChangeHandler}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password" className={classes.password}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={classes.input}
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>
          <button className={classes.submit}>Login</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
