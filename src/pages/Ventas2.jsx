import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearVenta } from 'utils/api';
import { obtenerProductos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ventas2 = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosTabla, setProductosTabla] = useState([]);

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuarios(
        (response) => {
          console.log('respuesta de usuarios', response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchProductos = async () => {
      await obtenerProductos(
        (response) => {
          setProductos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchProductos();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log('form data', formData);

    const listaProductos = Object.keys(formData)
      .map((k) => {
        if (k.includes('producto')) {
          return productosTabla.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    console.log('lista antes de cantidad', listaProductos);

    Object.keys(formData).forEach((k) => {
      if (k.includes('cantidad')) {
        const indice = parseInt(k.split('_')[1]);
        listaProductos[indice]['cantidad'] = formData[k];
      }
    });

    console.log('lista despues de cantidad', listaProductos);

    const datosVenta = {
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0].name,
      cantidad: formData.cantidad,
      valorVenta: formData.valorVenta,      
      productos: listaProductos,
      idVenta: formData.idVenta,      
      fechaVenta: formData.fechaVenta,
      idCliente: formData.idCliente,
      nombreCliente: formData.nombreCliente,      
      estado: formData.estado,
    };

    console.log('lista productos', listaProductos);

    await crearVenta(
      datosVenta,
      (response) => {
        console.log(response);
        toast.success('Producto agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un producto');
      }
      
    );
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <form ref={form} onSubmit={submitForm} className='flex flex-col h-full'>
        <h1 className='text-3xl font-extrabold text-gray-900 my-3'>Crear una nueva venta</h1>
        <label className='flex flex-col' htmlFor='idVenta'>
          <span className='text-2xl font-gray-900 font-semibold'>Id venta</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            name='idVenta'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='fechaVenta'>
          <span className='text-2xl font-gray-900 font-semibold'>Fecha venta</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='datetime-local'
            name='fechaVenta'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='vendedor'>
          <span className='text-2xl font-gray-900 font-semibold'>Vendedor</span>
          <select name='vendedor' className='p-2 mb-2' defaultValue='' required>
            <option disabled value=''>
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return <option key={nanoid()} value={el._id}>{`${el.name}`}</option>;
            })}
          </select>
        </label>
        <span className='text-2xl font-gray-900 font-semibold'>Productos</span>

        <TablaProductos
          productos={productos}
          setProductos={setProductos}
          setProductosTabla={setProductosTabla}
        />

        <label className='flex flex-col' htmlFor='valorVenta'>
          <span className='text-2xl font-gray-900 font-semibold'>Valor Total Venta</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            name='valorVenta'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='idCliente'>
          <span className='text-2xl font-gray-900 font-semibold'>Id cliente</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            name='idCliente'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='nombreCliente'>
          <span className='text-2xl font-gray-900 font-semibold'>Cliente</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            name='nombreCliente'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='estado'>
          <span className='text-2xl font-gray-900 font-semibold'>Estado</span>
            <select
              className='p-2 mb-2'
              name='estado'
              required
              defaultValue=''
            >
              <option disabled value=''>
                Seleccione una opción
              </option>
              <option>En proceso</option>
              <option>Entregado</option>
              <option>Cancelado</option>
            </select>
        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Crear Venta
        </button>
        <ToastContainer position='bottom-center' autoClose={5000} />
      </form>
    </div>
  );
};

const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
  const [productoAAgregar, setProductoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    console.log(productoAAgregar);
  }, [productoAAgregar]);

  useEffect(() => {
    console.log('filasTabla', filasTabla);
    setProductosTabla(filasTabla);
  }, [filasTabla, setProductosTabla]);

  const agregarNuevoProducto = () => {
    setFilasTabla([...filasTabla, productoAAgregar]);
    setProductos(productos.filter((v) => v._id !== productoAAgregar._id));
    setProductoAAgregar({});
  };

  const eliminarProducto = (productoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== productoAEliminar._id));
    setProductos([...productos, productoAEliminar]);
  };

  return (
    <div>
      <div className='flex '>
        <label className='flex flex-col' htmlFor='producto'>
          <select
            className='p-2'
            value={productoAAgregar._id ?? ''}
            onChange={(e) =>
              setProductoAAgregar(productos.filter((v) => v._id === e.target.value)[0])
            }
          >
            <option disabled value=''>
              Seleccione un Producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.idProducto} ${el.nombreProducto} ${el.precio}`}</option>
              );
            })}
          </select>
        </label>
        <button
          type='button'
          onClick={() => agregarNuevoProducto()}
          className='col-span-2 bg-green-400 ml-4 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Agregar producto
        </button>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Id producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
            <th className='hidden'>Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <tr key={nanoid()}>
                <td>{el.idProducto}</td>
                <td>{el.nombreProducto}</td>
                <td>{el.precio}</td>
                <td>
                  <label htmlFor={`cantidad_${index}`}>
                    <input type='number' name={`cantidad_${index}`} />
                  </label>
                </td>
                <td>
                  <i
                    onClick={() => eliminarProducto(el)}
                    className='fas fa-trash text-red-500 cursor-pointer'
                  />
                </td>
                <input hidden defaultValue={el._id} name={`producto_${index}`} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas2;