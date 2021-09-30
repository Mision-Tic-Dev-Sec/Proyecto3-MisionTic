import React, { useEffect, useState }from "react";

const ActualizarProductos = () => {

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
        <div className="App">
          <form className="formularioProductos">
            <div className="nombreProducto">
                <label for="nombre">Nombre del Producto</label>
                <input onChange={(e) =>setNombreProducto(e.target.value)} className="corto" type="text" id="nombre" name="Nombre del producto"/><br/>
            </div>   
            <div class="identificacionProducto">
                <label for="identificacion">Identificador del producto</label>
                <input onChange={(e) =>setIdentificacionProducto(e.target.value)} className="corto" type="text" id="identificacion" name="Identificador del producto"/><br/>
            </div>
            <div class="descripcionProducto">
                <label for="descripción">Descripción del producto</label>
                <textarea onChange={(e) =>setDProducto(e.target.value)} className="largo" name="descripción" rows="7" cols="50"></textarea>
            </div> 
            <div class="actProducto">
                <button type="submit" align="center">Actualizar</button>
            </div>   
        </form>
      </div>
    );
}

export default ActualizarProductos;