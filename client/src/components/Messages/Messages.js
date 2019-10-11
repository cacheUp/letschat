import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import { connect } from "react-redux";
import { Message } from "./Message";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messagesRef: firebase.database().ref("messages"),
      user: this.props.currentUser,
      messages: [],
      messagesLoading: true,
      progressBar: false
    };
  }

  componentDidMount() {
    const { channel, user } = this.props;
    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
    });
  };

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  isProgressBarVisable = percent => {
    if (percent > 0) {
      this.setState({ progressBar: true });
    }
  };

  render() {
    const { messagesRef, messages, user, progressBar } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader />
        <Segment>
          <Comment.Group
            className={progressBar ? "messages__progress" : "messages"}
          >
            {this.displayMessages(messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          isProgressBarVisable={this.isProgressBarVisable}
          messagesRef={messagesRef}
          currentChannel={this.props.currentChannel}
          currentUser={user}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channel.currentChannel,
    user: state.user.currentUser
  };
};

export default connect(mapStateToProps)(Messages);
