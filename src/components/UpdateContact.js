import React, { useState, useEffect } from 'react'
import { Container, Grid, TextField, Typography, makeStyles, Button } from '@material-ui/core'
import { client } from '../utils/api-helper'

const EMAIL_REG = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
const PHONE_REG = /^\d{10}$/;
const UpdateContact = () => {
  let classes = useStyles()

  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  let [phoneError, setPhoneError] = useState('')


  useEffect(()=> {
    client('/api/admin/contact')
    .then(response => {
      if(response.body) {
        setEmail(response.body.email)
        setPhone(response.body.tel)
      }
    })
  }, [])


  const handleUpdateContact = () => {
    if ((!EMAIL_REG.test(email) || email === '') && !phoneError) {
      let data = { email, phone }
      let config = { method: "POST" }
      client('/api/admin/contact', { data, config })
        .catch(err => {
          console.error(err)
        })
    }
  }



  return (

    <Grid container spacing={3}>
      <Grid item zeroMinWidth={12}>
        <Typography variant='h4'>Contact</Typography>
      </Grid>
      <Grid item xs={12} md={16}>
        <TextField id="standard-basic" label="E-mail" value={email} error={!EMAIL_REG.test(email) && email !== ''} onChange={e => setEmail(e.target.value)} />
      </Grid>
      <Grid item xs={12} md={16}>
        <TextField id="standard-basic" label="Phone Number" value={phone} error={phoneError} onChange={e => setPhone(formatPhoneNumber(e.target.value, setPhoneError))} />
      </Grid>

      <Grid item xs={12} md={16}>
        <Button variant="contained" color="primary" className={classes.btn} onClick={handleUpdateContact}>Update</Button>
      </Grid>
    </Grid>
  )

}

const useStyles = makeStyles((theme) => ({

  btn: {
    margin: theme.spacing(2)
  }

}))

function formatPhoneNumber(phoneNumberString, setPhoneError) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    setPhoneError(false)
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  setPhoneError(true)
  return null
}

export default UpdateContact