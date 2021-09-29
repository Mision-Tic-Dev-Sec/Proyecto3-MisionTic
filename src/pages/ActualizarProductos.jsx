
function ActualizarProductos() {
    return (
        <div className="App">
          <form className="formularioProductos">
            <div className="nombreProducto">
                <label for="nombre">Nombre del Producto</label>
                <input className="corto" type="text" id="nombre" name="Nombre del producto"/><br/>
            </div>   
            <div class="identificacionProducto">
                <label for="identificacion">Identificador del producto</label>
                <input className="corto" type="text" id="identificacion" name="Identificador del producto"/><br/>
            </div>
            <div class="descripcionProducto">
                <label for="descripción">Descripción del producto</label>
                <textarea className="largo" name="descripción" rows="7" cols="50"></textarea>
            </div> 
            <div class="actProducto">
                <button type="submit" align="center">Actualizar</button>
            </div>   
        </form>
      </div>
    );
}

export default ActualizarProductos;