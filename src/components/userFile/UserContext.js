import React, {createContext, useState, useContext} from 'react'

const UserContext = createContext()

export function UserProvider({children}) {
  const [user, setUser] = useState(null) // Initialize with null or initial user data
  const [username, setUsername] = useState('')

  return (
    <UserContext.Provider value={{user, setUser, username, setUsername}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
