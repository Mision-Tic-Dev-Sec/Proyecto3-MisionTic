import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { obtenerVentas, crearVenta, editarVenta, eliminarVenta } from 'utils/api';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import ReactLoading from 'react-loading';
// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nueva venta');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading,setLoading] = useState(false);

  // useEffect(()=>{
  //   console.log('consulta', ejecutarConsulta);
  //   if (ejecutarConsulta) {
  //     obtenerVentas(
  //       (response) => {
  //         console.log('la respuesta que se recibio fue', response);
  //         setVentas(response.data);
  //         setEjecutarConsulta(false);
  //       },
  //       (error) => {
  //         console.error('Salio un error:', error);
  //       }
  //     );
      
  //   }
  // }, [ejecutarConsulta]);

  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true);
      await obtenerVentas(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setVentas(response.data);
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
      fetchVentas();
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
      setTextoBoton('Crear Nueva Venta');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos las Ventas');
      setColorBoton('blue');
    }
  }, [mostrarTabla]);
  
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de Ventas
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
        <TablaVentas listaVentas={ventas} setEjecutarConsulta={setEjecutarConsulta} loading={loading}  />
      ) : (
        <FormularioCreacionVentas
          setMostrarTabla={setMostrarTabla}
          listaVentas={ventas}
          setVentas={setVentas}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaVentas = ({ loading, listaVentas, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [ventasFiltradas, setVentasFiltradas] = useState(listaVentas);

  useEffect(() => {
    setVentasFiltradas(
      listaVentas.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVentas]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos las Ventas</h2>
      <div className="w-96 bg-white border border-gray-300 rounded-xl flex m-3 self-start py-2 justify-between">
        <input 
        value={busqueda} 
        onChange={(e) => setBusqueda(e.target.value)} 
        placeholder="Busqueda" 
        className="focus-within:outline-none m-0 w-72 pl-2"/>
        <div className="pr-2"><i class="fas fa-search"></i></div>
      </div>
      {loading ? (
          <ReactLoading type='Spokes' color='#4338CA' height={667} width={375} />
        ) : (
      <table className = 'tabla'>
        <thead>
          <tr>
            <th>Id Ventas</th>
            <th>Valor Venta</th>
            <th>Id producto</th>
            <th>cantidad</th>
            <th>Precio unitario</th>
            <th>Fecha venta</th>
            <th>Identificacion cliente</th>
            <th>Nombre cliente</th>
            <th>Vendedor</th>
            <th>Estado</th>
            <th>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.map((venta) => {
            return (
                <FilaVentas
                  key={nanoid()}
                  venta={venta}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
            );
          })}
        </tbody>
      </table>
      )}
    </div>
  );
};

const FilaVentas = ({ venta, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
    idVenta: venta.idVenta,
    valorVenta: venta.valorVenta,
    idProductos: venta.productos.map((el)=>el.idProducto),
    cantidad: venta.productos.map((el)=>el.cantidad),
    precioUnitario: venta.productos.map((el)=>el.precio),
    fechaVenta: venta.fechaVenta,
    idCliente: venta.idCliente,
    nombreCliente: venta.nombreCliente,
    vendedor: venta.vendedor,
    estado: venta.estado
  });

  const actualizarVenta = async () => {
    //enviar la info al backend
    await editarVenta(
      venta._id,
      {
        idVenta: infoNuevaVenta.idVenta,
        valorVenta: infoNuevaVenta.valorVenta,
        idProductos: infoNuevaVenta.idProductos,
        cantidad: infoNuevaVenta.cantidad,
        precioUnitario: infoNuevaVenta.precioUnitario,
        fechaVenta: infoNuevaVenta.fechaVenta,
        idCliente: infoNuevaVenta.idCliente,
        nombreCliente: infoNuevaVenta.nombreCliente,
        vendedor: infoNuevaVenta.vendedor,
        estado: infoNuevaVenta.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success('Venta modificada con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el venta');
        console.error(error);
      }
    );
  };

  const deleteVenta = async () => {    
    await eliminarVenta(
      venta._id,
      (response) => {
        console.log(response.data);
        toast.success('Venta eliminada con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando venta');
      }
    );
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>
            {venta.idVenta}
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.valorVenta}
              onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, valorVenta: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.idProductos}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, idProductos: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.cantidad}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, cantidad: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.precioUnitario}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, precioUnitario: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.fechaVenta}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, fechaVenta: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.idCliente}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, idCliente: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.nombreCliente}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, nombreCliente: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.vendedor}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, vendedor: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.estado}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, estado: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{venta.idVenta}</td>
          <td>{venta.valorVenta}</td>
          <td><div className = 'flex flex-col'>{venta.productos.map((el)=> <td>{el.idProducto} - {el.nombreProducto}</td>)}</div> </td>
          <td><div className = 'flex flex-col'>{venta.productos.map((el)=> <td>{el.cantidad}</td>)}</div> </td>
          <td><div className = 'flex flex-col'>{venta.productos.map((el)=> <td>{el.precio}</td>)}</div> </td>
          {/* <td>{venta.productos.map((el)=>`|${el.cantidad}| `)}</td>
          <td>{venta.productos.map((el)=>`|${el.precio}| `)} <br/></td> */}
          <td>{venta.fechaVenta}</td>
          <td>{venta.idCliente}</td>
          <td>{venta.nombreCliente}</td>
          <td>{venta.vendedor}</td>
          <td>{venta.estado}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarVenta()}
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
              <Tooltip title='Editar venta' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar venta' arrow>
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
              ¿Está seguro de querer eliminar la venta?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteVenta()}
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


