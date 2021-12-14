import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Это сообщение об успехе!', { variant });
  };

  const Variant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('Это сообщение об успехе!', { variant });
  };


  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
      
    </React.Fragment>
  );
}

export default function Alert() {
  return (
    <SnackbarProvider maxSnack={5}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
    >
       {}
      <MyApp />
    </SnackbarProvider>
  );
}
