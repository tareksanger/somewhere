import { queryCache } from 'react-query'
import { Base64 } from 'js-base64';
// import {Alert} from 'react' 

const TOKEN_KEY = 'User_Key'

const URL = ''//'http://localhost:8080'

// refresh the page
const refresh = () => window.location.assign(window.location)

const client = async (subdir, { data, config } = {}) => {

  const user = JSON.parse(window.localStorage.getItem(TOKEN_KEY))

  const aConfig = {

    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: new Headers({
      
      'Accept': 'application/json',
      'x-access-token': user ? user.token : undefined,
      'Content-Type': data ? 'application/json' : undefined,
    }),
    ...config
  }

  return fetch(URL + subdir, aConfig)
    .then(response => {
      
      return response.json().then(data => ({status: response.status, body: data}))
    
    })
    .then(data => {
      if(!data || !data.body) alert('Something is wrong!')

      if(data.body.logout) logout()

      return data
    })
    .catch((error) => {
      console.log('Error: ' + error)
      return
    })
}

// user Login
const login = (username, password, setMsg) => {
  const config = {
    headers: new Headers({
      // 'Authorization': 'Basic ' + Base64.encode(username + ':' + password),
      'content-type': 'application/json'
    })
  }
  const data = {username, password}
  client('/api/auth/login', {data,config})
    .then(data => {
      if (data.body.token) {
        window.localStorage.setItem(TOKEN_KEY, JSON.stringify(data.body))
        refresh()
      }

    })
}

// User Logout
const logout = () => {
  queryCache.clear()
  window.localStorage.removeItem(TOKEN_KEY)
  // alert('Hello')
  refresh()
}





export { TOKEN_KEY, client, login, logout, refresh}
