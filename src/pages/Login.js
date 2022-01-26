import React, { useState } from 'react';
import { Grid, Paper, Box, Avatar, TextField, Button, Typography } from '@mui/material/'
import axios from 'axios';

export default function Login(props) {

    const {setAlert,setLoading} = props;

    const [datos, setDatos] = useState([]);

    const obtenerDatos = (e) => {
        const {name, value } = e.target;
        setDatos({...datos, [name]: value});
    };

    const enviarDatos = async () => {
        try {
            await axios.post(`https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/authentication/authentication/`, {
                "Body": {
                    "Username": datos.Username,
                    "Password": datos.Password
                }
            })
            .then((res) => {
                localStorage.setItem('Token', res.data.Body.Token);
                setAlert({
                    message: "Has inciado sesion con exito",
                    open: true,
                    action: 'success'
                });
                setLoading(true);                
                setDatos([]);
            }).catch((err) => {
                console.log(err);
            })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Grid 
            container
            justifyContent={'center'}
            sx={{p: 10}}
        >
            <Grid item lg={3} md={5} xs={12}>
                <Paper elevation={5}>
                    <Box sx={{p: 2}}>
                        <Box sx={{p: 3, display: 'flex', justifyContent: 'center'}}>
                            <Avatar sx={{width: 90, height: 90}} />
                        </Box>
                        <Box textAlign={'center'} width={'100%'}>
                            <Box>
                                <Typography>
                                    Nombre Usuario: 
                                </Typography>
                            </Box>
                            <TextField
                                color="primary"
                                size="small"
                                variant='outlined'
                                name="Username"
                                onChange={obtenerDatos}
                            />
                        </Box>
                        <Box textAlign={'center'} width={'100%'}>
                            <Box>
                                <Typography>
                                    Contraseña: 
                                </Typography>
                            </Box>
                            <TextField
                                color="primary"
                                size="small"
                                variant='outlined'
                                name="Password"
                                type={'password'}
                                onChange={obtenerDatos}
                            />
                        </Box>
                        <Box sx={{p: 2, display: 'center', justifyContent: 'center'}}>
                            <Button
                                color="success"
                                variant="outlined"
                                size='large'
                                onClick={() => enviarDatos()}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
}
