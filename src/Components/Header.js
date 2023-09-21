import React, { useContext, useMemo, useRef } from 'react'
import { ReactComponent as Logo } from '../Assets/logo.svg'
import { AuthContext } from './AuthContext'
import SignUp from './SignUp'
import { GlobalContext } from './GlobalContext'
import SignIn from './SignIn'
import SearchBar from './SearchBar'

const Header = () => {
    const { user, logOut, logged } = useContext(AuthContext)
    const { signInModal, signUpModal, setSignInModal, setSignUpModal, tags } = useContext(GlobalContext)
    const userInitials = useRef(null)

    const handleSignup = () => {
        setSignUpModal(true)
        setSignInModal(false)
    }

    const handleExit = () => {
        setSignInModal(false)
        setSignUpModal(false)
    }

    const handleLogin = () => {
        setSignUpModal(false)
        setSignInModal(true)
    }
    useMemo(() => {
        if (user) {
            const copy = user.email
            const arr = typeof copy === "string" && copy[0]
            userInitials.current = arr
        }
    }, [user])
    return (
        <div className='header-container'>
            <div className='header'>
                <div className='logo-box'>
                    <Logo className='logo' />
                    <span>Pixel Swap</span>
                </div>
                {logged ?
                    <div className='logged'>
                        {user?.photoURL ? <img className='dis-pic' src={user?.photoURL} alt='dp' /> : <div className='dis-pic avatar'><span>{userInitials.current}</span></div>}
                        <p className='log-out' onClick={logOut}>LOG OUT</p>
                    </div>
                    :
                    <button onClick={handleSignup} className='action-btn'>Sign Up</button>
                }
            </div>
            <SearchBar />
            <div className='tags-container'>
                {tags && tags.length > 0 &&
                    tags.map((tag) => (
                        <span key={`tag-${tag}`} className='tag'>{tag}</span>
                    ))}
            </div>
            {signUpModal && <SignUp handleExit={handleExit} handleLogin={handleLogin} />}
            {signInModal && <SignIn handleSignup={handleSignup} handleExit={handleExit} />}
        </div>
    )
}

export default Header