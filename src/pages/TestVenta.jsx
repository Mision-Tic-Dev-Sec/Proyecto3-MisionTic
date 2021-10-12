import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { crearVenta } from 'utils/api';
import { obtenerProductos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const TestVenta = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filasTabla, setFilasTabla] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState([]);

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

    const listaProductos = Object.keys(formData)
      .map((el) => {
        if (el.includes('producto')) {
          return filasTabla.filter((v) => v._id === formData[el])[0];
        } else return null;
      })
      .filter((v) => v);

    const infoConsolidada = {
      valor: formData.valor,
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      productos: listaProductos,
    };

    await crearVenta(
      infoConsolidada,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <form ref={form} onSubmit={submitForm} className='flex flex-col h-full'>
        <h1 className='text-3xl font-extrabold text-gray-900 my-3'>Crear una nueva venta</h1>
        <label className='flex flex-col' htmlFor='vendedor'>
          <span className='text-2xl font-gray-900'>Vendedor</span>
          <select
            name='vendedor'
            className='mx-2 p-2 border border-gray-400 rounded-lg focus:outline-none'
            defaultValue=''
            required
          >
            <option disabled value=''>
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return <option key={nanoid()} value={el._id}>{`${el.name} ${el.rol}`}</option>;
            })}
          </select>
        </label>

        <RepetidorTabla
          productos={productos}
          productoSeleccionado={productoSeleccionado}
          setProductoSeleccionado={setProductoSeleccionado}
          filasTabla={filasTabla}
          setFilasTabla={setFilasTabla}
          setProductos={setProductos}
        />

        <label className='flex flex-col'>
          <span className='text-2xl font-gray-900'>Valor Total Venta</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            name='valor'
            required
          />
        </label>
        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Crear Venta
        </button>
      </form>
    </div>
  );
};

const RepetidorTabla = ({
  productos,
  productoSeleccionado,
  setProductoSeleccionado,
  filasTabla,
  setFilasTabla,
  setProductos,
}) => {
  const agregarNuevoProducto = () => {
    setFilasTabla([...filasTabla, productoSeleccionado]);
    setProductos(productos.filter((el) => el !== productoSeleccionado));
    setProductoSeleccionado('');
  };

  const deleteFila = (v) => {
    setFilasTabla(filasTabla.filter((el) => el !== v));
    setProductos([...productos, v]);
  };
  return (
    <div className='my-4'>
      <span className='text-2xl font-gray-900'>Vehículos</span>
      <div className='flex'>
        <label className='flex flex-col m-2' htmlFor='producto'>
          <select
            className='p-2 border border-gray-400 rounded-lg focus:outline-none'
            value={productoSeleccionado._id ?? ''}
            onChange={(e) =>
              setProductoSeleccionado(productos.filter((v) => v._id === e.target.value)[0])
            }
          >
            <option disabled value=''>
              Seleccione un Producto
            </option>
            {productos
              .filter((el) => !filasTabla.includes(el._id))
              .map((el) => {
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
          onClick={() => {
            agregarNuevoProducto(productoSeleccionado);
          }}
          className='m-2  bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Agregar Vehículo
        </button>
      </div>
      <table className='tabla'>
        <thead>
          <tr>
            <th>Id Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((producto, index) => {
            return (
              <FilaProducto
                key={nanoid()}
                nombre={`producto_${index}`}
                productoSeleccionado={producto}
                deleteFila={deleteFila}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilaProducto = ({ nombre, productoSeleccionado, deleteFila }) => {
  return (
    <tr>
      <td>{productoSeleccionado.idProducto ?? ''}</td>
      <td>{productoSeleccionado.nombreProducto ?? ''}</td>
      <td>{productoSeleccionado.precio ?? ''}</td>
      <td>
        <i
          onClick={() => deleteFila(productoSeleccionado)}
          className='fas fa-minus cursor-pointer hover:text-red-500'
        />
      </td>
      <td className='hidden'>
        <input hidden defaultValue={productoSeleccionado._id} name={nombre} />
      </td>
    </tr>
  );
};

export default TestVenta;

