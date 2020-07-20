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
          {menuData.map((item, index) =>  (<MenuItemTable key={index} category={item}/>))}
        </>

        :
        <></>
      }

    </div>
  )
}



export default MenuItemContainer