import logo from 'media/logo.png';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <ul className='navbar'>
        <li>
          <img src={logo} alt='imagen' className='logo' />
        </li>
        <li>
          <Link to = '/administraVenta'>
            <button className='botonGenerico mainButton'>Administrar ventas</button>
          </Link>
        </li>
        <li>
          <Link to = "/GestionarProductos">
          <button className='botonGenerico mainButton'>Administrar productos</button>
          </Link>
        </li>
        <li>
          <Link to = '/administraRoles'>
            <button className='botonGenerico mainButton'>Gestión usuarios y roles</button>
          </Link>
        </li>        
        <li>
          <Link to='/'>
            <button className='botonGenerico secondaryButton'>Salir</button>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;