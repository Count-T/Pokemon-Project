import React from "react";
import { AppBar, Typography } from "@material-ui/core";
function Header() {
  return (
    <div>
      <AppBar>
        <Typography variant="h2" align="center">
          Pokemon Information
        </Typography>
      </AppBar>
    </div>
  );
}

export default Header;
