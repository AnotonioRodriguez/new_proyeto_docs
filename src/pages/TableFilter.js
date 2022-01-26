import React, { Fragment, useState } from 'react';
import { Button, Grid, TextField, Typography, Paper, Box, TableContainer, TableBody,  Table, TableHead, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import NuevoUsuario from './NuevoUsuario';

export default function TableFilter({setLoading, setAlert}) {

    const [filtro, setFiltro] = useState('');
    const [datosUsuarios, setDatosUsuarios] = useState([]);

    const token = localStorage.getItem('Token');

    const enviarDatos = async () => {
        try {
            await axios.post(`https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/GetUsers`, {
                "Body":{
                    "SearchText": filtro
                }
            },{
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            .then((res) => {
                setDatosUsuarios(res.data.Body); 
            }).catch((err)=>{
                console.log(err)
            }) 
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Fragment>
            <Box textAlign={'center'} p={2}>
                <Typography variant='h5'>
                    <b>Tabla de resultados de datos</b>
                </Typography>
            </Box>
            <Grid item lg={11} md={11} xs={12} >
                <Box width='100%' display={'flex'} justifyContent={'flex-end'}>
                    <Button
                        color='primary'
                        variant='outlined'
                        size='large'
                        onClick={() => {
                            localStorage.removeItem('Token')
                            setLoading(true);
                        }}
                    >
                        Cerrar sesion
                    </Button>
                </Box>
            </Grid>
            <Grid
                container
                justifyContent={'center'}
            >
                <Grid item lg={3} md={11} xs={10}>
                    <Box width='100%' p={1}>
                        <Typography>
                            Filtras datos
                        </Typography>
                        <TextField 
                            fullWidth
                            color="primary"
                            variant="outlined"
                            size='small'
                            onChange={(e) => setFiltro(e.target.value)}
                        />
                    </Box>
                </Grid>
                <Grid item lg={2} md={6} xs={12} >
                    <Box width='100%' p={2} mt={2}>
                        <Button
                            color='primary'
                            variant='outlined'
                            size="large"
                            onClick={()=> enviarDatos()}
                        >
                            Buscar
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={2} md={6} xs={12} >
                    <Box width='100%' p={2} mt={2}>
                       <NuevoUsuario setAlert={setAlert} />
                    </Box>
                </Grid>
               
            </Grid>

            <Grid 
                container
                justifyContent={'center'}
            >
                <Grid item lg={10} xs={12} md={12}>
                    
                    <Box p={2}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Nombre
                                        </TableCell>
                                        <TableCell>
                                            Apellido
                                        </TableCell>
                                        <TableCell>
                                            User Name
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datosUsuarios?.map((user, index) =>{
                                        return(
                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell component="th" scope="row">
                                                    {user.Name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {user.FatherLastName}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {user.Username}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
        </Fragment>
    );
}
