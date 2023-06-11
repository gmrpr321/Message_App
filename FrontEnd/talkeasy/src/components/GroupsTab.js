import classes from "../styles/GroupsTab.module.css";
import { showgrpTab } from "../store";
import { useDispatch } from "react-redux";
function GroupsTab() {
  //groups info comes from redux
  const demoGrp = [
    { id: 1, grpName: "Maths" },
    { id: 2, grpName: "Science" },
    { id: 3, grpName: "Physics" },
    { id: 4, grpName: "Social" },
  ];
  const dispatch = useDispatch();
  function handleGrp(id) {
    // for(int i = 0;i<)
    // dispatch(showgrpTab.hideTab());
  }
  return (
    <div>
      <div className={classes.verticalMenu}>
        <div className={classes.heading}>
          <h4>Groups</h4>
        </div>
        {demoGrp.map((element) => {
          return (
            <div key={element.id}>
              <a onClick={handleGrp.bind(element.id)}>{element.grpName}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default GroupsTab;
