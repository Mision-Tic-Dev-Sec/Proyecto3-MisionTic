import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productos from 'pages/Productos';
// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no



const ventasBackend = [
  {
    idVenta: '001',
    valorVenta: 10000,
    idProducto: '001',
    cantidad: 2,
    precioUnitario: [2300, 3200, 4000],
    fechaVenta: '02/09/2021 12:00',
    identificacion: 12099384,
    nombreCliente: 'Juan Valdez',
    vendedor: 'Jhon Valencia',
    estado: 'En proceso'
  },
  {
    idVenta: '002',
    valorVenta: 100000,
    idProducto: '001',
    cantidad: 2,
    precioUnitario: 2300,
    fechaVenta: '02/09/2021 12:00',
    identificacion: 12099384,
    nombreCliente: 'Juan Valdez',
    vendedor: 'Jhon Valencia',
    estado: 'En proceso'
  }
];

const Ventas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [ventas, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nueva venta');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    //obtener lista de ventas desde el backend
    setVentas(ventasBackend);
  }, []);

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
        <TablaVentas listaVentas={ventas} />
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

const TablaVentas = ({ listaVentas }) => {
  useEffect(() => {
    console.log('este es el listado de Ventas en el componente de tabla', listaVentas);
  }, [listaVentas]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos las Ventas</h2>
      <div className="w-96 bg-white border border-gray-300 rounded-xl flex m-3 self-start py-2">
        <select required defaultValue={0} name="filtroVentas" className="focus-within:outline-none rounde-l px-2">
          <option disabled value={0}>Elija el filtro</option>
          <option>Id Venta</option>
          <option>Descripción</option>
          <option>Precio</option>
        </select>
        <input type="text" name="busquedaVentas" placeholder="Busqueda" className="focus-within:outline-none m-0 w-72"/>
        <button className="pr-2 transform hover:scale-125"><i class="fas fa-search"></i></button>
      </div>
      <table className = 'border border-gray-200'>
        <thead className = 'border border-gray-200'>
          <tr>
            <th align="center" className = 'p-2'>Id Ventas</th>
            <th align="center" className = 'p-2'>Valor Venta</th>
            <th align="center" className = 'p-2'>Id producto</th>
            <th align="center" className = 'p-2'>cantidad</th>
            <th align="center" className = 'p-2'>Precio unitario</th>
            <th align="center" className = 'p-2'>Fecha venta</th>
            <th align="center" className = 'p-2'>Identificacion cliente</th>
            <th align="center" className = 'p-2'>Nombre cliente</th>
            <th align="center" className = 'p-2'>Vendedor</th>
            <th align="center" className = 'p-2'>Estado</th>
            <th align="center" className = 'p-2'>Acciones</th>

          </tr>
        </thead>
        <tbody>
          {listaVentas.map((Venta) => {
            return (
              <tr>
                <td align="center" className = 'p-2'>{Venta.idVenta}</td>
                <td align="center" className = 'p-2'>{Venta.valorVenta}</td>
                <td align="center" className = 'p-2'>{Venta.idProducto}</td>
                <td align="center" className = 'p-2'>{Venta.cantidad}</td>
                <td align="center" className = 'p-2'>{Venta.precioUnitario}</td>
                <td align="center" className = 'p-2'>{Venta.fechaVenta}</td>
                <td align="center" className = 'p-2'>{Venta.identificacion}</td>
                <td align="center" className = 'p-2'>{Venta.nombreCliente}</td>
                <td align="center" className = 'p-2'>{Venta.vendedor}</td>
                <td align="center" className = 'p-2'>{Venta.estado}</td>
                <td align="center" className = 'p-2'><button className="bg-gray-300 p-1 hover:bg-gray-500 rounded-lg">Actualizar</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioCreacionVentas = ({ setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);

  const submitForm = (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    
    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    setMostrarTabla(true);
    setVentas([...listaVentas, nuevaVenta]);
    // identificar el caso de éxito y mostrar un toast de éxito
    toast.success('Venta agregada con éxito');
    // identificar el caso de error y mostrar un toast de error
    // toast.error('Error creando un vehículo');
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
              placeholder='Chocolate'
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
                placeholder='Carlos Medina'
                required
              />
            </label>
            <label className='flex flex-col' htmlFor='precioUnitario'>
              Precio
              <input
                name='precioUnitario'
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                type='text'
                placeholder='2000'
                required
              />
            </label>
            <label className='flex flex-col' htmlFor='cantidad'>
              Cantidad
              <input
                  name='cantidad'
                  className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                  type='text'
                  placeholder='Carlos Medina'
                  required
                />
            </label>
            <button className="bg-blue-600 hover:bg-blue-900 rounded-full p-2">Agregar</button>
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
