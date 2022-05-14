import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services'
import './Login.css';



const Login = () => {

    const {handleSubmit, register} = useForm( )
    const navigate = useNavigate()
    const [userObj, setUserObj] = useState({})

    const onSubmit = (data) => {
        console.log(data)
        setUserObj(data)
    }

    useEffect(() => {
        if(userObj.email){
            loginUser(userObj)
                .then((res) => {
                    localStorage.setItem("token", res.access)
                })
                .then(() => {
                    navigate('/shop')
                })
        }
    }, [userObj, navigate])


    return (
        <div className='carda'>
            <img src="https://images.unsplash.com/photo-1597177586824-33bda0c29325?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="purple jewel"  />
            <h2 className="Title">Adamantium Jewelry</h2>
            <h3 className="subtitle">Please login to enter</h3>
            <form onSubmit={handleSubmit(onSubmit)}  >

                <label htmlFor='email'>Email</label>
                <br />

                <input id='email' placeholder='example@example.com' type='email' {...register('email')} />
<br />
                <label htmlFor='password'>Password</label>

                <input id='password' placeholder='Your password' type='password' {...register('password')} />
<br />
                <input className="button" type='submit' />
                
            </form>
            <p>Already have an account? Log In</p>
        </div>
    )
}

export default Login