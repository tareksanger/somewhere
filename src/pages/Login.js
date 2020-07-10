import React, { useState} from 'react'
import { useAuth } from '../context/AuthContext'
import { Button, makeStyles, Paper, Grid, TextField, Container } from '@material-ui/core'
import { Face, Fingerprint } from '@material-ui/icons'


// import {
//     useHistory,
//     useLocation,
//     Redirect
// } from "react-router-dom";
// const drawerWidth = 240;



const Login = () => {

    const { login } = useAuth()

    const classes = useStyles()

    const [username, setName] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const handleClick = () => login(username, password, setMsg)

    // clear message on text changes
    // useEffect(() => { if (msg) setMsg('') }, [username, password]) 

    // TODO : FIX ERROR MESSAGE

    return (
        <div className="login-container" style={{ height: window.screen.height }}>
            <Container maxWidth='sm'>
                <Paper elevation={3} className={classes.padding}>
                    <div className="login-wrapper">
                        <h1>Admin Login</h1>
                        <div>
                            <p>{msg}</p>
                        </div>
                        <Grid container spacing={4} alignItems="flex-end">
                            <Grid item>
                                <Face />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Username" type="email" size='medium' fullWidth autoFocus required value={username} onChange={e => setName(e.target.value)} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} alignItems="flex-end">
                            <Grid item>
                                <Fingerprint />
                            </Grid>
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="password" label="Password" type="password" size='medium' fullWidth required value={password} onChange={e => setPassword(e.target.value)} />
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button variant="contained" color="primary" size='large' style={{ textTransform: "none" }} onClick={handleClick}>Login</Button>
                        </Grid>


                    </div>



                </Paper>
            </Container>
        </div>



    )
}


const useStyles = makeStyles((theme) => ({
    // container: {
    //     marginTop: theme.spacing.unit * 4
    // },
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit * 2, 
    },

}))


export default Login