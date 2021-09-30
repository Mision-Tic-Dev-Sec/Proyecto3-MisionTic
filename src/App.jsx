import Layout from 'layouts/Layout';
import Index from 'pages';
<<<<<<< HEAD
import AdministraVenta from './pages/administraVenta';
import InfoVenta from './pages/infoVenta';
import GestionarProductos from "./pages/GestionarProductos"
import AñadirProductos from './pages/AñadirProductos';
import DatosdeProductos from "./pages/DatosdeProductos";
import ActualizarProductos from './pages/ActualizarProductos';
=======
import AdministraVenta from 'pages/administraVenta';
import AdministraRoles from 'pages/administraRoles';
import ActualizarRoles from 'pages/actualizarRoles';
import PermisosRoles from 'pages/permisosRoles';
import InfoVenta from 'pages/infoVenta';
>>>>>>> fe934222840dacab5a4514fcee4af42586a0577a
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
<<<<<<< HEAD
            <Route path="/GestionarProductos">   
              <GestionarProductos/>
            </Route> 
            <Route path="/AñadirProductos">
              <AñadirProductos/>
            </Route>  
            <Route path="/DatosdeProductos">
              <DatosdeProductos/>
=======
            <Route path='/administraRoles' exact>
              <AdministraRoles />
            </Route>
            <Route path='/actualizarRoles' exact>
              <ActualizarRoles />
            </Route>
            <Route path='/permisosRoles' exact>
              <PermisosRoles />
            </Route>
            <Route path='/' exact>
              <Index />
>>>>>>> fe934222840dacab5a4514fcee4af42586a0577a
            </Route>
            <Route path="/ActualizarProductos">
              <ActualizarProductos/>
            </Route>    
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
