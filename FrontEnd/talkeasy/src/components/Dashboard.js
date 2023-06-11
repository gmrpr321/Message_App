import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import classes from "../styles/Dashboard.module.css";
import GroupsTab from "./GroupsTab";
import { showgrpTab } from "../store";
function Dashboard() {
  const dispatch = useDispatch();
  const istabvisible = useSelector((state) => state.showgrpTab.show);
  const currentPage = useSelector((state) => state.pageno.pageno);
  return (
    <div className={classes.container}>
      <Sidebar />
      {currentPage === 1 && istabvisible && <GroupsTab />}
    </div>
  );
}
export default Dashboard;
