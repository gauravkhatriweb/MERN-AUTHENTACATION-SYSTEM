import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()
export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState(false)
    const getAuthStatus = async () => {
        try{
            const data = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.data.isAuth){
                setIsLoggedIn(true)
                getUserData()
            }else{
                setIsLoggedIn(false)
            }
        }catch(err){
            toast.error(err.response.data.message)
        }
    }




    const getUserData = async () => {
        try{
            const data = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.data) : toast.error(data.message)
        }catch(err){
            toast.error(err.response.data.message)
        }
    }
    useEffect(() => {
        getAuthStatus();
    }, [])

    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData,setUserData,
        getUserData,

    }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
