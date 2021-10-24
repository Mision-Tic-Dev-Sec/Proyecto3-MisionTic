import React, { useState, useEffect } from 'react';
import { obtenerVentas, editarVenta } from 'utils/api'
import { Tooltip } from '@material-ui/core';

const VentaProductos = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      await obtenerVentas(
        (respuesta) => {
          console.log('ventas', respuesta.data);
          setVentas(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchVentas();
  }, []);

  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>Productos venta</h1>

      <table className='tabla'>
        <thead>
          <tr>
            <th>idVenta</th>
            <th>Producto</th>
            <th>precio</th>
            <th>cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            return venta.productos.map((producto) => {
              return (
                <tr key={producto._id}>
                  <td>{venta.idVenta}</td>
                  <td>{producto.nombreProducto}</td>
                  <td>{producto.precio}</td>
                  <td>{producto.cantidad}</td>
                  <td>
                    <Tooltip title='Eliminar producto' arrow>
                      <i className='fas fa-trash text-red-700 hover:text-red-500' />
                    </Tooltip>
                  </td>
                </tr>
              )
            })
          })}
        </tbody>
      </table>
    </div>
  );
};

const CantidadProducto = ({ venta, producto, index }) => {
  const [cantidad, setCantidad] = useState(producto.cantidad);
  // const actualizarVenta = async (cantidad)=>{
  //   venta.productos[index].cantidad = cantidad
  //   await editarVenta (venta._id, venta)
  // }

  // useEffect(()=>{
  //     actualizarVenta(cantidad)
  // },[cantidad])
  useEffect(() => {
    const editVenta = async () => {
      await editarVenta(
        venta._id,
        { ...venta, productos: { [index]: { ...[index], cantidad: cantidad } } },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (producto.cantidad !== cantidad) {
      editVenta();
    }
  }, [cantidad, venta]);

  return (
    <input type="text" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
  );
};

export default VentaProductos;
