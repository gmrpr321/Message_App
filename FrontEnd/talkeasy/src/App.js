import { Fragment } from "react";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isauth);
  return (
    <Fragment>
      {!isLoggedIn && <LoginPage />}
      {isLoggedIn && <Dashboard />}
    </Fragment>
  );
}

export default App;
