import { Button, Menu, MenuItem } from "@mui/material";
import {NestedMenuItem} from "./NestedMenuOrigin/NestedMenuItem";
import React from "react";
import { IconMenuItem } from "./NestedMenuOrigin/IconMenuItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function App() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
  
    return (
      <div>
        <Button  onClick={handleClick}>
          Click Me!
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <NestedMenuItem
            leftIcon={<AccountCircleIcon />}
            label={'Top Level'}
            parentMenuOpen={open}
          >
            <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
            <IconMenuItem
              onClick={handleClose}
              leftIcon={<AccountCircleIcon />}
              rightIcon={<AccountCircleIcon />}
              label={'Icon Menu Item'}
            />
            <NestedMenuItem
              leftIcon={<AccountCircleIcon />}
              label={'Go deeper!'}
              parentMenuOpen={open}
            >
              <MenuItem onClick={handleClose}>Standard Menu Item!</MenuItem>
              <IconMenuItem
                onClick={handleClose}
                leftIcon={<AccountCircleIcon/>}
                rightIcon={<AccountCircleIcon />}
                label={'Icon Menu Item'}
              />
            </NestedMenuItem>
          </NestedMenuItem>
        </Menu>
      </div>
    );
  }