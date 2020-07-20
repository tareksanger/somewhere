


const orderCategories = (array) => array.sort((a, b) => (a.order > b.order) ? 1 : -1)


export {
  orderCategories 
}