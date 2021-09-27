import React from 'react'

const PermisosRoles = () => {
    return (
        
        <div className = 'contenedorTabla'>
            <table className = 'table'>
                <tr className='colorEncabezado'>
                    <td align='center' className = 'td'>Permisos</td>
                    <td align='center' className = 'td'>Administrador</td>
                    <td align='center' className = 'td'>Vendedor</td>                        
                </tr>
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
            </table>            
        </div>
    )
}

export default PermisosRoles;
