import React from "react";
import { TextField } from "@material-ui/core";
import { inputProps, menuSelect } from "../ComponentInterface";

const PasswordInput = (props: menuSelect) => {
  const clientEmailHandler = (event: any) => {
    props.setBackInfo(event.target.value);
  };

  return (
    <TextField
      fullWidth
      name="password"
      label="Пароль"
      type="password"
      id="password"
      onChange={clientEmailHandler}
      
      value={props.password}
      
    />
  );
};
export default PasswordInput;
