import React from 'react'
import logo from 'media/logo.png'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='bg-gray-300 h-screen w-screen'>
            <form className='flex flex-col items-center bg-gray-300 py-32'>
               <img className='h-20' src={logo} alt="logo" />
               <label className='flex flex-col font-extrabold my-3' htmlFor="correo">
                    Ingresa el correo:
                    <input className='focus-within:outline-none focus:ring-2 border border-gray-400 rounded-md p-2'type="email" name="correo" placeholder='juan@www' required />   
                </label> 
                <label className='flex flex-col font-extrabold my-3' htmlFor="password">
                    Ingresa el password:
                    <input className='focus-within:outline-none focus:ring-2 border border-gray-400 rounded-md p-2'type="password" name="password" required />   
                </label>
                <Link to='/Index'>
                    <button className='bg-green-300 p-2 rounded-lg shadow-md transform hover:scale-125'>Ingresar</button>
                </Link> 
                <span>o</span>
                <Link to='/Index'>
                    <button className='bg-yellow-300 p-2 rounded-lg shadow-md transform hover:scale-125'>Ingresa con google</button>
                </Link>                
            </form>
        </div>
    )
}

export default Login
