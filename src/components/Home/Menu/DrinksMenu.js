import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { client } from '../../../utils/api-helper'
import { orderCategories } from '../../../utils/helpers'

import MenuItem from './MenuItem'


const DrinkMenu = () => {
  const classes = useStyles()
  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    if (drinks.length === 0) {
      client('/api/home/drinks')
        .then(response => {
          if (response.body) {
            let beer = orderCategories(response.body.beer)
            let drinks = orderCategories(response.body.drinks)
             setDrinks({ beer, drinks })

          }
        })
        .catch(err => {
          console.log(err)
        })
    }


  }, [])

  return (
    <div>
      {drinks ?
        <div id="drinks-menu">
          <div className={classes.header}>
            <h2 className={classes.title}>Cocktails & Beer</h2>
          </div>

          {drinks.drinks ?
            drinks.drinks.map((category, index) => createMenuItems(classes, category, index))
            :
            <></>
          }

          <div className={classes.header}>
            <h2 className={classes.title}>Beer</h2>
          </div>

          {drinks.beer ? drinks.beer.map((category, index) => createMenuItems(classes, category, index))
            :
            <></>

          }


        </div>

        :
        <></>
      }

    </div>

  )

}

const createMenuItems = (classes, category, index) => {
  if (category.items.length > 0) {
    return (
      <div key={index} className={classes.container}>
        <h3 className={classes.title}>{category.name}</h3>
        {category.items.map((drink, i) =>
          <MenuItem key={i} item={drink} />
        )}

      </div>
    )
  }

}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifySelf: 'center',
    padding: theme.spacing(3)
  },
  header: {
    padding: theme.spacing(3)
  },

  title: {
    color: '#d4d3ce'
  },
}))

export default DrinkMenu