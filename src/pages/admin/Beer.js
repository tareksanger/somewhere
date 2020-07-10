import React from 'react'
import { MenuDataProvider } from '../../context/MenuDataContext'
import DrinkContainer from '../../components/Admin/MenuItemsContainer'

const Beer = () => {

  return (
    <MenuDataProvider
      url={'/beer'}
      tableColumns={[
        { title: 'ID', field: '_id', hidden: true },
        { title: 'Name', field: 'name' },
        { title: 'Price', field: 'price', type: 'currency' }
      ]}>
      <DrinkContainer />
    </MenuDataProvider>

  )
}


export default Beer;