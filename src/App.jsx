import './App.css';
import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { PerfilPage } from './pages/PerfilPage';
import { UsuariosPage } from './pages/usuarios/UsuariosPage';
import { UsuariosRegistrarPage } from './pages/usuarios/UsuariosRegistrarPage';
import { UsuariosEditarPage } from './pages/usuarios/UsuariosEditarPage';
import { ConsultarUsuarioContext } from './context/consultarUsuarioContext';
import { ConsultarClienteContext } from './context/consultarClienteContext';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PrivateLayout } from './layouts/PrivateLayout';
import { ClientesPage } from './pages/clientes/ClientesPage';
import { ClientesRegistrarPage } from './pages/clientes/ClientesRegistrarPage';
import { ClientesEditarPage } from './pages/clientes/ClientesEditarPage';

function App() {

  const [usuarioEditar, setUsuarioEditar] = useState();
  const [clienteEditar, setClienteEditar] = useState();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <PrivateLayout>
            <Route exact path="/perfil">
              <PerfilPage />
            </Route>
            <ConsultarClienteContext.Provider value={{ clienteEditar, setClienteEditar }}>
              <Route exact path="/clientes">
                <ClientesPage />
              </Route>
              <Route exact path="/clientes/registrar">
                <ClientesRegistrarPage />
              </Route>
              <Route exact path="/clientes/editar">
                <ClientesEditarPage />
              </Route>
            </ConsultarClienteContext.Provider>
            <ConsultarUsuarioContext.Provider value={{ usuarioEditar, setUsuarioEditar }}>
              <Route exact path="/usuarios">
                <UsuariosPage />
              </Route>
              <Route exact path="/usuarios/registrar">
                <UsuariosRegistrarPage />
              </Route>
              <Route exact path="/usuarios/editar">
                <UsuariosEditarPage />
              </Route>
            </ConsultarUsuarioContext.Provider>
          </PrivateLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
