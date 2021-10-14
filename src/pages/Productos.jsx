import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerProductos, crearProductos, editarProducto, eliminarProducto } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const Productos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo producto');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      await obtenerProductos(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setProductos(response.data);
          setEjecutarConsulta(false);
          setLoading(false);
        },
        (error) => {
          console.error('Salio un error:', error);
          setLoading(false);
        }
      );
    };
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      fetchProductos();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla){
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo producto');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los productos');
      setColorBoton('blue');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de productos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-3 rounded-lg m-3 w-48 self-center`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos 
          loading={loading} 
          listaProductos={productos} 
          setEjecutarConsulta={setEjecutarConsulta} 
        />
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ loading, listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    setProductosFiltrados(
      listaProductos.filter((elemento)=> {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className='flex flex-col items-center justify-center w-4/5'>      
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los productos</h2>
      <div className="w-96 bg-white border border-gray-300 rounded-xl flex m-3 self-start py-2 justify-between">
        <input 
        value={busqueda} 
        onChange={(e) => setBusqueda(e.target.value)} 
        placeholder="Busqueda" 
        className="focus-within:outline-none m-0 w-72 pl-2"/>
        <div className="pr-2"><i class="fas fa-search"></i></div>
      </div>
      <div className='hidden md:flex w-full'>
      {loading ? (
          <ReactLoading type='spokes' color='#4338CA' height={667} width={375} />
        ) : (
        <table className='tabla'>
          <thead>
            <tr>
              <th>Id del producto</th>
              <th>Nombre del producto</th>
              <th>Precio del producto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => {
              return (
                <FilaProducto
                  key={nanoid()}
                  producto={producto}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      )}
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {productosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.idProducto}</span>
              <span>{el.nombreProducto}</span>
              <span>{el.precio}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    idProducto: producto.idProducto,
    nombreProducto: producto.nombreProducto,
    precio: producto.precio,
  });

  const actualizarProducto = async () => {
    //enviar la info al backend
    
    await editarProducto(
      producto._id,
      {
        idProducto: infoNuevoProducto.idProducto,
        nombreProducto: infoNuevoProducto.nombreProducto,
        precio: infoNuevoProducto.precio,
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el vehículo');
        console.error(error);
      }
    );
  };

  const deleteProduct = async () => {
    await eliminarProducto(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success('Producto eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el producto');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            {infoNuevoProducto.idProducto}
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.nombreProducto}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, nombreProducto: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.precio}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, precio: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{producto.idProducto}</td>
          <td>{producto.nombreProducto}</td>
          <td>{producto.precio}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarProducto()}
                  className='fas fa-check text-green-700 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancelar edición' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar producto' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar producto' arrow>
                <i
                  onClick={() => setOpenDialog(true)}
                  className='fas fa-trash text-red-700 hover:text-red-500'
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              ¿Está seguro de querer eliminar el producto?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteProduct()}
                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

const FormularioCreacionProductos = ({ setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = async(e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });    

    await crearProductos(
      {
        idProducto: nuevoProducto.idProducto,
        nombreProducto: nuevoProducto.nombreProducto,
        precio: nuevoProducto.precio,
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un producto');
      }
    );

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='idProducto'>
          Id del producto
          <input
            name='idProducto'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='001'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='nombreProducto'>
          Descripción del producto
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Chocolate'
            name='nombreProducto'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='precio'>
          Precio del producto
          <input
            name='precio'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={50}
            placeholder='15000'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-blue-600 p-2 rounded-full shadow-md transform hover:scale-110 text-white'
        >
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default Productos;
