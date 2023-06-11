function GroupDash() {
  //demo data for messages from group
  const groupData = [
    { id: 1, username: "person1", message: "asdfasdfsf", reaction: false },
    { id: 2, username: "person2", message: "aasasdfasdf", reaction: false },
    { id: 3, username: "person3", message: "basdfCf", reaction: false },
    { id: 4, username: "person4", message: "asdfcvawsDsf", reaction: false },
  ];
  function likeThisMessage(id) {
    for (let i = 0; i < groupData.length; i++) {
      if (groupData[i].id == id) console.log(groupData[i].message);
    }
  }
  return (
    <>
      <div>
        <div>
          {groupData.map((element) => {
            return (
              <div className={classes.messageDiv} key={element.id}>
                <div className={classes.messageUsername}>
                  <p>{element.username}</p>
                </div>
                <div className={classes.messagecontent}>
                  <p>{element.message}</p>
                </div>
                <div className={classes.messagereaction}>
                  <a onClick={likeThisMessage.bind(none, element.id)}></a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default GroupDash;
