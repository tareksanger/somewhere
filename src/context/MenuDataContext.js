import React, { createContext, useState, useContext } from 'react';
import { client, refresh } from '../utils/api-helper';
import {orderCategories } from '../utils/helpers'

const MenuDataContext = createContext();



const URL = '/api/admin'


const MenuDataProvider = ({ url, tableColumns, children, ...props }) => {
  const [menuData, setMenuData] = useState([])
  const [columns, setColumns] = useState(tableColumns)

  const getMenuData = () => {
    return client(URL + url)
    .then(response => {
      if (response.body) {
        if (!response.body.msg) {
          // console.log(response.body)
          setMenuData(orderCategories(response.body))
        } else alert(response.body.msg)
      }
    })
    .catch(err => {
      console.log(err)

    })
  }

  const addMenuItem = (resolve, reject, name, newData) => {
    let data = { ...newData, category: name }
    console.log(data)
    if (!newData.description) data.description = ''
    return client(URL + url, { data })
    .then(response => {
      if (response.status === 200) {
        let newMenuData = menuData

        newMenuData = newMenuData.map((c) => (c.name === name) ? {...c, items: [...c.items, response.body ]}: c)

        setMenuData(newMenuData)
      }
      else alert(response.body.msg)
      resolve()
    })
    .catch(err => {
      console.log(err)
      reject()
    })
  }

  const updateMenuItem = (resolve, reject, name, oldData, newData = null) => {
    const config = { method: newData ? 'POST' : 'DELETE' }
    return client(URL + url + '/' + oldData._id, { data: newData, config }).then(response => {
      if (response.status === 200) {
        
        let newMenuData = menuData
        newMenuData = newMenuData.map((c) => (c.name === name) ? {...c, items: c.items.map((item)=> item._id === oldData._id ? newData : item)} : c)
        setMenuData(newMenuData)
      
      } else if (response.body.msg) alert(response.body.msg)
     
      resolve()
    })
    .catch(err => {
      console.log(err)
      reject()
    })

  }


  const createCategory = (name) => {
    let config = { method: 'PUT' }
    let data = { 'name': name.toLowerCase(), order: menuData.length + 1 }
    return client(URL + url + '/category', {data, config }).then(response => {
      if (response.status === 200) {
        let newData = menuData

        newData.push(response.body.category)
        setMenuData(newData)

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


  const handleShowSwitch = (category) => {
    let config = { method: 'PUT'}
    let data = {show: !category.show}
    return client(`${URL}${url}/category/switch/${category._id}`, {data, config}).then(response => {
      if(response.status === 200){
        let newMenuData = menuData

        newMenuData = newMenuData.map((c) => c._id === category._id ? {...c, show: !c.show} : c)

        setMenuData(newMenuData)

      }
    })

  }


  return (
    <MenuDataContext.Provider value={{ menuData, getMenuData, columns, setColumns, addMenuItem, updateMenuItem, createCategory, deleteCategory, handleShowSwitch }}>
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