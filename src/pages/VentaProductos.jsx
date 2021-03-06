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
          {ventas.map((el) => {
            return (
              <tr key={nanoid()}>
                {el.productos.map((ele)=>{
                  return (
                    <tr key={nanoid()} className='flex'>
                      <td>{ele.precio}</td>
                      <td>
                        <CantidadProducto ele={ele} />
                      </td>
                      <td>{ele.nombreProducto}</td>
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

const CantidadProducto = ({ ele }) => {
  const [cantidad, setCantidad] = useState(ele.cantidad);

  useEffect(() => {
    const editVenta = async () => {
      await editarVenta(
        ele._id,
        { cantidad },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (ele.cantidad !== cantidad) {
      editVenta();
    }
  }, [cantidad, ele]);

  return (
      <input type="text" value={cantidad} onChange={(e)=>setCantidad(e.target.value)} />
  );
};

const EstadoUsuario = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? '');

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value='' disabled>
        Seleccione un estado
      </option>
      <option value='autorizado' className='text-green-500'>
        Autorizado
      </option>
      <option value='pendiente' className='text-yellow-500'>
        Pendiente
      </option>
      <option value='rechazado' className='text-red-500'>
        Rechazado
      </option>
    </select>
  );
};



export default VentaProductos;
