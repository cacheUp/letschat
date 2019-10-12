import React from "react";
import { Menu, Icon } from "semantic-ui-react";

class Starred extends React.Component {
  state = {
    starredChannels: []
  };
  render() {
    const { starredChannels } = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> CHANNELS{" "}
          </span>
          ({starredChannels.length})
        </Menu.Item>
        {/* Channels */}
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    );
  }
}
export default Starred;
