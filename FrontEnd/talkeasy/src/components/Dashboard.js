import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import classes from "../styles/Dashboard.module.css";
import GroupsTab from "./GroupsTab";
import GroupDash from "./GroupDash";
import NewGroup from "./NewGroup";
import { useEffect } from "react";

function Dashboard() {
  const dispatch = useDispatch();
  const istabvisible = useSelector((state) => state.showgrpTab.show);
  const currentPage = useSelector((state) => state.pageno.pageno);

  return (
    <div className={classes.container}>
      <Sidebar />
      {<GroupsTab />}
      {currentPage === 2 && <NewGroup />}
      <GroupDash />
    </div>
  );
}
export default Dashboard;
