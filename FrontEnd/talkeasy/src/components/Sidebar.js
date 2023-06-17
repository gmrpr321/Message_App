import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LuUser } from "react-icons/lu";
import { BsChatDots } from "react-icons/bs";
import { BiPlusCircle } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import classes from "../styles/Sidebar.module.css";
import { pageActions } from "../store";
import { authActions } from "../store";
import { showgrpTab } from "../store";
import axios from "axios";
const base_url = "http://127.0.0.1:8000/user/logout/";
function Sidebar() {
  const dispatch = useDispatch();
  function groupsPage() {
    dispatch(pageActions.setPage(1));
    dispatch(showgrpTab.showTab());
  }
  function newgroupPage() {
    dispatch(pageActions.setPage(2));
  }
  function logoutpage() {
    axios
      .get(base_url)
      .then(() => console.log("User Logged Out"))
      .catch((error) => console.log(error));
    dispatch(authActions.loggedOut(3));
  }
  return (
    <div>
      <div className={classes.Sidebarcontainer}>
        <div className={classes.sidebar}>
          <Button onClick={groupsPage} variant="outline-secondary">
            <BsChatDots />
          </Button>
          <Button onClick={newgroupPage} variant="outline-secondary">
            <BiPlusCircle />
          </Button>
          <Button onClick={logoutpage} variant="outline-secondary">
            <BiLogOut />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
