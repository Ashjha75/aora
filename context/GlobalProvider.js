import { useState, useContext, useEffect, createContext } from 'react'
import { getLoggedInUser } from '../lib/appwrite';

const GlobalContext = createContext();

const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaggedIn, setIsLoaggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // check if user is logged in
        getLoggedInUser().then((user) => {
            if (user) {
                setUser(user);
                setIsLoaggedIn(true);
            }
            else {
                setIsLoaggedIn(false);
                setUser(null)
            }
        }).catch((error) => {
            console.log(error);
        }
        ).finally(() => {
            setIsLoading(false);
        })
    }, []);
    return (
        <GlobalContext.Provider value={{
            isLoading,
            isLoaggedIn,
            user,
            setUser,
            setIsLoaggedIn
        }}>{children}</GlobalContext.Provider>
    )
}
export { useGlobalContext, GlobalProvider }