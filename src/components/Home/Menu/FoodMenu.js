import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'       
import MenuItem from './MenuItem'
import { client } from '../../../utils/api-helper'
import {orderCategories} from '../../../utils/helpers'


const FoodMenu = () => {
  const classes = useStyles()

  const [food, setFood] = useState([])

  useEffect(() => {
    client('/api/home/food')
      .then(response => {
        
        if (response.body){
          let food = orderCategories(response.body)
          setFood(food)
        }
        
        
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div id='food-menu'>
      {food.map((category, index) => {
        if (category.items.length > 0) {
          return (
            <div key={index} className={classes.container}>
              <h3 className={classes.header}>{category.name}</h3>
              {category.items.map((item, key) => (
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