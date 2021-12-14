import './App.css';
import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { PerfilPage } from './pages/PerfilPage';

import { ConsultarUsuarioContext } from './context/consultarUsuarioContext';
import { ConsultarClienteContext } from './context/consultarClienteContext';
import { ConsultarInsumoContext } from './context/consultarInsumoContext';
import { ConsultarProductoContext } from './context/consultarProductoContext';
import { CarritoContext } from './context/carritoContext';
import { MenuContext } from './context/menuContext';
import { VentaContext } from './context/ventaContext';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { PrivateLayout } from './layouts/PrivateLayout';

import { UsuariosPage } from './pages/usuarios/UsuariosPage';
import { UsuariosRegistrarPage } from './pages/usuarios/UsuariosRegistrarPage';
import { UsuariosEditarPage } from './pages/usuarios/UsuariosEditarPage';

import { ClientesPage } from './pages/clientes/ClientesPage';
import { ClientesRegistrarPage } from './pages/clientes/ClientesRegistrarPage';
import { ClientesEditarPage } from './pages/clientes/ClientesEditarPage';

import { InsumosPage } from './pages/insumos/InsumosPage';
import { InsumosRegistrarPage } from './pages/insumos/InsumosRegistrarPage';
import { InsumosEditarPage } from './pages/insumos/InsumosEditarPage';

import { MenuPage } from './pages/menú/MenuPage';
import { RegistrarProductoPage } from './pages/menú/RegistrarProductoPage';
import { EditarProductoPage } from './pages/menú/EditarProductoPage';
import { VentasPage } from './pages/ventas/VentasPage';

function App() {

  const [usuarioEditar, setUsuarioEditar] = useState();
  const [clienteEditar, setClienteEditar] = useState();
  const [insumoEditar, setInsumoEditar] = useState();
  const [productos, setProductos] = useState();
  const [carrito, setCarrito] = useState([]);
  const [active, setActive] = useState("perfil");

  const [venta, setVenta] = useState({
    numVenta: 0,
    fecha: '',
    tipoVenta: 'Restaurante',
    formaPago: 'Efectivo',
    domicilio: '',
    consumir: 'llevar',
    mesa: '',
    cliente: '',
    productos: [],
    observaciones: ["Hamburguesa sin salsas", "Salchipapa sin queso"],
    total: 0,
    puntos: 0,
    descuento: 0
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <MenuContext.Provider value={{ active, setActive }}>
            <PrivateLayout>
              <CarritoContext.Provider value={{ carrito, setCarrito }}>
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
                <ConsultarInsumoContext.Provider value={{ insumoEditar, setInsumoEditar }}>
                  <Route exact path="/insumos">
                    <InsumosPage />
                  </Route>
                  <Route exact path="/insumos/registrar">
                    <InsumosRegistrarPage />
                  </Route>
                  <Route exact path="/insumos/editar">
                    <InsumosEditarPage />
                  </Route>
                </ConsultarInsumoContext.Provider>
                <ConsultarProductoContext.Provider value={{ productos, setProductos }}>
                  <Route exact path="/menu">
                    <MenuPage />
                  </Route>
                  <Route exact path="/menu/registrar">
                    <RegistrarProductoPage />
                  </Route>
                  <Route exact path="/menu/editar">
                    <EditarProductoPage />
                  </Route>
                </ConsultarProductoContext.Provider>
                <VentaContext.Provider value={{ venta, setVenta }}>
                  <Route exact path="/ventas">
                    <VentasPage />
                  </Route>
                </VentaContext.Provider>
              </CarritoContext.Provider>
            </PrivateLayout>
          </MenuContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
