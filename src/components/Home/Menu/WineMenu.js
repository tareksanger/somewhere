import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { client } from '../../../utils/api-helper'
import { orderCategories } from '../../../utils/helpers'

import MenuItem from './MenuItem'


const DrinkMenu = () => {
  const classes = useStyles()
  const [wine, setWine] = useState([])

  useEffect(() => {
    if (wine.length === 0) {
      client('/api/home/wine')
        .then(response => {

          if (response.body) {
            let wine = orderCategories(response.body)
            setWine(wine)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])


  return (
    <div>
      {wine ?
        <>
          <div className={classes.header}>
            <h2 className={classes.title}>Wine</h2>
            <p className={classes.title}>5oz / 90z / Bottle</p>
          </div>

          {wine.map((item, index) => {
            if (item.items.length > 0) {
              return (
                <div key={index} className={classes.container}>
                  <h3 className={classes.title}>{item.name}</h3>
                  {item.items.map((drink, index) =>
                    <MenuItem key={index} item={drink} wine />
                  )}

                </div>
              )
            }
          })}
        </>

        :
        <></>
      }

    </div>

  )

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