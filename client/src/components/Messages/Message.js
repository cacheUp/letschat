import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

export const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar}></Comment.Avatar>
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.user.name}</Comment.Author>
      <Comment.Text> {message.content}</Comment.Text>
      <Comment.Metadata>{timeFromNow(message.timestamp)} </Comment.Metadata>
    </Comment.Content>
  </Comment>
);
