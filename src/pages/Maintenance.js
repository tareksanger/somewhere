import React from 'react'
import { Container, makeStyles, Typography, Paper } from '@material-ui/core'


const Maintenance = () => {
  const classes = useStyles()

  return (
    <div className='maintenance' style={{ height: window.screen.height }}>
      <Paper className={classes.paper} elevation={3}>

        <Container>
          <Typography>
            <h1>We're currently under Maintenance.</h1>
          </Typography>
          <p>Sorry for the inconvenience! We'll be back soon!</p> 
        </Container>

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
    margin: theme.spacing(5),
    padding: theme.spacing(5),
    textAlign: 'center',
  }

}))


export default Maintenance