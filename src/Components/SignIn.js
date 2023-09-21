import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import Exit from '../Assets/Exit.png'
import mail from '../Assets/mail.png'
import lock from '../Assets/lock.png'
import { auth } from '../Firebase_setup/Firebase'

const SignIn = ({ handleExit, handleSignup }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const OnSubmit = async (data) => {
        try {
            const res = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = res.user;
            console.log(user)
            handleExit()

        } catch (err) {
            console.error(err);
            alert(err.message);
        }

    }
    return (
        <div className='modal-container'>
            <div className='login'>
                <div className='exit'>
                    <img onClick={handleExit} src={Exit} alt='exit button' />
                </div>
                <p>Sign in to use feature</p>
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
                <p>New to Pixel Swap? <span onClick={handleSignup}>Sign Up here</span></p>
            </div>
        </div>
    )
}

export default SignIn