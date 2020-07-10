import React, { useState } from 'react'
import { makeStyles, Grid, TextField, IconButton } from '@material-ui/core'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AddBox from '@material-ui/icons/AddBox';

import { useMenuData } from '../../context/MenuDataContext'



const AddMenuCategory = () => {
  const [newCategory, setNewCategory] = useState('')
  const { createCategory } = useMenuData()

  const classes = useStyles()


  return (
    <div className={classes.newCategoryContainer}>
      <Grid container spacing={1} alignItems='flex-end' alignContent='flex-end'>

        <Grid item>
          <FastfoodIcon />
        </Grid>

        <Grid item>
          <TextField id='filled-basic' label="Category Name" size='medium' value={newCategory} onChange={e => setNewCategory(e.target.value)} />
        </Grid>

        <Grid item>

          <IconButton className={classes.addBtn} aria-label="Add Category"
            onClick={() => {
              if (newCategory) {
                createCategory(newCategory).then(()=> setNewCategory(''))
              } else alert('Please Enter a Category name first')

            }}>
            <AddBox />
          </IconButton>
        </Grid>
      </Grid>
    </div >
  )


}


const useStyles = makeStyles((theme) => ({

  newCategoryContainer: {
    display: 'flex',
    marginBottom: '6vh',
    paddingLeft: '5vw',
  },
}))


export default AddMenuCategory;