const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    
    await crearVenta(
      {
        idVenta: nuevaVenta.idVenta,
        valorVenta: nuevaVenta.valorVenta,
        idProductos: nuevaVenta.idProductos,
        cantidad: nuevaVenta.cantidad,
        precioUnitario: nuevaVenta.precioUnitario,
        fechaVenta: nuevaVenta.fechaVenta,
        idCliente: nuevaVenta.idCliente,
        nombreCliente: nuevaVenta.nombreCliente,
        vendedor: nuevaVenta.vendedor,
        estado: nuevaVenta.estado,
      },
      (response) => {
        console.log(response.data);
        toast.success('Venta agregada con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un venta');
      }
    );

    setMostrarTabla(true);

  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nueva venta</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <div className='grid grid-cols-2'>
          <label className='flex flex-col' htmlFor='idVenta'>
            Id Venta
            <input
              name='idVenta'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              placeholder='001'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='valorVenta'>
            Valor Venta
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='number'
              placeholder='1000000'
              name='valorVenta'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='fechaVenta'>
            Fecha de venta
            <input
              name='fechaVenta'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='datetime-local'
              placeholder='002'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='identificacion'>
            Identificacion cliente
            <input
              name='identificacion'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              placeholder='1231546'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='nombreCliente'>
            Nombre del cliente
            <input
              name='nombreCliente'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              placeholder='Juan Perez'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='vendedor'>
            Vendedor
            <input
              name='vendedor'
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              placeholder='Carlos Medina'
              required
            />
          </label>
          <label className='flex flex-col' htmlFor='estado'>
            Estado
            <select
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              name='estado'
              required
              defaultValue={0}
            >
              <option disabled value={0}>
                Seleccione una opción
              </option>
              <option>En proceso</option>
              <option>Entregado</option>
              <option>Cancelado</option>
            </select>
          </label>
        </div>
        <h2 className="mt-6 font-bold text-gray-900">Agregar productos:</h2>
        <div className="flex justify-between">          
          <label className='flex flex-col' htmlFor='idProducto'>
              Id del producto
              <select
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                name='idProducto'
                required
                defaultValue={0}
              >
                <option disabled value={0}>
                  Seleccione una opción
                </option>
                <option>1</option>
                <option>{}</option>
                <option>{}</option>
              </select>
            </label>
            <label className='flex flex-col' htmlFor='nombreProducto'>
            Nombre del producto
            <input
                name='nombreProducto'
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                type='text'
                placeholder='Chocolate'
                required
              />
            </label>
            <label className='flex flex-col' htmlFor='precioUnitario'>
              Precio
              <input
                name='precioUnitario'
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                type='number'
                placeholder='2000'
                required
              />
            </label>
            <label className='flex flex-col' htmlFor='cantidad'>
              Cantidad
              <input
                  name='cantidad'
                  className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                  type='number'
                  placeholder='10'
                  required
                />
            </label>
            <button type="button" className="bg-blue-600 hover:bg-blue-900 rounded-full p-2">Agregar</button>
        </div>
        <div className='self-center w-full'>          
          <table className = 'border border-gray-200 m-3 w-full'>
            <thead className = 'border border-gray-200'>
              <tr>
                <th align="center" className = 'p-2'>Id producto</th>
                <th align="center" className = 'p-2'>Nombre producto</th>
                <th align="center" className = 'p-2'>Precio</th>
                <th align="center" className = 'p-2'>Cantidad</th>
                <th align="center" className = 'p-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td align="center" className = 'p-2'>001</td>
                <td align="center" className = 'p-2'>Chocolate</td>
                <td align="center" className = 'p-2'>100000</td>
                <td align="center" className = 'p-2'>2</td>
                <td align="center" className = 'p-2'><button className="bg-gray-300 p-1 hover:bg-gray-500 rounded-lg">Eliminar</button></td>
              </tr>
            </tbody>
          </table>
        </div>
 

        <button
          type='submit'
          className='col-span-2 bg-blue-600 p-2 rounded-full shadow-md transform hover:scale-110 text-white mb-3'
        >
          Guardar Venta
        </button>
      </form>
    </div>
  );
};

export default Ventas;
