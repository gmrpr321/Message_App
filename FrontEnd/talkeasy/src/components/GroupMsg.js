import { useState } from "react";
import classes from "../styles/Message.module.css";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import axios from "axios";
const base_url = "http://127.0.0.1:8000/user/toggleLike/";

function GroupMsg(props) {
  const mesg = useSelector((state) => state.auth.userData);
  console.log(mesg);
  const messages = mesg.groupData[props.data].messages;
  const displayData = messages.map((message, index) => ({
    ...message,
    id: index,
  }));
  const dispatch = useDispatch();
  function handleLike(id) {
    axios
      .post(base_url, {
        groupName: mesg.groupData[props.data].groupName,
        messageContent: displayData[id].messageContent,
      })
      .then(() => {
        dispatch(
          authActions.toggleLike({ currentGrp: props.data, messageId: id })
        );
      });

    // setdisplayData((state) => {
    //   const newState = state.map((message) => {
    //     if (message.id === id) {
    //       return { ...message, messageReaction: !message.messageReaction };
    //     }
    //     return message;
    //   });
    //   return newState;
    // });
  }

  return (
    <div>
      {displayData.map((element) => (
        <div
          className={classes.message}
          onClick={() => handleLike(element.id)}
          key={element.id}
        >
          <div className={classes.user}>
            <p>{element.user}</p>
          </div>
          <div className={classes.messageContent}>
            <p> {element.messageContent}</p>
          </div>
          <div
            className={
              element.messageReaction
                ? classes.messageReaction
                : classes.noReaction
            }
          >
            {element.messageReaction ? (
              <p>
                <BsFillHandThumbsUpFill />
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupMsg;
