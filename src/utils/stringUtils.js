

const capFirstLetter = (str) => str.replace(/^\w/, c => c.toUpperCase())

const toTitleCase = (str) => {
  return str ? str.replace(/^\w/, c => c.toUpperCase()) : str
}

const isEmptyOrSpaces = (str) => str === null || str.match(/^ *$/) !== null;



export {
  capFirstLetter,
  toTitleCase,
  isEmptyOrSpaces,
  
}