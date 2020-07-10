import React, { createContext, useState, useContext } from 'react';
import { client, refresh } from '../utils/api-helper';

const MenuDataContext = createContext();



const URL = '/api/admin'


const MenuDataProvider = ({ url, tableColumns, children, ...props }) => {
  const [menuData, setMenuData] = useState({})
  const [columns, setColumns] = useState(tableColumns)

  const getMenuData = () => {
    return client(URL + url)
    .then(response => {
      if (response.body) {
        if (!response.body.msg) {
          // console.log(response.body)
          setMenuData(response.body)
        } else alert(response.body.msg)
      }
    })
    .catch(err => {
      console.log(err)

    })
  }

  const addMenuItem = (resolve, reject, category, newData) => {
    let data = { ...newData, category }
    console.log(data)
    if (!newData.description) data.description = ''
    return client(URL + url, { data })
    .then(response => {
      if (response.status === 200) {
        let items = [...menuData[category].items, response.body]
        menuData[category].items = items
        setMenuData({ ...menuData })
      }
      else alert(response.body.msg)
      resolve()
    })
    .catch(err => {
      console.log(err)
      reject()
    })
  }

  const updateMenuItem = (resolve, reject, category, oldData, newData = null) => {
    const config = { method: newData ? 'POST' : 'DELETE' }
    return client(URL + url + '/' + oldData._id, { data: newData, config }).then(response => {
      if (response.status === 200) {
        let items = menuData[category].items.filter((item) => item.name !== oldData.name)

        if (newData) items.push(newData)

        menuData[category].items = items
        setMenuData({ ...menuData })
      } else if (response.body.msg) alert(response.body.msg)
      resolve()
    })
    .catch(err => {
      console.log(err)
      reject()
    })

  }


  const createCategory = (category) => {
    let config = { method: 'PUT' }
    let data = { 'name': category.toLowerCase() }
    return client(URL + url + '/category', {data, config }).then(response => {
      if (response.status === 200) {
        menuData[category] = {
          ...response.body.category,
          items: []
        }
        setMenuData({ ...menuData })

      } else if (response.body.msg) alert(response.body.msg)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const deleteCategory = (category_id) => {
    let config = { method: 'DELETE' }
    return client(URL + url + '/category/' + category_id, { config }).then(response => {
      refresh()
    })
    .catch(err => {
      console.log(err)
    })
  }



  return (
    <MenuDataContext.Provider value={{ menuData, getMenuData, columns, setColumns, addMenuItem, updateMenuItem, createCategory, deleteCategory }}>
      {children}
    </MenuDataContext.Provider>
  );

}

function useMenuData() {
  const context = MenuDataContext
  if (context === undefined) throw new Error('useMenuData must be used within a MenuDataProvider')

  return useContext(context);
}

export { MenuDataProvider, useMenuData }