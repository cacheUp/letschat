import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "../components/ColorPanel/ColorPanel";
import SidePanel from "../components/SidePanel/SidePanel";
import Messages from "../components/Messages/Messages";
import MetaPanel from "../components/MetaPanel/MetaPanel";

function App() {
  return (
    <Grid>
      <ColorPanel />
      <SidePanel />
      <Messages />
      <MetaPanel />
    </Grid>
  );
}

export default App;
