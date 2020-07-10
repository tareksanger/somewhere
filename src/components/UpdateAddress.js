import React, { useState, useEffect } from 'react'
import { Container, Grid, TextField, Typography, makeStyles, Button } from '@material-ui/core'
import { client } from '../utils/api-helper'

const UpdateContact = () => {
  let classes = useStyles()

  let [street, setStreet] = useState('')
  let [city, setCity] = useState('')
 

  useEffect(()=> {
    client('/api/admin/address')
    .then(response => {
      if(response.body) {
        setStreet(response.body.street)
        setCity(response.body.city)
      }
    })
  }, [])


  const handleUpdateAddress= () => {
    if (street) {
      let data = { street, city}
      let config = { method: "POST" }
      client('/api/admin/address', { data, config })
        .catch(err => {
          console.error(err)
        })
    }
  }



  return (

    <Grid container spacing={3}>
      <Grid item zeroMinWidth={12}>
        <Typography variant='h4'>Address</Typography>
      </Grid>
      <Grid item xs={12} md={16}>
        <TextField id="standard-basic" label="Street Address" value={street}  onChange={e => setStreet(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={16}>
        <TextField id="standard-basic" label="City" value={city} onChange={e => setCity(e.target.value)} />
      </Grid>

      <Grid item xs={12} md={16}>
        <Button variant="contained" color="primary" className={classes.btn} onClick={handleUpdateAddress}>Update</Button>
      </Grid>
    </Grid>
  )

}

const useStyles = makeStyles((theme) => ({

  btn: {
    margin: theme.spacing(2)
  }

}))


export default UpdateContact