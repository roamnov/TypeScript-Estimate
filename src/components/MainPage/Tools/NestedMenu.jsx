import { useState } from "react";
import { Button, Menu, MenuItem} from "@material-ui/core";
import { NestedMenuItem } from "./NestedMenuOrigin/NestedMenuItem";

//import NestedMenuItem from "material-ui-nested-menu-item";

export const NestedMenu = () => {
  const [menuPosition, setMenuPosition] = useState();
  const open = Boolean(menuPosition);

  const handleClick = (event) => setMenuPosition(event.currentTarget);

  const handleRightClick = (event) => {
    if (menuPosition) {
      return;
    }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
  };

  const handleItemClick = (event) => {
    setMenuPosition(null);
  };

  return (
    <div >
      <Button onClick={handleRightClick}>Click</Button>
      <Menu
        open={open}
        onClose={() => setMenuPosition(null)}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem onClick={handleItemClick}>Button 1</MenuItem>
        <MenuItem onClick={handleItemClick}>Button 2</MenuItem>
        <NestedMenuItem
                  label="Button 3"
                  parentMenuOpen={!!menuPosition}
                  onClick={handleItemClick}       >
          <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
          <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
          <NestedMenuItem
                      label="Sub-Button 3"
                      parentMenuOpen={!!menuPosition}
                      onClick={handleItemClick}      >
            <MenuItem onClick={handleItemClick}>Sub-Sub-Button 1</MenuItem>
            <MenuItem onClick={handleItemClick}>Sub-Sub-Button 2</MenuItem>
          </NestedMenuItem>
        </NestedMenuItem>
        <MenuItem onClick={handleItemClick}>Button 4</MenuItem>
        <NestedMenuItem
                  label="Button 5"
                  parentMenuOpen={!!menuPosition}
                  onClick={handleItemClick}     >
          <MenuItem onClick={handleItemClick}>Sub-Button 1</MenuItem>
          <MenuItem onClick={handleItemClick}>Sub-Button 2</MenuItem>
        </NestedMenuItem>
      </Menu>
    </div>
  );
};

export default NestedMenu;
