import React, {createContext, useContext, useState} from 'react'

const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState({username: '', user: ''})

  return (
    <UserContext.Provider value={{userData, setUserData}}>
      {typeof children === 'function'
        ? children(userData.username, userData.user)
        : children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
