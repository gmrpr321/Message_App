import classes from "../styles/GroupsTab.module.css";
import { showgrpTab } from "../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GroupDash from "./GroupDash";
import { pageActions } from "../store";
function GroupsTab() {
  //groups info comes from redux
  // const demoGrp = [
  //   { id: 1, grpName: "Maths" },
  //   { id: 2, grpName: "Science" },
  //   { id: 3, grpName: "Physics" },
  //   { id: 4, grpName: "Social" },
  // ];
  const groupList = useSelector((state) => state.auth.userData.groupList);
  const netData = useSelector((state) => state.auth.userData);
  const groupData = [];
  for (let i = 0; i < groupList.length; i++) {
    groupData.push({ id: i, grpName: groupList[i] });
  }
  const currentPage = useSelector((state) => state.pageno.pageno);
  const isTabShown = useSelector((state) => state.showgrpTab.show);
  const dispatch = useDispatch();
  function handleGrp(id) {
    //go to that specific group id page

    dispatch(showgrpTab.hideTab());
    dispatch(pageActions.setGroup(id));
  }
  let applyStyle = null;
  if (currentPage == 2) {
    applyStyle = classes.fullHide;
  } else if (!isTabShown) {
    applyStyle = classes.hide;
  } else {
    applyStyle = classes.show;
  }
  return (
    <div className={applyStyle}>
      <div className={classes.verticalMenu}>
        <div className={classes.heading}>
          <h4>Groups</h4>
        </div>
        {groupData.map((element) => {
          return (
            <div key={element.id} onClick={handleGrp.bind(null, element.id)}>
              {element.grpName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default GroupsTab;
