import Layout from 'layouts/Layout';
import Index from 'pages';

import AdministraVenta from './pages/administraVenta';
import InfoVenta from './pages/infoVenta';
import GestionarProductos from "./pages/GestionarProductos"
import AñadirProductos from './pages/AñadirProductos';
import ActualizarProductos from './pages/ActualizarProductos';


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
            <Route path="/AñadirProductos">
              <AñadirProductos/>
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
