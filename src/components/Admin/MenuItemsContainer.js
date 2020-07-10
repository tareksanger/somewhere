import React, {  useEffect } from 'react'
// import { makeStyles } from '@material-ui/core'
// import { client } from '../utils/api-helper'
import AddMenuCategory from './AddMenuCategory'
import MenuItemTable from './MenuItemTable'
import { useMenuData } from '../../context/MenuDataContext'



const MenuItemContainer = (tableColumns= []) => {
  const { menuData, getMenuData } = useMenuData()

  useEffect(() => {
    async function getData(){
      getMenuData()
    }
    getData()

    
    
  }, [])

  return (

    <div>

      <AddMenuCategory />

      {menuData ?

        <>
          {Object.keys(menuData).map((key, index) => {
          console.log(menuData[key]._id)
          return (<MenuItemTable key={index} title={key} category_id={menuData[key]._id}/>)
          
          })}
        </>

        :
        <></>
      }

    </div>
  )
}



export default MenuItemContainer