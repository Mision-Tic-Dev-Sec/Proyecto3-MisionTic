import React, { useEffect, useState }from "react";
    
const AñadirProductos = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true)
    const [TextoBoton, setTextoBoton] =useState("Actualizar Producto")
    const [Producto, setProducto] = useState([])

    useEffect (()=>{
        if(mostrarTabla){
            setTextoBoton("Actualizar Producto")
        } else {
            setTextoBoton("Mostrar todos los productos")
        }
    },[mostrarTabla]);
    return (
        <div>
            <button 
            onClick={()=>{setMostrarTabla(!mostrarTabla);}}className="añadirProducto">{TextoBoton}</button>
            {mostrarTabla ? <TablaProductos listaProductos={Producto} /> : <FormularioProductos set />}
        </div>
    );
 }

const FormularioProductos = () =>{

    const [nombreProducto, setNombreProducto] = useState("")
    const [identificacionProducto, setIdentificacionProducto] = useState("")
    const [descripcionProducto, setDProducto] = useState("")

    const enviarAlBackend = () => {}
    
    return (
        <div class="App">
          <form className="formularioProductos">
              <div className="nombreProducto">
                  <label for="nombre">Nombre del Producto</label>
                  <input 
                  value={nombreProducto}
                  onChange={(e) =>setNombreProducto(e.target.value)} 
                  className="corto" type="text" 
                  id="nombre" 
                  name="Nombre del producto"/><br/>
                  
              </div>   
              <div className="identificacionProducto">
                  <label for="identificacion">Identificador del producto</label>
                  <input 
                  value={identificacionProducto}
                  onChange={(e) =>setIdentificacionProducto(e.target.value)} 
                  className="corto" 
                  type="text"
                  id="identificacion"
                  name="Identificador del producto"/><br/>
                  
              </div>
              <div class="descripcionProducto">
                  <label for="descripción">Descripción del producto</label>
                  <textarea
                  value={descripcionProducto}
                  onChange={(e) =>setDProducto(e.target.value)}  
                  className="largo" 
                  name="descripción" 
                  rows="7" 
                  cols="50"></textarea>
                  

                  
              </div> 
              <div className="añadirProducto">
                  <button onClick={() =>{
                      enviarAlBackend();
                  }} type="submit">Actualizar</button>
              </div>  
          </form>
      </div>
    );
};

const TablaProductos = ({listaProductos}) =>{
    useEffect(() => {
        console.log(listaProductos)
    },[listaProductos]);

    return (<div>
        <table className="tablaProductos">
        <caption>Datos del producto</caption>
        <thead>
            <tr>
                <th>Nombre del producto</th>
                <th>identificador del producto</th>
                <th>descripcionProducto</th>
            </tr>
        </thead> 
        <tbody>
        {listaProductos.map((Producto)=>{
            return(
            <tr>
                <td>{Producto.nombreProducto}</td>
                <td>{Producto.identificacionProducto}</td>
                <td>{Producto.descripcionProducto}</td>
            </tr>

            );
        })}
        </tbody>
        </table>    
    </div>)
}

export default AñadirProductos;
