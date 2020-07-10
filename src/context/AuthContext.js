import React, { createContext, useState, useContext } from 'react';
import * as Client from '../utils/api-helper';

const AuthContext = createContext();

const AuthProvider = props => {
  let [isAuthenticated ] = useState(JSON.parse(window.localStorage.getItem(Client.TOKEN_KEY)))
  let [maintenance, setMaintenance] = useState(false)
  let [fourZeroFour, setFourZeroFour] = useState(false)
  let [isLoading, setLoading] = useState(false)
  
  const login = (username, password) =>Client.login(username, password, setLoading)
  // const register = (username, password, setMsg) => Client.register(username, password, setMsg)
  const logout = () => Client.logout()

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setLoading, maintenance,setMaintenance, fourZeroFour,  setFourZeroFour, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );

}

function useAuth() {
  const context = AuthContext
  if (context === undefined) throw new Error('useAuth must be used within a AuthProvider')

  return useContext(context);
}

export { AuthProvider, useAuth }