import React from "react";
import { MenuItem, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

const StyledMenuItem = styled(MenuItem)({
  paddingRight: 0,
  paddingLeft: "4px",
  display: "flex",
  justifyContent: "space-between",
});

const StyledTypography = styled(Typography)({
  paddingLeft: "8px",
  paddingRight: "8px",
  textAlign: "left",
});

const FlexBox = styled(Box)({
  display: "flex",
});

export const IconMenuItem = ({
  leftIcon,
  rightIcon,
  onClick,
  label,
  MenuItemProps,
  className,
  ref,
}) => {
  return (
    <StyledMenuItem {...MenuItemProps} ref={ref} className={className} onClick={onClick}>
      <FlexBox>
        {leftIcon}
        <StyledTypography>{label}</StyledTypography>
      </FlexBox>
      {rightIcon}
    </StyledMenuItem>
  );
};