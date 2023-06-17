import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import AdminPage from "./components/AdminPage";
import { useDispatch } from "react-redux";
import { authActions } from "./store";
import { useEffect } from "react";
import axios from "axios";
const recieve_url = "http://127.0.0.1:8000/user/retriveUserData/";
const send_url = "http://127.0.0.1:8000/user/storeUserData/";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isauth);
  const isAdmin = useSelector((state) => state.auth.userData.isAdmin);
  const reduxData = useSelector((state) => state.auth.userData);
  console.log(isAdmin);
  const dispatch = useDispatch();
  let data;
  // given an username, retrive the userData
  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .post(recieve_url, { username: username })
        .then((response) => {
          const data = response.data;
          dispatch(authActions.loggedIn(data));
          console.log("Request successful");
        })
        .catch((error) => {
          console.log(error);
        });
    }, 5000);

    return () => clearTimeout(timer);
  }, [reduxData]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     axios
  //       .post(send_url, { userData: reduxData })
  //       .then((response) => {
  //         console.log("Data sent to server successful");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [reduxData]);
  const username = useSelector((state) => state.auth.userData.username);
  console.log(username);
  return (
    <Fragment>
      {!isLoggedIn && <LoginPage />}
      {isLoggedIn && isAdmin && <AdminPage />}
      {isLoggedIn && !isAdmin && <Dashboard />}
    </Fragment>
  );
}

export default App;
