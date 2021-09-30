import AñadirProductos from "./AñadirProductos";


const DatosdeProductos = ({listaProductos}) =>  {
    

    return (
    <div>
    <input placeholder="Busqueda" />
    <i className="fas fa-search button iconoBusqueda "></i>
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
    </div>
    );
}

export default DatosdeProductos;