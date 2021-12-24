import React, { useState } from "react";
/*
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { NestedMenuItem } from "./NestedMenuOrigin/NestedMenuItem";
import { IconMenuItem } from "./NestedMenuOrigin/NestedMenuIcon";



export default function NestedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: { currentTarget: React.SetStateAction<null>; }) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <Button variant='contained' onClick={handleClick} >
        Click Me!
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <NestedMenuItem
         
          label={'Top Level'}
          parentMenuOpen={open}
        >
          <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
          <IconMenuItem
            onClick={handleClose}
         
            label={'Icon Menu Item'}
          />
          <NestedMenuItem
          
            label={'Go deeper!'}
            parentMenuOpen={open}
          >
            <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
            <IconMenuItem
              onClick={handleClose}
              label={'Icon Menu Item'} leftIcon={undefined} rightIcon={undefined} MenuItemProps={undefined} className={undefined} ref={undefined}            />
          </NestedMenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  );
}*/