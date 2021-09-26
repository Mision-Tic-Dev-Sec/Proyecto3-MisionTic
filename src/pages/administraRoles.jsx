import React from 'react';
import {Link} from 'react-router-dom';

const AdministraRoles = () => {
  return <div>
    <div className ='administrarHeader'>
      <div className='buscar'>
        <select name="filtroRoles" id="filtroRoles">
          <option value="criterio">Filtrar por:</option>
          <option value="Usuario">Usuario</option>
          <option value="Roles">Roles</option>
          <option value="Estado">Estado</option>                
        </select>
        <input placeholder="Busqueda" />
        <i className="fas fa-search button iconoBusqueda"></i>
      </div>  
    </div>
    <div className = 'contenedorTabla'>
      <table className = 'table'>
        <tr className='colorEncabezado'>
          <td align='center' className = 'td'>Id usuario</td>
          <td align='center' className = 'td'>Nombre</td>
          <td align='center' className = 'td'>No. documento</td>
          <td align='center' className = 'td'>Rol</td>
          <td align='center' className = 'td'>Correo electronico</td>
          <td align='center' className = 'td'>Estado</td>
          <td align='center' className = 'td'>Fecha ingreso</td>
          <td align='center' className = 'td'>Acciones</td>          
        </tr>
        <tr>
          <td align='center' className = 'td'>001</td>
          <td align='center' className = 'td'>Juan Restrepo</td>
          <td align='center' className = 'td'>1054990567</td>
          <td align='center' className = 'td'>Administrador</td>
          <td align='center' className = 'td'>juanr@outlook.com</td>
          <td align='center' className = 'td'>Autorizado</td>
          <td align='center' className = 'td'>12/01/2020 08:11</td>          
          <td align='center' className = 'td'><Link to = '/actualizarRoles'><button className ='botonEdit colorBotonEdit'>Actualizar</button></Link></td>
        </tr>
        <tr className ='tdColor'>
        <td align='center' className = 'td'>002</td>
          <td align='center' className = 'td'>Camilo Robles</td>
          <td align='center' className = 'td'>1054994567</td>
          <td align='center' className = 'td'>Vendedor</td>
          <td align='center' className = 'td'>camiloc@outlook.com</td>
          <td align='center' className = 'td'>No autorizado</td>
          <td align='center' className = 'td'>12/01/2020 08:15</td>            
          <td align='center' className = 'td'><Link to = '/actualizarRoles'><button className ='botonEdit colorBotonEdit'>Actualizar</button></Link></td>
        </tr>
      </table>
    </div>
  </div>;
};

export default AdministraRoles;