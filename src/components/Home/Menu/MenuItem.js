import React, { useEffect, useState } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'



const MenuItem = ({ item, wine = false }) => {
  const classes = useStyles()
  const [food, setFood] = useState(item)

  return (
    <div className={classes.root}>


      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography className={classes.heading}>
            {food.name}
          </Typography>

        </Grid>
        <Grid item xs={6} className={classes.heading}>
          {wine ?
            <Typography className={classes.price}>
              {food.price5oz ? food.price5oz : "x"} / {food.price9oz ? food.price9oz : "x"} / {food.priceBottle ? food.priceBottle : "x"}
            </Typography>
            :

            <Typography className={classes.price}>
              {food.price}
            </Typography>
          }


        </Grid>
        {food.description ?

          <Grid item xs={12}>
            <Typography className={classes.description}>
              {food.description}
            </Typography>
          </Grid>
          :

          <></>

        }

      </Grid>

    </div>
  )

}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // textAlign: "center",
    // justifySelf: 'center'
    padding: theme.spacing(3)

  },

  heading: {
    color: '#d4d3ce',
    textAlign: 'left'

  },

  price: {
    color: '#d4d3ce',
    textAlign: 'right'
  },

  description: {
    color: '#9c9b98',
    textAlign: 'left'

  }


}))

export default MenuItem