import { createContext, useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../Firebase_setup/Firebase'
import { toast } from 'react-toastify'


export const AuthContext = createContext({
    user: {},
    logOut: () => { },
    setUser: () => { },
    logged: false
})


const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [logged, setLogged] = useState(false)

    const logOut = () => {
        signOut(auth)
        setUser({})
        setLogged(false)
        toast.info('Log Out successful!')
    }

    useEffect(() => {
        const manageUserState = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser) {
                toast.success('Welcome!🤗')
                setLogged(true)
            }
        })
        return () => {
            manageUserState();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, logOut, logged }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider