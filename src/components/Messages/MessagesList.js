import React from "react";
import Message from "./Message";

const MessagesList = (props) => {
  const {
    userData: { data },
  } = props;

  return (
    <div>
      {data
        ? data.messages.map((message) => {
            return <Message key={message._id} message={message} />;
          })
        : null}
    </div>
  );
};

export default MessagesList;
