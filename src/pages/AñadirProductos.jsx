import React, { useEffect, useState }from "react";
    
const AñadirProductos = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true)
    const [TextoBoton, setTextoBoton] =useState("Añadir Producto")

    useEffect (()=>{
        if(mostrarTabla){
            setTextoBoton("Añadir Producto")
        } else {
            setTextoBoton("Mostrar todos los productos")
        }
    },[mostrarTabla]);
    return (
        <div>
            <button 
            onClick={()=>{setMostrarTabla(!mostrarTabla);}}className="añadirProducto">{TextoBoton}</button>
            {mostrarTabla ? <TablaProductos /> : <FormularioProductos />}
        </div>
    );
 }

const FormularioProductos = () =>{

    const [nombreProducto, setNombreProducto] = useState("")
    const [identificacionProducto, setIdentificacionProducto] = useState("")
    const [descripcionProducto, setDProducto] = useState("")

   useEffect(() => {
       console.log()

    }, []);

    useEffect(() => {
        console.log(nombreProducto)
        console.log(identificacionProducto)
        console.log(descripcionProducto)
    }, [nombreProducto, identificacionProducto, descripcionProducto])

    return (
        <div class="App">
          <form className="formularioProductos">
              <div className="nombreProducto">
                  <label for="nombre">Nombre del Producto</label>
                  <input onChange={(e) =>setNombreProducto(e.target.value)} className="corto" type="text" id="nombre" name="Nombre del producto"/><br/>
              </div>   
              <div className="identificacionProducto">
                  <label for="identificacion">Identificador del producto</label>
                  <input onChange={(e) =>setIdentificacionProducto(e.target.value)} className="corto" type="text" id="identificacion" name="Identificador del producto"/><br/>
              </div>
              <div class="descripcionProducto">
                  <label for="descripción">Descripción del producto</label>
                  <textarea onChange={(e) =>setDProducto(e.target.value)} className="largo" name="descripción" rows="7" cols="50"></textarea>
              </div> 
              <div className="añadirProducto">
                  <button type="submit">Añadir</button>
              </div>  
          </form>
      </div>
    );
};

const TablaProductos = () =>{
    return(<div>
        <table className="tablaProductos">
            <caption>Datos del producto</caption>
            <tr>
                <td>Nombre del Producto</td>
                <td>*Aqui va el nombre del Producto</td>
            </tr>
            <tr>
                <td>identificacion del Producto</td>
                <td>*Aqui va la identificación del Producto</td>
            </tr>
            <tr>
                <td>Descripción del Producto</td>
                <td>*Aqui va la descripción del Producto</td>
            </tr>
            <tr>
                <td>Imagen del Producto</td>
                <td>*Aqui va la imagen del Producto</td>
            </tr>
            </table>    
    </div>)
}

export default AñadirProductos;
