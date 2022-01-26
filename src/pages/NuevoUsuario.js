import { Button, Dialog, DialogContent, DialogTitle, Box, DialogActions, Typography, TextField } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useState } from 'react';

export default function NuevoUsuario({setAlert}) {

    const token = localStorage.getItem('Token');
    const [open, setOpen] = useState(false);
    const [datos, setDatos] = useState([]);

    const handleClickOpen =()=>{
        setOpen(!open);
    };

    const obtenerDatos =(e)=>{
        const {name, value} = e.target;
        setDatos({...datos, [name]: value})
    };

    const enviarDatos = async () => { 
        try {
            await axios.post(`https://techhub.docsolutions.com/OnBoardingPre/WebApi/api/user/RegisterUserRole`, {
                "Body":{
                    Tenant: null,
                    UserName: datos.UserName,
                    Password: datos.Password,
                    Name: datos.Name,
                    FatherLastName: datos.FatherLastName,
                    MotherLastName: datos.MotherLastName,
                    Email: datos.Email,
                    PhoneNumber: datos.PhoneNumber,
                    Metadata: null,
                    Roles: [
                        {
                            Id: 2,
                            Name: "Usuario Tradicional"
                        }
                    ]
                }
            },{
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res);
                handleClickOpen();
                setAlert({
                    message: "Usuario registrado con exito",
                    open: true,
                    action: 'success'
                });
            }).catch((err)=>{
                console.log(err)
            }) 
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Fragment>
            <Box>
                <Button
                    color="success"
                    variant='outlined'
                    size='large'
                    onClick={handleClickOpen}
                >
                    Nuevo Usuario
                </Button>
            </Box>

            <Dialog
                fullWidth={'md'}
                open={open}
                han
            >
                <DialogTitle>
                    <Box textAlign={'center'}>
                        <b>Nuevo Usuario</b>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>UserName:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='UserName'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>Password:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='Password'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>Name:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='Name'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>FatherLastName:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='FatherLastName'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>MotherLastName:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='MotherLastName'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>Email:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='Email'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                    <Box width={'100%'}>
                        <Box>
                            <Typography>
                                <b>PhoneNumber:</b>
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                color='primary'
                                name='PhoneNumber'
                                onChange={obtenerDatos}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Box p={1}>
                        <Button
                            color={'error'}
                            variant="outlined"
                            size="large"
                            onClick={handleClickOpen}
                        >
                            Cancelar
                        </Button>
                    </Box>
                    <Box p={1}>
                        <Button
                            color={'success'}
                            variant="outlined"
                            size="large"
                            onClick={() => enviarDatos()}
                        >
                            Agregar
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
