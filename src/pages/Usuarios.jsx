import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const usuariosBackend = [
  {
    idUsuario: '001',
    nombreUsuario: 'Raul Gonzales',
    correo: 'raul@gmail.com',
    rol: 'administrador',
    estado: 'autorizado',
    fechaIngreso: '12/01/2021 18:00'
  },
  {
    idUsuario: '002',
    nombreUsuario: 'Manuel Moncada',
    correo: 'manuel@gmail.com',
    rol: 'vendedor',
    estado: 'pendiente',
    fechaIngreso: '24/02/2021 14:00'
  },
  {
    idUsuario: '001',
    nombreUsuario: 'Juana Perez',
    correo: 'Juana@gmail.com',
    rol: 'vendedor',
    estado: 'no autorizado',
    fechaIngreso: '24/05/2020 08:00'
  }, 
];

const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    setUsuarios(usuariosBackend);
  }, []);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Modificar permisos');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los Usuarios');
      setColorBoton('blue');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de Usuarios
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
        <TablaUsuarios listaUsuarios={usuarios} />
      ) : (
        <ModificarPermisos
          setMostrarTabla={setMostrarTabla}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={2000} />
    </div>
  );
};

const TablaUsuarios = ({ listaUsuarios }) => {
  useEffect(() => {
    console.log('este es el listado de Usuarios en el componente de tabla', listaUsuarios);
  }, [listaUsuarios]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Usuarios</h2>
      <div className="w-96 bg-white border border-gray-300 rounded-xl flex m-3 self-start py-2">
        <select required defaultValue={0} name="filtroUsuarios" className="focus-within:outline-none rounde-l px-2">
          <option disabled value={0}>Elija el filtro</option>
          <option>Id Usuario</option>
          <option>Descripción</option>
          <option>Precio</option>
        </select>
        <input type="text" name="busquedaUsuarios" placeholder="Busqueda" className="focus-within:outline-none m-0 w-72"/>
        <button className="pr-2 transform hover:scale-125"><i class="fas fa-search"></i></button>
      </div>
      <table className = 'border border-gray-200'>
        <thead className = 'border border-gray-200'>
          <tr>
            <th align="center" className = 'p-2'>Id del Usuario</th>
            <th align="center" className = 'p-2'>Nombre Usuario</th>
            <th align="center" className = 'p-2'>Correo</th>
            <th align="center" className = 'p-2'>Rol</th>
            <th align="center" className = 'p-2'>Estado</th>
            <th align="center" className = 'p-2'>Fecha Ingreso</th>
            <th align="center" className = 'p-2'>Acciones</th>            
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((usuario) => {
            return (
              <tr>
                <td align="center" className = 'p-2'>{usuario.idUsuario}</td>
                <td align="center" className = 'p-2'>{usuario.nombreUsuario}</td>
                <td align="center" className = 'p-2'>{usuario.correo}</td>
                <td align="center" className = 'p-2'>                  
                      <select
                        className='bg-white border border-gray-600 p-2 rounded-lg m-2 focus-within:outline-none border-none'
                        name='rol'
                        required
                        defaultValue={0}
                      >
                        <option disabled value={0}>
                          {usuario.rol}
                        </option>
                        <option>Administrador</option>
                        <option>Vendedor</option>
                      </select>                  
                </td>
                <td align="center" className = 'p-2'>
                  
                      <select
                        className='bg-white border border-gray-600 p-2 rounded-lg m-2 focus-within:outline-none border-none'
                        name='estado'
                        required
                        defaultValue={0}
                      >
                        <option disabled value={0}>
                          {usuario.estado}
                        </option>
                        <option>Autorizado</option>
                        <option>No autorizado</option>
                        <option>Pendiente</option>
                      </select>
                  
                </td>
                <td align="center" className = 'p-2'>{usuario.fechaIngreso}</td>
                <td align="center" className = 'p-2'>
                  <button className="bg-gray-300 p-1 hover:bg-gray-500 rounded-lg"
                    onClick={()=>{toast.success('Registro exitoso')}}>Actualizar</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ModificarPermisos = ({  }) => {
  
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='text-2xl font-extrabold text-gray-800 my-4'>Permisos roles</h2>
      <table className = 'border border-gray-200 w-2/5'>
        <thead className = 'border border-gray-200'>
          <tr>
            <th align="center" className = 'p-2'>Permisos</th>
            <th align="center" className = 'p-2'>Administrador</th>
            <th align="center" className = 'p-2'>Vendedor</th>            
          </tr>
        </thead>
        <tbody>         
        <tr>
                    <td align='center' className = 'td'>Accesos a modulo de ventas</td>
                    <td align='center' className = 'td'><input type="checkbox" name="accesosModuloVentaAdmin" id="accesosModuloVentaAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="accesosModuloVentaVend" id="accesosModuloVentaVend" /></td>                
                </tr>
                <tr>
                    <td align='center' className = 'td'>Registrar venta</td>
                    <td align='center' className = 'td'><input type="checkbox" name="registrarVentaAdmin" id="registrarVentaAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="registrarVentaVend" id="registrarVentaVend" /></td>
                </tr>
                <tr>
                    <td align='center' className = 'td'>Actualizar venta</td>
                    <td align='center' className = 'td'><input type="checkbox" name="actualizarVentaAdmin" id="actualizarVentaAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="actualizarVentaVend" id="actualizarVentaVend" /></td>
                </tr>                
                <tr>
                    <td align='center' className = 'td'>Accesos a modulo de productos</td>
                    <td align='center' className = 'td'><input type="checkbox" name="accesosModuloProductosAdmin" id="accesosModuloProductosAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="accesosModuloProductosVend" id="accesosModuloProductosVend" /></td>                
                </tr>
                <tr>
                    <td align='center' className = 'td'>Registrar Productos</td>
                    <td align='center' className = 'td'><input type="checkbox" name="registrarProductosAdmin" id="registrarProductosAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="registrarProductosVend" id="registrarProductosVend" /></td>
                </tr>
                <tr>
                    <td align='center' className = 'td'>Actualizar Productos</td>
                    <td align='center' className = 'td'><input type="checkbox" name="actualizarProductosAdmin" id="actualizarProductosAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="actualizarProductosVend" id="actualizarProductosVend" /></td>
                </tr>
                <tr>
                    <td align='center' className = 'td'>Accesos a modulo de usuarios</td>
                    <td align='center' className = 'td'><input type="checkbox" name="accesosModuloUsuariosAdmin" id="accesosModuloUsuariosAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="accesosModuloUsuariosVend" id="accesosModuloUsuariosVend" /></td>                
                </tr>                
                <tr>
                    <td align='center' className = 'td'>Actualizar Usuarios</td>
                    <td align='center' className = 'td'><input type="checkbox" name="actualizarUsuariosAdmin" id="actualizarUsuariosAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="actualizarUsuariosVend" id="actualizarUsuariosVend" /></td>
                </tr>
                <tr>
                    <td align='center' className = 'td'>Modificar permisos</td>
                    <td align='center' className = 'td'><input type="checkbox" name="modificarpermisosAdmin" id="modificarpermisosAdmin" /></td>
                    <td align='center' className = 'td'><input type="checkbox" name="modificarpermisosVend" id="modificarpermisosVend" /></td>
                </tr>                          
        </tbody>
      </table>
      <button
          className='bg-blue-600 px-6 py-2 rounded-full shadow-md transform hover:scale-110 text-white my-3'
          onClick={()=>{toast.success('Registro exitoso')}}
        >
          Guardar
      </button>
    </div>
  );
};

export default Usuarios;
