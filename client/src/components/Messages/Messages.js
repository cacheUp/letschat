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
      progressBar: false,
      numUniqueUsers: "",
      searchTerm: "",
      searchLoading: false
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
      this.countUniqueUsers(loadedMessages);
    });
  };

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    });
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers });
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

  displayChannelName = channel => (channel ? `${channel.name}` : "");

  render() {
    const {
      messagesRef,
      messages,
      user,
      progressBar,
      numUniqueUsers
    } = this.state;

    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(this.props.channel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
        />
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
