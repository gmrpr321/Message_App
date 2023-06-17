import { useSelector } from "react-redux";
import { pageActions } from "../store";
import classes from "../styles/GroupDash.module.css";
import GroupMsg from "./GroupMsg";
import { useState } from "react";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const base_url = "http://127.0.0.1:8000/user/addMessage/";
function GroupDash() {
  const currentGroup = useSelector((state) => state.pageno.grpNo);
  const groupData = useSelector((state) => state.auth.userData.groupData);
  const isgGrpVisible = useSelector((state) => state.showgrpTab.show);
  const currentPage = useSelector((state) => state.pageno.pageno);
  const currentUser = useSelector((state) => state.auth.userData.username);
  const [buttonState, setButtonState] = useState(0);
  const dashClass = !isgGrpVisible
    ? classes.container
    : classes.responseContainer;
  let thisGroup = groupData[currentGroup];
  const { groupName, members, messages } = thisGroup;
  const newmsgs = [...messages];

  function setButtonstatehandler() {
    setButtonState((state) => state + 1);
  }

  console.log(groupData[currentGroup].messages);
  useEffect(() => {}, [currentGroup, groupData, isgGrpVisible]);
  const dispatch = useDispatch();
  const [newmsg, setnewmsg] = useState("");
  function newmsgChangeHandler(event) {
    setnewmsg(event.target.value);
    console.log(newmsg);
  }
  function onFormSubmit(event) {
    event.preventDefault();
    if (newmsg.trim() != "") {
      axios.post(base_url, { groupName, newmsg, currentUser }).then(() => {
        console.log(newmsg);
        dispatch(authActions.addNewMessage({ currentGroup, newmsg }));
        setnewmsg("");
      });
    }
  }

  console.log(newmsgs);
  console.log(messages);
  return (
    <div className={currentPage == 2 ? classes.hide : dashClass}>
      <div className={classes.header}>
        <h2>{groupName}</h2>
      </div>
      <div className={classes.body}>
        <GroupMsg data={currentGroup} />
      </div>
      <div className={classes.newMessage}>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            value={newmsg}
            onChange={newmsgChangeHandler}
            placeholder={"Enter Message"}
          />
          <button type={"submit"} onClick={setButtonstatehandler}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
export default GroupDash;
