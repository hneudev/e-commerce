import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services'



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
    }, [userObj])


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}  >
                <label htmlFor='email'>Email</label>
                <input id='email' placeholder='example@example.com' type='email' {...register('email')} />
                <label htmlFor='password'>Password</label>
                <input id='password' placeholder='Your password' type='password' {...register('password')} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Login