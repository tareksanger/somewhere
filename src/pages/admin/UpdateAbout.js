import React, { useState, useEffect } from 'react'
import { Container, Typography, makeStyles, Button, Switch, Paper, TextareaAutosize, FormGroup, FormControlLabel } from '@material-ui/core'
import { client } from '../../utils/api-helper'

const UpdateAbout = () => {
  const classes = useStyles()

  const [text, setText] = useState('')
  const [show, setShow] = useState(null)


  useEffect(() => {
    if (show === null) {
      client('/api/admin/about')
        .then(response => {
          if (response.body) {
            setText(response.body.text)
            setShow(response.body.show)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [])


  const handleUpdateAbout = () => {
      let data = { text, show }
      let config = { method: "POST" }
      client('/api/admin/about', { data, config })
        .catch(err => {
          console.error(err)
        })
  }

  const handleAboutSwitch = () => {
    let data = { show: show }
    let config = { method: "POST" }

    client('/api/admin/about/switch', { data, config })
    .then(response => {
      if(response.status === 200) setShow(!show)
    })
    .catch(err => {
      console.error(err)
    })

  }



  return (

    <Container>
      <Typography variant='h3'>About</Typography>

      <Paper className={classes.paper}  elevation={3}>
        <TextareaAutosize
          className={classes.textArea}
          rows='10'
          value={text}
          onChange={e => setText(e.target.value)}
          // aria-label="maximum height"
          placeholder="About"
        />
      </Paper>
      <Button variant="contained" color="primary" className={classes.btn} onClick={handleUpdateAbout}>Update</Button>
      <FormGroup>
                            {show === null ? 
                             <></>
                            :
                            <FormControlLabel
                                control={<Switch checked={show} onChange={handleAboutSwitch} />}
                                label={(show? 'Hide': 'Show')+ " About Section"}
                            />
                            }
                            
                        </FormGroup>

    </Container>
  )

}

const useStyles = makeStyles((theme) => ({

  btn: {
    margin: theme.spacing(2)
  },
  paper: {
    Width: 400,
    // minHeight: 400,
  },
  textArea: {
    width: '100%',
  }

}))


export default UpdateAbout