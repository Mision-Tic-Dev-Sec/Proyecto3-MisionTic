import { Link } from "react-router-dom";

function AñadirProductos() {
    return (
        <div class="App">
          <form className="formularioProductos">
              <div className="nombreProducto">
                  <label for="nombre">Nombre del Producto</label>
                  <input className="corto" type="text" id="nombre" name="Nombre del producto"/><br/>
              </div>   
              <div className="identificacionProducto">
                  <label for="identificacion">Identificador del producto</label>
                  <input className="corto" type="text" id="identificacion" name="Identificador del producto"/><br/>
              </div>
              <div class="descripcionProducto">
                  <label for="descripción">Descripción del producto</label>
                  <textarea className="largo" name="descripción" rows="7" cols="50"></textarea>
              </div> 
              <div className="añadirProducto">
                  <button type="submit">Añadir</button>
              </div>
          </form>
      </div>
    );
}

export default AñadirProductos;