import React from 'react'
import { MenuDataProvider } from '../../context/MenuDataContext'
import DrinkContainer from '../../components/Admin/MenuItemsContainer'

const DrinkItems = () => {



  return (
    <MenuDataProvider
      url={'/drinks'}
      tableColumns={[
        { title: 'ID', field: '_id', hidden: true },
        { title: 'Name', field: 'name' },
        // { title: 'Type', field: 'type', initialEditValue: ' '},
        { title: 'Description', field: 'description'},
        { title: 'Price', field: 'price', type: 'currency' }
      ]}>
      <DrinkContainer />
    </MenuDataProvider>

  )
}


export default DrinkItems;