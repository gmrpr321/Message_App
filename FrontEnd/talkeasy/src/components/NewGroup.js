import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "../styles/NewGroup.module.css";
import axios from "axios";
const base_url = "http://127.0.0.1:8000/user/createNewGroup/";
function NewGroup() {
  const [groupName, setgroupName] = useState("");
  const [selectedPeople, setSelectedPeople] = useState([]);
  const totalPeople = useSelector((state) => state.auth.userData.peopleList);
  console.log(totalPeople);
  const peopleLst = [];
  for (let i = 0; i < totalPeople.length; i++) {
    peopleLst.push({ person: totalPeople[i], id: i });
  }
  function groupNameChangeHandler(event) {
    setgroupName(event.target.value);
  }
  function setSelectedPeopleHandler(id) {
    let i = 0;
    for (i = 0; i < selectedPeople.length; i++) {
      if (id == selectedPeople[i].id) {
        break;
      }
    }
    console.log(selectedPeople);
    if (i == selectedPeople.length) {
      setSelectedPeople((state) => {
        return [...state, peopleLst[id]];
      });
    }
  }
  function createGroupManager() {
    axios
      .post(base_url, { groupName, selectedPeople })
      .then(() => {
        console.log("New group Created");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.headingBox}>
          <p>Create New Group</p>
        </div>
        <div className={classes.contentBox}>
          <input
            type="text"
            value={groupName}
            onChange={groupNameChangeHandler}
            placeholder="Enter New Group Name"
          />
          <div className={classes.enclosePeople}>
            <div className={classes.people}>
              <div className={classes.collectionHeader}>
                <p>Available Users</p>
              </div>
              <div className={classes.dispPeople}>
                {peopleLst.map((element) => {
                  return (
                    <div
                      onClick={setSelectedPeopleHandler.bind(null, element.id)}
                      key={element.id}
                    >
                      {element.person}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={classes.people}>
              <div className={classes.collectionHeader}>
                <p>Selected Users</p>
              </div>
              <div className={classes.dispPeople}>
                {selectedPeople.map((element) => {
                  return <div key={element.id}>{element.person}</div>;
                })}
              </div>
            </div>
          </div>
          <button onClick={createGroupManager}>Create New Group</button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
export default NewGroup;
