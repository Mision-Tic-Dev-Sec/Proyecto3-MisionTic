import React from 'react';
import { Link } from 'react-router-dom';
import ImagenLogo from 'components/ImagenLogo';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, logout } = useAuth0();
  
  const cerrarSesion = ()=> {
    logout({ returnTo: 'http://localhost:3000/inicio' })
    localStorage.setItem('token',null)
  }
  return (
    <nav className='bg-purple-100'>
      <ul className='flex w-full justify-between my-3 items-center'>
        <Link to='/inicio'>
          <li className = 'h-50'>            
            <ImagenLogo/>
            <span className='pl-6'>{`Hola, ${user.name}`}</span>                     
          </li>
        </Link>
        <li>
          <Link to='/ventas'>
            <button className ='bg-blue-800 p-2 text-white rounded-lg shadow-md hover:bg-blue-900'>Administrar ventas</button>
          </Link>
        </li>
        <li>
          <Link to ='/productos'>
            <button className ='bg-blue-800 p-2 text-white rounded-lg shadow-md hover:bg-blue-900'>Administrar productos</button>
          </Link>
        </li>
        <li>
          <Link to= '/usuarios'>
            <button className ='bg-blue-800 p-2 text-white rounded-lg shadow-md hover:bg-blue-900'>Administrar usuarios</button>
          </Link>
        </li>
        <li className='px-3'>         
            <button className='bg-indigo-500 p-2 px-5 text-white rounded-lg shadow-md hover:bg-indigo-700'
            onClick={() => cerrarSesion()}>
              Salir
            </button>          
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
