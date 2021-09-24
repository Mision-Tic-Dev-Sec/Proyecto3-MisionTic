import logo from 'media/logo.png';

const Header = () => {
  return (
    <header>
      <ul className='navbar'>
        <li>
          <img src={logo} alt='imagen' className='logo' />
        </li>
        <li>
          <button className='botonGenerico mainButton'>Administrar ventas</button>
        </li>
        <li>
          <button className='botonGenerico secondaryButton'>Estado ventas</button>
        </li>
        <li>
          <button className='botonGenerico secondaryButton'>Gestión vendedores</button>
        </li>
        <li>
          <button className='botonGenerico secondaryButton'>Gestión usuarios y roles</button>
        </li>
        <li>
          <button className='botonGenerico mainButton'>Salir</button>
        </li>
      </ul>
    </header>
  );
};

export default Header;