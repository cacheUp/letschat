import React, { Component } from "react";
import { Header, Input, Icon, Segment } from "semantic-ui-react";

class MessagesHeader extends Component {
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading
    } = this.props;
    return (
      <Segment clearing>
        {/* Channel Title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottem: 0 }}>
          <span>
            {channelName}
            <Icon name={"star outline"} color="black" />
          </span>
          <Header.Subheader>{numUniqueUsers}</Header.Subheader>
        </Header>
        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="Search Messages"
            value={this.props.searchTerm}
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;
