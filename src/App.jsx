import Layout from 'layouts/Layout';
import Index from 'pages';
import AdministraVenta from 'pages/administraVenta';
import InfoVenta from 'pages/infoVenta';
import GestionarProductos from "pages/GestionarProductos"
import AgregarProductos from 'pages/AgregarProductos';
import ActualizarProductos from 'pages/ActualizarProductos';
import AdministraRoles from 'pages/administraRoles';
import ActualizarRoles from 'pages/actualizarRoles';
import PermisosRoles from 'pages/permisosRoles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css'; 
import Login from 'pages/Login';


function App() {
  return (
    <div className='App'>
      <Router>
      <Switch>
        <Route path='/' exact>
          <Login />
        </Route>
        <Layout>
            <Route path='/infoventa' exact>
              <InfoVenta />
            </Route>
            <Route path='/administraVenta' exact>
              <AdministraVenta />
            </Route>
            <Route path="/GestionarProductos" exact>   
              <GestionarProductos/>
            </Route> 
            <Route path="/AgregarProductos" exact>
              <AgregarProductos />
            </Route> 
            <Route path='/administraRoles' exact>
              <AdministraRoles />
            </Route>
            <Route path='/actualizarRoles' exact>
              <ActualizarRoles />
            </Route>
            <Route path='/permisosRoles' exact>
              <PermisosRoles />
            </Route>
            <Route path='/ActualizarProductos' exact>
              <ActualizarProductos/>
            </Route> 
            <Route path='/Index' exact>
              <Index />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
