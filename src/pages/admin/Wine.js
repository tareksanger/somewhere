import React from 'react'
import { MenuDataProvider } from '../../context/MenuDataContext'
import DrinkContainer from '../../components/Admin/MenuItemsContainer'

const Wine = () => {



  return (
    <MenuDataProvider
      url={'/wine'}
      tableColumns={[
        { title: 'ID', field: '_id', hidden: true },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description', initialEditValue: ' ' },
        { title: '5oz', field: 'price5oz', type: 'currency' },
        { title: '9oz', field: 'price9oz', type: 'currency'},
        { title: 'Bottle', field: 'priceBottle', type: 'currency'}
      ]}>
      <DrinkContainer />
    </MenuDataProvider>

  )
}


export default Wine;