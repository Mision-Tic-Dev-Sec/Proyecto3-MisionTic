import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerUsuarios, eliminarUsuario, editarUsuario } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
// realizar un formulario que le pida al usuario su edad y muestre un mensaje
// que diga si el usuario es mayor de edad o no

const Usuarios = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading,setLoading] = useState(false);

  // useEffect(() => {
  //   console.log('consulta', ejecutarConsulta);
  //   if (ejecutarConsulta) {
  //     obtenerUsuarios(
  //       (response) => {
  //         console.log('la respuesta que se recibio fue', response);
  //         setUsuarios(response.data);
  //         setEjecutarConsulta(false);
  //       },
  //       (error) => {
  //         console.error('Salio un error:', error);
  //       }
  //     );
      
  //   }
  // }, [ejecutarConsulta]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      setLoading(true);
      await obtenerUsuarios(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setUsuarios(response.data);
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
      fetchUsuarios();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

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
      <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} loading={loading}/>
     {/*  {mostrarTabla ? (
       
      ) : (
        <ModificarPermisos
          setMostrarTabla={setMostrarTabla}
          // listaVehiculos={usuarios}
          // setVehiculos={setUsuarios}
        />
      )} */}
      <ToastContainer position='bottom-center' autoClose={2000} />
    </div>
  );
};

const TablaUsuarios = ({ loading, listaUsuarios, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]); 

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Usuarios</h2>
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
            <th>Id del Usuario</th>
            <th>Nombre Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>            
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map((usuario) => {
            return (
              <FilaUsuarios
                key={nanoid()}
                usuario={usuario}
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

const FilaUsuarios = ({ usuario, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    id: usuario._id,
    name: usuario.name,
    email: usuario.email,
    rol: usuario.rol,
    state: usuario.state,
  });

  const actualizarUsuario = async () => {
    //enviar la info al backend
    
    await editarUsuario(
      usuario._id,
      {
        id: infoNuevoUsuario._id,
        name: infoNuevoUsuario.name,
        email: infoNuevoUsuario.email,
        rol: infoNuevoUsuario.rol,
        state: infoNuevoUsuario.state,
      },
      (response) => {
        console.log(response.data);
        toast.success('Usuario modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el usuario');
        console.error(error);
      }
    );
  };

  const deleteUser = async () => {
    await eliminarUsuario(
      usuario._id,
      (response) => {
        console.log(response.data);
        toast.success('Usuario eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el usuario');
      }
    );
    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{usuario._id}</td>
          <td>{usuario.name}</td>
          <td>{usuario.email}</td>
          <td>
            <select
              className='bg-white border border-gray-600 p-2 rounded-lg m-2 focus-within:outline-none border-none'
              defaultValue={0}
              value={infoNuevoUsuario.rol}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, rol: e.target.value })
              }
            >
              <option disabled value={0}>
                Elija una opción
              </option>
              <option>Inactivo</option>
              <option>Administrador</option>
              <option>Vendedor</option>
            </select>
          </td>
          <td>            
            <select
              className='bg-white border border-gray-600 p-2 rounded-lg m-2 focus-within:outline-none border-none'
              value={infoNuevoUsuario.state}
              defaultValue={0}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, state: e.target.value })}
            >
              <option disabled value={0}>
                Elija una opción
              </option>
              <option>Autorizado</option>
              <option>No autorizado</option>
              <option>Pendiente</option>
            </select>
          </td>        
          
        </>
      ) : (
        <>
          <td>{usuario._id}</td>
          <td>{usuario.name}</td>
          <td>{usuario.email}</td>
          <td>{usuario.rol}</td>
          <td>{usuario.state}</td>          
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarUsuario()}
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
              <Tooltip title='Editar Vehículo' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar usuario' arrow>
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
              ¿Está seguro de querer eliminar el usuario?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteUser()}
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

/* const ModificarPermisos = ({setMostrarTabla, mostrarTabla}) => {
  
  return (
    <div className='flex flex-col items-center justify-center w-96'>
      <h2 className='text-2xl font-extrabold text-gray-800 my-4'>Permisos roles</h2>
      <table className = 'tabla'>
        <thead>
          <tr>
            <th>Permisos</th>
            <th>Administrador</th>
            <th>Vendedor</th>            
          </tr>
        </thead>
        <tbody>         
                <tr>
                    <td>Accesos a modulo de ventas</td>
                    <td><input type="checkbox" name="accesosModuloVentaAdmin" id="accesosModuloVentaAdmin" /></td>
                    <td><input type="checkbox" name="accesosModuloVentaVend" id="accesosModuloVentaVend" /></td>                
                </tr>
                <tr>
                    <td>Registrar venta</td>
                    <td><input type="checkbox" name="registrarVentaAdmin" id="registrarVentaAdmin" /></td>
                    <td><input type="checkbox" name="registrarVentaVend" id="registrarVentaVend" /></td>
                </tr>
                <tr>
                    <td>Actualizar venta</td>
                    <td><input type="checkbox" name="actualizarVentaAdmin" id="actualizarVentaAdmin" /></td>
                    <td><input type="checkbox" name="actualizarVentaVend" id="actualizarVentaVend" /></td>
                </tr>                
                <tr>
                    <td>Accesos a modulo de productos</td>
                    <td><input type="checkbox" name="accesosModuloProductosAdmin" id="accesosModuloProductosAdmin" /></td>
                    <td><input type="checkbox" name="accesosModuloProductosVend" id="accesosModuloProductosVend" /></td>                
                </tr>
                <tr>
                    <td>Registrar Productos</td>
                    <td><input type="checkbox" name="registrarProductosAdmin" id="registrarProductosAdmin" /></td>
                    <td><input type="checkbox" name="registrarProductosVend" id="registrarProductosVend" /></td>
                </tr>
                <tr>
                    <td>Actualizar Productos</td>
                    <td><input type="checkbox" name="actualizarProductosAdmin" id="actualizarProductosAdmin" /></td>
                    <td><input type="checkbox" name="actualizarProductosVend" id="actualizarProductosVend" /></td>
                </tr>
                <tr>
                    <td>Accesos a modulo de usuarios</td>
                    <td><input type="checkbox" name="accesosModuloUsuariosAdmin" id="accesosModuloUsuariosAdmin" /></td>
                    <td><input type="checkbox" name="accesosModuloUsuariosVend" id="accesosModuloUsuariosVend" /></td>                
                </tr>                
                <tr>
                    <td>Actualizar Usuarios</td>
                    <td><input type="checkbox" name="actualizarUsuariosAdmin" id="actualizarUsuariosAdmin" /></td>
                    <td><input type="checkbox" name="actualizarUsuariosVend" id="actualizarUsuariosVend" /></td>
                </tr>
                <tr>
                    <td>Modificar permisos</td>
                    <td><input type="checkbox" name="modificarpermisosAdmin" id="modificarpermisosAdmin" /></td>
                    <td><input type="checkbox" name="modificarpermisosVend" id="modificarpermisosVend" /></td>
                </tr>                          
        </tbody>
      </table>
      <button
          className='bg-blue-600 px-6 py-2 rounded-full shadow-md transform hover:scale-110 text-white my-3'
          // onClick={()=>{setMostrarTabla(!mostrarTabla)}}
          onClick={()=>{toast.success('Registro exitoso')}}
        >
          Guardar
      </button>
    </div>
  );
}; */

export default Usuarios;
