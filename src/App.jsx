import './App.css';

import ReactPDF from '@react-pdf/renderer';

import { useEffect, useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { PerfilPage } from './pages/perfil/PerfilPage';

import { ConsultarUsuarioContext } from './context/consultarUsuarioContext';
import { ConsultarClienteContext } from './context/consultarClienteContext';
import { ConsultarInsumoContext } from './context/consultarInsumoContext';
import { ConsultarProductoContext } from './context/consultarProductoContext';
import { CarritoContext } from './context/carritoContext';
import { MenuContext } from './context/menuContext';
import { VentaContext } from './context/ventaContext';
import { EditarVentaContext } from './context/editarVentaContext';
import { UsuarioContext } from './context/usuarioContext';

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
import { ConsultarVentasPage } from './pages/ventas/ConsultarVentasPage';

import { axiosPetition } from './helpers/Axios';

import { Factura } from './components/facturas/Factura';
import { PDFViewer } from '@react-pdf/renderer';
import { EditarVenta } from './components/ventas/editar/EditarVenta';


function App() {

  const [usuarioEditar, setUsuarioEditar] = useState();
  const [clienteEditar, setClienteEditar] = useState();
  const [insumoEditar, setInsumoEditar] = useState();
  const [productos, setProductos] = useState();
  const [carrito, setCarrito] = useState([]);
  const [active, setActive] = useState("perfil");
  const [serverInfo, setServerInfo] = useState();
  const [infoUsuario, setInfoUsuario] = useState();
  const [editarVenta, setEditarVenta] = useState(undefined);

  useEffect(() => {
    const obtenerInfo = async () => {
      const consulta = await axiosPetition("server/fecha");
      setServerInfo(consulta);
      venta.fecha = consulta.fecha;
    }
    obtenerInfo();
  }, []);

  const [venta, setVenta] = useState({
    identificador: '',
    fecha: null,
    tipoVenta: 'Restaurante',
    formaPago: 'Efectivo',
    precioDomicilio: '',
    direccionDomicilio: '',
    consume: 'restaurante',
    idMesa: '',
    cliente: '',
    vendedor: '',
    productos: [],
    observaciones: [],
    total: 0,
    puntosGanados: 0,
    descuento: 0,
    plataforma: "",
    banco: ""
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <UsuarioContext.Provider value={{ infoUsuario, setInfoUsuario }}>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <MenuContext.Provider value={{ active, setActive }}>
              <EditarVentaContext.Provider value={{ editarVenta, setEditarVenta }}>
                <CarritoContext.Provider value={{ carrito, setCarrito }}>
                  <PrivateLayout>
                    <Route exact path="/facturas">
                      <Factura />
                    </Route>
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

                    <VentaContext.Provider value={{ venta, setVenta }}>
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
                      <Route exact path="/ventas">
                        <VentasPage />
                      </Route>

                      <Route exact path="/ventas/consultar">
                        <ConsultarVentasPage />
                      </Route>
                      <Route exact path="/ventas/editar">
                        <EditarVenta />
                      </Route>
                      <Route exact path="/factura">
                        <Factura />
                      </Route>
                    </VentaContext.Provider>
                  </PrivateLayout>
                </CarritoContext.Provider>
              </EditarVentaContext.Provider>
            </MenuContext.Provider>
          </UsuarioContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
