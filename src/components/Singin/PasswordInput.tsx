import TextField from "@mui/material/TextField"
import {  menuSelect } from "../ComponentInterface";

const PasswordInput = (props: menuSelect) => {
  const clientEmailHandler = (event: any) => {
    props.setBackInfo(event.target.value);
  };

  return (
    <TextField
      fullWidth
      // name="password"
      label="Пароль"
      type="password"
      // id="password"
      onChange={clientEmailHandler}
      inputProps={{
        autoComplete: 'current-password',
      }}
      value={props.password}
      
    />
  );
};
export default PasswordInput;
