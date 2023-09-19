import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import Exit from '../Assets/Exit.png'
const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();

const handleExit = () => {
    navigate(-1)
}


const OnSubmit = async (data) => {
    console.log(data)
    await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const userDetails = userCredential.user;
            setUser(userDetails)
            if (logged) {
                navigate(-1)
            }
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });

}

const SignUp = () => {
    return (
        <div>
            <div>
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
            <p>Already have an account? <span onClick={handleSignup}>Sign In here</span></p>
        </div>
    )
}

export default SignUp