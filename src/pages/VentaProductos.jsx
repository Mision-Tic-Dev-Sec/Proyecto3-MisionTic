import PrivateComponent from 'components/PrivateComponent';
import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { editarUsuario } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import { obtenerVentas, editarVenta} from 'utils/api'

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
      <div>admin usuarios</div>
    
      <table className='tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => {
            return (
              <tr key={nanoid()}>
                {venta.productos.map((producto, index)=>{
                  return (
                    <tr key={nanoid()} className='flex'>
                      <td>{producto.precio}</td>
                      <td>
                        <CantidadProducto index={index} venta={venta} producto={producto} />
                      </td>
                      <td>{producto.nombreProducto}</td>
                    </tr>
                  )})}                                
              </tr>
            );
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
        { producto : {cantidad} },
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
      <input type="text" value={cantidad} onChange={(e)=>setCantidad(e.target.value)} />
  );
};

export default VentaProductos;
