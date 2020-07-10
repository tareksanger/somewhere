import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'       
import MenuItem from './MenuItem'
import { client } from '../../../utils/api-helper'

const FoodMenu = () => {
  const classes = useStyles()

  const [food, setFood] = useState({})

  useEffect(() => {
    client('/api/home/food')
      .then(response => {
        if (response.body) setFood(response.body)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div id='food-menu'>
      {Object.keys(food).map((key, index) => {
        if (food[key].items.length > 0) {
          return (
            <div key={index} className={classes.container}>
              <h3 className={classes.header}>{key}</h3>
              {food[key].items.map((item, key) => (
                <MenuItem key={key} item={item} />
              ))}

            </div>
          )
        }
      }
      )}

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

  header: {
    color: '#d4d3ce'
    
    
  },



}))


export default FoodMenu