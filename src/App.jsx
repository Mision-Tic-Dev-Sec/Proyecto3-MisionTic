import React from 'react';
import PublicLayout from 'layouts/PublicLayout';
import Inicio from 'pages/Inicio';
import Login from 'pages/auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css';
import AuthLayout from 'layouts/AuthLayout';
import Productos from 'pages/Productos';
import Ventas from 'pages/Ventas';
import Usuarios from 'pages/Usuarios';
import Vehiculos from 'pages/Vehiculos';
import Ventas2 from 'pages/Ventas2';

function App() {
  return (
    <div className='App'>
        <Router>
          <Switch>
            <Route path={['/inicio', '/productos', '/ventas', '/usuarios', '/vehiculos', '/ventas2']}>
              <PublicLayout>
                <Switch>
                  <Route path='/ventas'>
                   <Ventas />
                  </Route>
                  <Route path='/ventas2'>
                   <Ventas2 />
                  </Route>
                  <Route path='/productos'>
                   <Productos />
                  </Route>
                  <Route path='/usuarios'>
                   <Usuarios />
                  </Route>
                  <Route path='/vehiculos'>
                   <Vehiculos />
                  </Route>
                  <Route path='/inicio'>
                   <Inicio />
                  </Route>
                </Switch>
              </PublicLayout>
            </Route>
            <Route path={['/']}>
              <AuthLayout>
                <Route path='/'>
                  <Login />
                </Route>
              </AuthLayout>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
