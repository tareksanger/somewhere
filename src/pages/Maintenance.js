import React from 'react'
import { makeStyles, Typography, Paper } from '@material-ui/core'


const Maintenance = () => {
  const classes = useStyles()

  return (
    <div className='maintenance' style={{ height: window.screen.height }}>
      <Paper className={classes.paper} elevation={3}>
          <Typography>
            <h1>We're currently under Maintenance.</h1>
          </Typography>
          <Typography>Sorry for the inconvenience! We'll be back soon!</Typography>
      </Paper>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    

  },
  text: {
    color: '#d4d3ce'
  },
  paper: {
    maxHeight: 300,
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    textAlign: 'center',
  }

}))


export default Maintenance