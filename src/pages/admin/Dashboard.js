import React, { useEffect, useState } from 'react'
import { TextareaAutosize, Container, Grid, makeStyles, Typography, FormGroup, FormControlLabel, Switch, TextFeild } from '@material-ui/core'

import { UpdateContact, UpdateAddress } from '../../components'
import { client } from '../../utils/api-helper'

const Dashboard = () => {
    // const [settings, setSettings] = useState({})
    const [maintenance, setMaintenance] = useState(null)
    // const [about, setAbout] = useState({})
    const classes = useStyles()

    useEffect(() => {

        client('/api/admin/dashboard').then(response => {
            // setSettings(response.body.settings)
            setMaintenance(response.body.settings.maintenance)
        })
            .catch(err => {
                console.error(err)
            })
    }, [])

    const handleMaintenanceSwitch = () => {
        console.log()
        let data = { maintenance: !maintenance }
        let config = { method: 'PUT' }
        client("/api/admin/settings/maintenance", { data, config })
            .then(response => {
                // console.log(response)
                if (response.status === 200) setMaintenance(!maintenance)
            })
            .catch((err) => {
                console.error(err)
                // setMaintenance(!maintenance)
            })
    }

    return (
        <div style={{ height: window.screen.height }}>
            {/* <Typography variant='h3'>Welcome to the Admin Dashboard</Typography> */}

            <Grid container>
                <Grid item sm={6}>
                    <Container className={classes.container}>
                        <UpdateContact />
                    </Container>
                </Grid>
                <Grid item sm={6}>
                    <Container className={classes.container}>
                        <UpdateAddress />
                    </Container>
                </Grid>
            </Grid>


            <Container className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Settings</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup>
                            {maintenance === null ? 
                             <></>
                            :
                            <FormControlLabel
                                control={<Switch checked={maintenance} onChange={handleMaintenanceSwitch} />}
                                label="Maintenance"
                            />
                            }
                            
                        </FormGroup>
                    </Grid>

                </Grid>

            </Container>
        </div>
    )


}

const handleMaintenanceSwitch = (value) => {

}


const useStyles = makeStyles((theme) => ({
    root: {

    },
    container: {
        padding: theme.spacing(2)
    }


}))

export default Dashboard