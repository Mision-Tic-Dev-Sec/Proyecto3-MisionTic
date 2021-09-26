function InfoVenta() {
  return <div>
    <form action="managerVenta" className = 'formulario'>
      <label htmlFor="">Valor total venta: </label>
      <input type="text" placeholder='Valor venta'/>
      <label htmlFor="">Fecha venta: </label>
      <input type="text" placeholder='AAAA/MM/DD HH:MM:SS'/>
      <label htmlFor="">Identificación cliente: </label>
      <input type="text" placeholder='Identificación del cliente'/>
      <label htmlFor="">Nombre cliente: </label>
      <input type="text" placeholder='Nombre del cliente'/>
      <label htmlFor="">Vendedor: </label>
      <input type="text" placeholder='Nombre del vendedor'/>
      <label htmlFor="">Agregar productos: </label>
      <table>
        <tr>
          <td>
            <select name="producto" id="producto">
              <option value="selectProducto">Seleccione producto:</option>
              <option value="selectProducto">010-Galletas</option>
              <option value="selectProducto">011-Chocolate</option>
            </select>
          </td>
          <td>
            <input type="text" placeholder='Cantidad' />
          </td>
          <td>
            $$
          </td>
          <td>
            <button className = 'botonEdit colorBotonEdit'>Agregar</button>
          </td>
        </tr><br />
        <tr className='colorEncabezado'>
          <td>Producto</td>
          <td>Cantidad</td>
          <td>Precio unitario</td>
          <td>Acciones</td>
        </tr>
        <tr>
          <td>
            010-Galletas
          </td>
          <td>30</td>
          <td>20.000</td>
          <td><button className= 'botonEdit botonDelete'>Eliminar</button></td>
        </tr>
      </table>
    </form>
    <div className='ContenedorBotonesGuardar'>
      <button className= 'botonEdit colorBotonEdit'>Guardar</button>
      <button className = 'botonEdit botonDelete'>Cancelar</button>
    </div>
  </div>;
}

export default InfoVenta;
