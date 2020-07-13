import React, { useEffect } from 'react'
import { Link, } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, makeStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';




const AdminDrawer = ({ path, url, ...props }) => {
  const { isAuthenticated } = useAuth()

  const classes = useStyles()

  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  useEffect(() => {
    console.log("URL: " + url)
  }, [])

  const iconDict = (text) => {
    switch (text) {
      case 'about':
        return <InfoRoundedIcon />
      case 'dashboard':
        return <ContactPhoneIcon />
      case 'food':
        return <FastfoodIcon />
      case 'drinks':
        return <LocalBarIcon />
      case 'beer':
        return <LocalBarIcon />
      case 'wine':
        return <LocalBarIcon />
      default:
        return null
    }
  }

  const createDrawerLink = (text) => {

    return (
      <Link to={url + (text === 'dashboard' ? '' :'/' + text)} key={text} >
        <ListItem button >
          <ListItemIcon>{iconDict(text)}</ListItemIcon>
          <ListItemText primary={text.replace(/^\w/, c => c.toUpperCase())} />
        </ListItem>
      </Link>
    )
  }
  const drawer = (
    <div id='admin-drawer'>
      <div className={classes.toolbar} />
      <List>
        {['dashboard', 'about'].map((text, index) => (
          createDrawerLink(text)
        ))}
      </List>
      <Divider />
      <List>
        {['food', 'beer', 'wine', 'drinks'].map((text, index) => (
          createDrawerLink(text)
        ))}
      </List>
    </div>
  );




  return (
    <div>
      {isAuthenticated ?
        <div>
          <CssBaseline />

          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h3" noWrap>Admin</Typography>
            </Toolbar>
          </AppBar>

          <nav className={classes.drawer} >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="js">
              <Drawer
                container={classes.container}
                variant="temporary"
                anchor={'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </div>
        :
        <> </>

      }
    </div>


  )
}


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#273848'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },

  drawerHeader: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },

}));


export default AdminDrawer;