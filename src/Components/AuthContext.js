import { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signOut, onAuthStateChanged, signInWithRedirect } from 'firebase/auth'
import { auth } from '../Firebase_setup/Firebase'


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
    }

    useEffect(() => {
        const manageUserState = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser) {
                setLogged(true)
            }
            console.log('user', currentUser)
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