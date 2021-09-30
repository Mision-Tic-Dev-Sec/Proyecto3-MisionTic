import  { Link } from "react-router-dom";   

function GestionarProductos() {
    return <div>
          <ul className="navbar">      
              <li>
              <Link to="AñadirProductos"> 
              <button className="botonGenerico mainButton">Ingresar Producto</button>
              </Link>
              </li>
              <li>
              <Link to="DatosdeProductos"> 
              <button className="botonGenerico mainButton">Datos de Producto</button>
              </Link>
              </li>
              <li>
              <Link to="ActualizarProductos"> 
              <button className="botonGenerico mainButton">Actualizar Producto</button>
              </Link>
              </li>
          </ul>
    </div>;
  }
  
  export default GestionarProductos;
  