function InfoVenta() {
  return <div>
    <h1 className="breadCrumb">Modulo de ventas  Información ventas</h1>
    <form action="managerVenta" className = 'formulario'>
      <div className="formulariodiv">
        <label htmlFor="">Valor total venta: </label>
        <input type="text" placeholder='Valor venta'/>
        <label htmlFor="">Estado venta: </label>
        <select name="estadoVenta" id="estadoVenta">
          <option value="selectEstado">Elija un estado</option>
          <option value="selectEstado">En proceso</option>
          <option value="selectEstado">Canacelada</option>
          <option value="selectEstado">Entregado</option>
        </select>
        <label htmlFor="">Fecha venta: </label>
        <input type="text" placeholder='AAAA/MM/DD HH:MM:SS'/>
      </div>
      <div className="formulariodiv">
        <label htmlFor="">Identificación cliente: </label>
        <input type="text" placeholder='Identificación del cliente'/>
        <label htmlFor="">Nombre cliente: </label>
        <input type="text" placeholder='Nombre del cliente'/>
        <label htmlFor="">Vendedor: </label>
        <input type="text" placeholder='Nombre del vendedor'/>
      </div>          
    </form>
    <label htmlFor="" className="etiquetaAgregarProductoInfo">Agregar productos: </label>
    <table className="table">
        <tr>
          <td>
            <select name="producto" id="producto">
              <option value="selectProducto">Elija un producto</option>
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
    <div className='ContenedorBotonesGuardar'>
      <button className= 'botonEdit colorBotonEdit'>Guardar</button>
      <button className = 'botonEdit botonDelete'>Cancelar</button>
    </div>
  </div>;
}

export default InfoVenta;
