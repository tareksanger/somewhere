import React, { useState } from 'react'
import { makeStyles, Accordion, AccordionSummary, AccordionDetails, IconButton, FormControlLabel, FormGroup, Switch } from '@material-ui/core'
import MaterialTable from 'material-table';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import tableIcons from './TableIcons'

import { useMenuData } from '../../context/MenuDataContext'
import { toTitleCase } from '../../utils/stringUtils'



const MenuItemTable = ({ category }) => {
  const classes = useStyles()
  const { addMenuItem, menuData, updateMenuItem, columns, deleteCategory, handleShowSwitch } = useMenuData()


  return (

    <div className={classes.table}>
      <Accordion TransitionProps={{ unmountOnExit: true }} className={classes.accordion}>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >

          <h2> {toTitleCase(category.name)} </h2>

        </AccordionSummary>

        <AccordionDetails>

          <MaterialTable
            style={{ width: '100%' }}
            icons={tableIcons}
            title={''}
            columns={columns}
            data={category.items}
            options={{
              actionsColumnIndex: -1,
              rowStyle: {
                backgroundColor: '#D3D3D3'
              }
            }}


            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  if (!newData.name || newData.name === '') {
                    alert('There must be a name value.')
                    reject()
                  } else addMenuItem(resolve, reject, category.name, newData,)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {

                  if (!newData.name || newData.name === '') {
                    alert('There must be a name value.')
                    reject()

                  } else {

                    updateMenuItem(resolve, reject, category.name, oldData, newData)

                  }
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  updateMenuItem(resolve, reject, category.name, oldData)
                })
            }}

          />



        </AccordionDetails>
        <AccordionDetails>
          <FormGroup>
              <FormControlLabel
                control={<Switch checked={category.show} onChange={() => handleShowSwitch(category)} />}
                label={(category.show ? 'Hide' : 'Show') + " About Section"}
              />
          </FormGroup>

          <IconButton onClick={async () => {
            let r = window.confirm("Are you sure you want to delete " + category.name.toUpperCase() + " and all of it contents?")

            if (r) {
              deleteCategory(category._id)
            }

          }}>
            <DeleteIcon />
          </IconButton>
        </AccordionDetails>
      </Accordion>
    </div>

  )


}



const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: '#d4d3ce',
  },
  expantionDetails: {
    display: 'block'
  },

  table: {
    padding: theme.spacing(1)
  },
}))


export default MenuItemTable