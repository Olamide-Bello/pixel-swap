import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import Exit from '../Assets/Exit.png'
import mail from '../Assets/mail.png'
import lock from '../Assets/lock.png'
import { auth } from '../Firebase_setup/Firebase'
import { toast } from 'react-toastify';

const SignUp = ({handleExit, handleLogin}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    
    
    const OnSubmit = async (data) => {
        console.log(data)
        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = res.user;
            console.log(user)
            handleExit()
    
        } catch (err) {
            if(err.message === 'Firebase: Error (auth/email-already-in-use).') {
                toast.warn('You already have an account! Sign in instead')
            } else {
                toast.warning(`${err.message}`);
            }
        }
    
    }
    return (
        <div className='modal-container'>
        <div className={`login ${(errors.password || errors.email) && 'error'}`}>
            <div className='exit'>
                <img onClick={handleExit} src={Exit} alt='exit button' />
            </div>
            <p>Please sign up to use feature</p>
            <form onSubmit={handleSubmit(OnSubmit)}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your mail address"
                        {...register("email",
                            {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                    message: "Email is not valid."
                                }
                            })
                        }
                    />
                    <img src={mail} alt='mail' />
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor='password' >Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        {...register("password",
                            {
                                required: true, minLength: {
                                    value: 6,
                                    message: "Password should be at-least 6 characters."
                                }
                            })
                        }
                    />
                    <img src={lock} alt='lock' />
                    {errors.password?.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                    {errors.password && (<p className="errorMsg">{errors.password.message}</p>)}
                </div>
                <button className='submit-btn' type='submit' id='submit-btn' ><strong>Sign Up</strong></button>
            </form>
            <p>Already have an account? <span onClick={handleLogin}>Sign In here</span></p>
        </div>
        </div>
    )
}

export default SignUp