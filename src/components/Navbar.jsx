import React from 'react';
import { Link } from 'react-router-dom';
import ImagenLogo from 'components/ImagenLogo';

const Navbar = () => {
  return (
    <nav className='bg-purple-100'>
      <ul className='flex w-full justify-between my-3'>
        <li className = 'h-50'><ImagenLogo/></li>
        <li>
          <Link to='/admin/vehiculos'>
            <button className ='bg-blue-800 p-2 text-white rounded-lg shadow-md hover:bg-blue-900'>Administrar ventas</button>
          </Link>
        </li>
        <li>
          <button className ='bg-blue-800 p-2 text-white rounded-lg shadow-md hover:bg-blue-900'>Administrar productos</button>
        </li>
        <li>
          <button className ='bg-blue-800 p-2 text-white rounded-lg shadow-md hover:bg-blue-900'>Administrar roles</button>
        </li>
        <li className='px-3'>
          <Link to='/login'>
            <button className='bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
              Salir
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
