import { Box, Snackbar, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import Login from './pages/Login';
import TableFilter from './pages/TableFilter';

function App() {

  const token = localStorage.getItem('Token')
  const [loading, setLoading] = useState(false);

  const [ alert, setAlert ] = useState({
    message: "",
    open: false,
    action:""
  });

  const handleClose =() => {
    setAlert({ open: false, status: alert.status, message: '' });
  };

  function RetornoVista() {
    if(!token){
      return <Login setAlert={setAlert} setLoading={setLoading} />
    }else{
      return <TableFilter setAlert={setAlert} setLoading={setLoading} />
    }
  };

  useEffect(() => {
    RetornoVista();
    setLoading(false);
  }, [loading]);
  

  return (
    <Fragment>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
				onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={
					<Box display="flex">
						<Typography>{alert.message}</Typography>
					</Box>
				}
      />
      {RetornoVista()}
    </Fragment>
  );
}

export default App;
