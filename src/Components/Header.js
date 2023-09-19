import React, { useContext, useMemo, useRef, useState } from 'react'
import { ReactComponent as Logo } from '../Assets/logo.svg'
import { AuthContext } from './AuthContext'
import SignUp from './SignUp'

const Header = () => {
    const { user, logOut, logged } = useContext(AuthContext)
    const [signInModal, setSignInModal] = useState(false)
    const [signUpModal, setSignUpModal] = useState(false)
    const userInitials = useRef(null)


    const handleSignup= () => {
        setSignUpModal(true)
    }

    const handleExit= () => {
        setSignInModal(false)
        setSignUpModal(false)
    }

    const handleLogin= () => {
        setSignUpModal(false)
        setSignInModal(true)
    }
    useMemo(() => {
        if (user) {
          const copy = user.email
          const arr = typeof copy === "string" && copy[0]
          userInitials.current = arr
          console.log(userInitials.current)
        }
      }, [user])
    return (
        <div className='header'>
            <div className='logo-box'>
                <Logo className='logo'/>
                <span>Pixel Swap</span>
            </div>
            {logged ?
                <div className='logged'>
                    {user?.photoURL ? <img className='dis-pic' src={user?.photoURL} alt='dp' /> : <div className='dis-pic avatar'><span>{userInitials.current}</span></div>}
                    <p className='log-out' onClick={logOut}>LOG OUT</p>
                </div>
                :
                <button onClick={handleSignup} className='action-btn'>Log In</button>
            }

            {signUpModal && <SignUp handleExit={handleExit} handleLogin={handleLogin}/>}
        </div>
    )
}

export default Header