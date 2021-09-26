import React from 'react';
import {Link} from 'react-router-dom';

const AdministraVenta = () => {
  return <div>
    <div className ='administrarHeader'>
    <div className='buscar'>
      <select name="filtroVentas" id="filtroVentas">
        <option value="criterio">Filtrar por:</option>
        <option value="IdVenta">Id venta</option>
        <option value="documentoCliente">Documento cliente</option>
        <option value="nombreCliente">Nombre cliente</option>
      </select>
      <input placeholder="Busqueda" />
      <i className="fas fa-search button iconoBusqueda"></i>
    </div>
    <Link to ='/infoVenta'>
      <button className = 'botonRegistro'>Registrar venta</button>
    </Link>
    </div>
    <div className = 'contenedorTabla'>
      <table className = 'table'>
        <tr className='colorEncabezado'>
          <td align='center' className = 'td'>Id venta</td>
          <td align='center' className = 'td'>Valor total venta</td>
          <td align='center' className = 'td'>Identificador producto</td>
          <td align='center' className = 'td'>Cantidad</td>
          <td align='center' className = 'td'>Precio unitario producto</td>
          <td align='center' className = 'td'>Fecha venta</td>
          <td align='center' className = 'td'>Documento identificación</td>
          <td align='center' className = 'td'>Nombre cliente</td>
          <td align='center' className = 'td'>Vendedor</td>
          <td align='center' className = 'td'>Estado</td>
          <td align='center' className = 'td'>Acciones</td>
        </tr>
        <tr>
          <td align='center' className = 'td'>001</td>
          <td align='center' className = 'td'>500.000</td>
          <td align='center' className = 'td'>010-Gelletas <br />011-Chocolate</td>
          <td align='center' className = 'td'>5 <br /> 15</td>
          <td align='center' className = 'td'>2.500 <br /> 5.000</td>
          <td align='center' className = 'td'>20/09/2021 08:56:46</td>
          <td align='center' className = 'td'>123456789</td>
          <td align='center' className = 'td'>Martin Rojas</td>
          <td align='center' className = 'td'>Samuel Diez</td>
          <td align='center' className = 'td'>Entregado</td>
          <td align='center' className = 'td'><Link to = '/infoVenta'><button className ='botonEdit colorBotonEdit'>Actualizar</button></Link></td>
        </tr>
        <tr className ='tdColor'>
          <td align='center' className = 'td'>002</td>
          <td align='center' className = 'td'>56.000</td>
          <td align='center' className = 'td'>040-Jamón</td>
          <td align='center' className = 'td'>100</td>
          <td align='center' className = 'td'>15.000</td>
          <td align='center' className = 'td'>23/09/2021 14:00:56</td>
          <td align='center' className = 'td'>98765432</td>
          <td align='center' className = 'td'>Maria Estrada</td>
          <td align='center' className = 'td'>Rodrigo Sanchez</td>
          <td align='center' className = 'td'>Pendiente</td>
          <td align='center' className = 'td'><Link to = '/infoVenta'><button className ='botonEdit colorBotonEdit'>Actualizar</button></Link></td>
        </tr>
      </table>
    </div>
  </div>;
};

export default AdministraVenta;
