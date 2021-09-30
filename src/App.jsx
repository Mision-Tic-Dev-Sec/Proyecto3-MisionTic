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


function App() {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Switch>
            <Route path='/infoventa' exact>
              <InfoVenta />
            </Route>
            <Route path='/administraVenta' exact>
              <AdministraVenta />
            </Route>
            <Route path="/GestionarProductos">   
              <GestionarProductos/>
            </Route> 
            <Route path="/AgregarProductos">
              <AgregarProductos/>
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
            <Route path='/' exact>
              <Index />
            </Route>   
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
