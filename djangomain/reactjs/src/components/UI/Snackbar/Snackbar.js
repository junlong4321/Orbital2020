import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

const Snackbar = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar('I love snacks.');
    };

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar('This is a success message!', { variant });
    };
    handleClickVariant('success');
    //   return (
    //     <React.Fragment>
    //       <Button onClick={handleClick}>Show snackbar</Button>
    //       <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
    //     </React.Fragment>
    //   );
};

export default Snackbar;

// export default function IntegrationNotistack() {
//   return (
//     <SnackbarProvider maxSnack={3}>
//       <MyApp />
//     </SnackbarProvider>
//   );
// }
