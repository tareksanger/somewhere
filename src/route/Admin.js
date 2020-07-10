import React from 'react'
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import {  Login,Dashboard,  FoodItems, DrinkItems, Beer, Wine } from '../pages'
import { useAuth } from '../context/AuthContext'

import { makeStyles } from '@material-ui/core/styles';



import {AdminDrawer} from '../components'



const Admin = (props) => {
    const { isAuthenticated } = useAuth()
    let { path, url } = useRouteMatch()

    const classes = useStyles()

    return (
        <div className='admin'>
            <div className={classes.root + " admin__content"}>
                <AdminDrawer url={url} path={path} />

                <main className={(isAuthenticated ? classes.content : classes.contentLogin)}>
                    {isAuthenticated ? <div className={classes.toolbar} /> : null}
                    <Switch>
                        <PrivateRoute exact path={path} component={Dashboard} />
                        {/* <PrivateRoute path={path + '/about'} component={FoodItems} /> */}
                        {/* <PrivateRoute path={path + '/contact'} component={FoodItems} /> */}
                        <PrivateRoute path={path + '/food'} component={FoodItems} />
                        <PrivateRoute path={path + '/drinks'} component={DrinkItems} />
                        <PrivateRoute path={path + '/beer'} component={Beer} />
                        <PrivateRoute path={path + '/wine'} component={Wine} />
                        <Route path={path + '/login'}>
                            {isAuthenticated ? <Redirect to="/admin"/> : <Login />}
                        </Route>


                    </Switch>
                </main>
            </div>
        </div>

    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
    },

    contentLogin: {
        flexGrow: 1,
    },
    drawerHeader: {
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    logo: {
        display: 'flex',
        height: theme.spacing(8),
        padding: 10,
        justifyContent: 'center',

    }
}));


export default Admin;