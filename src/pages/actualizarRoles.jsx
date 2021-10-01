import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function ActualizarRoles() {
    const notify = () => toast.success("Registro exitoso !");
    return <div>
        <h1 className="breadCrumb">Modulo de usuarios > Actualizar información</h1>
        <form action="managerRoles" className = 'formulario'>
        <div className="formulariodiv">
        <label htmlFor="">Id usuario: </label>
            <input type="text" placeholder='Id usuario'/>
            <label htmlFor="">Nombre: </label>
            <input type="text" placeholder='Nombre'/>
            <label htmlFor="">Apellido: </label>
            <input type="text" placeholder='Apellido'/>
            <label htmlFor="">No. documento: </label>
            <input type="text" placeholder='No. documento'/>            
        </div>
        <div className="formulariodiv">
        <label htmlFor="">Correo electronico </label>
        <input type="email" placeholder='Correo electronico'/>
        <label htmlFor="">Estado: </label>
            <select name="estadoRol" id="estadoRol">
                <option value="selectEstado">Elija un estado:</option>
                <option value="Autorizado">Autorizado</option>
                <option value="NoAutorizado">No autorizado</option>
                <option value="Pendiente">Pendiente</option>
            </select>
            <label htmlFor="">Rol: </label>
            <select name="estadoRol" id="estadoRol">
            <option value="selectEstado">Elija un rol:</option>
            <option value="Administrador">Administrador</option>
            <option value="Vendedor">Vendedor</option>
            </select>
            <label htmlFor="">Fecha ingreso: </label>
            <input type="text" placeholder='AAAA/MM/DD HH:MM:SS'/>
        </div>                   
        </form>
        <div className='ContenedorBotonesGuardar'>
            <button onClick={notify} className= 'botonEdit colorBotonEdit'>Guardar</button>
            <button className = 'botonEdit botonDelete'>Cancelar</button>
        </div>
        <ToastContainer position="bottom-center" autoClose={3000}/>
    </div>;
  }
  
  export default ActualizarRoles;