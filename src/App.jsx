import React, { useState } from 'react';
import PublicLayout from 'layouts/PublicLayout';
import Inicio from 'pages/Inicio';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css';
import Productos from 'pages/Productos';
import Ventas from 'pages/Ventas';
import Usuarios from 'pages/Usuarios';
import Vehiculos from 'pages/Vehiculos';
import Ventas2 from 'pages/Ventas2';
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from 'context/userContext';
import PrivateRoute from 'components/PrivateRoute';
import TestVenta from 'pages/TestVenta';
import VentaProductos from 'pages/VentaProductos';

function App() {
  const [userData, setUserData] = useState({});

  return (
    <Auth0Provider 
    domain="mtictienda.us.auth0.com"
    clientId="ryzJcg5oBn3FRV6CV8EKQgVJS4rBIKeo"
    redirectUri='http://localhost:3000/inicio'
    audience='api-autenticacion-tienda-mintic'>
      
      <div className='App'>
        <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Switch>
            <Route path={['/productos', '/ventas', '/usuarios', '/vehiculos', '/ventas2', '/testVenta', '/ventaProductos', '/']}>
              <PublicLayout>
                <Switch>
                  <Route path='/ventas'>
                    <PrivateRoute roleList={["Administrador", "Vendedor"]} stateList={["Autorizado"]}>
                      <Ventas />
                    </PrivateRoute>
                  </Route>
                  <Route path='/ventas2'>
                    <PrivateRoute roleList={["Administrador", "Vendedor"]} stateList={["Autorizado"]}>
                      <Ventas2 />
                    </PrivateRoute>
                  </Route>
                  <Route path='/productos'>
                    <PrivateRoute roleList={["Administrador"]} stateList={["Autorizado"]}>
                      <Productos />
                    </PrivateRoute>
                  </Route>
                  <Route path='/usuarios'>
                    <PrivateRoute roleList={["Administrador"]} stateList={["Autorizado"]}>
                      <Usuarios />
                    </PrivateRoute>
                  </Route>
                  <Route path='/vehiculos'>
                   <Vehiculos />
                  </Route>
                  <Route path='/testVenta'>
                   <TestVenta />
                  </Route>
                  <Route path='/ventaProductos'>
                   <VentaProductos />
                  </Route>
                  <Route path='/'>
                   <Inicio />
                  </Route>
                </Switch>
              </PublicLayout>
            </Route>            
          </Switch>
        </Router>
        </UserContext.Provider>
    </div>
    </Auth0Provider>
  );
}

export default App;
