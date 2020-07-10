import React from 'react'
import { MenuDataProvider } from '../../context/MenuDataContext'
import FoodContainer from '../../components/Admin/MenuItemsContainer'


const FoodItems = () => {




  return (
    <MenuDataProvider
      url={'/food'}
      tableColumns={[
        { title: 'ID', field: '_id', hidden: true },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description', initialEditValue: '' },
        { title: 'Price', field: 'price', type: 'currency'}
      ]}>
      <FoodContainer />
    </MenuDataProvider>

  )
}


export default FoodItems;