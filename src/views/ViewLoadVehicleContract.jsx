import React, { useState, useEffect } from 'react';
import './tabs.css'
import InformacionGeneralForm from '../components/TabsContracts/InformacionGeneralForm';
import DatosVehiculoForm from '../components/TabsContracts/DatosVehiculoForm';
import DatosVentaForm from '../components/TabsContracts/DatosVentaForm';
import DatosVehiculoUsadoForm from '../components/TabsContracts/DatosVehiculoUsadoForm';
import FinanciamientoForm from '../components/TabsContracts/FinanciamientoForm';
import PaquetesMantenimientoForm from '../components/TabsContracts/PaquetesMantenimientoForm';
import ResumenForm from '../components/TabsContracts/ResumenForm';
import { VehicleNewProvider } from '../context/VehicleNewContext';
import { SellerProvider } from '../context/SellerContext';
import { ItemProvider } from '../context/ItemContext';
import { BankProvider } from '../context/BankContext';

const ViewLoadVehicleContract = ({ setCurrentView }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    DocNum: 5885,
    U_Estado: 1,
    Tipo: 1,
    CodCliFactura: "C00007",
    NombCliFactura: "BERROCARL JIMENEZ , RODRIGO ALONSO",
    CodCliVehiculo: "C00007",
    NombCliVehiculo: "BERROCARL JIMENEZ , RODRIGO ALONSO",
    CodVendedor: "177",
    NombVendedor: "SILVIA CARBALLO MONTERO",
    Fecha: "2025-02-13T00:00:00",
    Moneda: "COL",
    Opciones: '',
    PrecioLista: 50000.0,
    PrecioVenta: 50000.0,
    Total: 51000.0,
    Prima_Contado: 40000.0,
    MonUsado: 5000.0,
    DeudasUsado: 0.0,
    Descuento: 0.0,
    TotAntImpuesto: 50000.0,
    Impuestos: 1000.0,
    TotalC_Imp: 5000.0,
    EnteFinaciero: "Banco BAC - San José",
    MotoFinanciar: 10000.0,
    Otros: 0.0,
    otrosGastosInscripcion: [
      { monto: 0.0 },
      { monto: 0.0 },
      { monto: 0.0 },
    ],
    vehiculoUsadoxContrato: [
      {
        unidad: 'BFG-680',
        marca: 'JAC',
        vin: 'LJ16AK230E4400078',
        anio: '2014',
        placa: 'BFG-680',
        color: '',
        tipo: 'Vehiculos Usados',
        precioRecibo: 5000.0,
        transmision: 'MANUAL',
        modelo: '',
        combustible: 'GASOLINA',
      },
    ],
    vehiculoxContrato: [
      {
        unidad: 'SA002345',
        marca: 'CHERY',
        modelo: '',
        ano: 2025,
        placa: '',
        color: 'Gris/Techo Negro',
        vin: 'LURMCVBYXSA002345',
        transmision: 'AUTOMATICA',
        precio: 50000.0,
        tipo: null,
        combustible: null,
      },
    ],
    listaGatoAdicional: [
      { itemCode: '', itemName: '', precioUnid: 0.0, tipoItem: 0 },
      { itemCode: 'A1-PMP - 100K - TIGGO 2 MAN', itemName: 'PMP - 100K - TIGGO 2 MAN', precioUnid: 0.0, tipoItem: 5 },
      { itemCode: 'A2-PMP - 100K - TIGGO 2 MAN', itemName: 'PMP - 100K - TIGGO 2 MAN', precioUnid: 366.0, tipoItem: 5 },
      { itemCode: 'ACC-102', itemName: 'JUEGO DE LLANTA AT PARA i CAR03', precioUnid: 1977.5, tipoItem: 7 },
    ],
  });

  const tabs = [
    'Información General',
    'Datos del Vehículo',
    'Datos de Venta',
    'Datos del Vehículo Usado',
    'Financiamiento',
    'Paquetes de Mantenimiento',
    'Resumen',
  ];

  const validarSeccion = () => {
    switch (activeTab) {
      case 0:
        return true
        /*return (
          formData.numeroContrato &&
          formData.clienteFacturacion &&
          formData.vendedor
        );*/
      case 1:
        return true
        /*return (
          formData.datosVehiculo.unidad &&
          formData.datosVehiculo.marca &&
          formData.datosVehiculo.modelo &&
          formData.datosVehiculo.precio
        );*/
      case 2:
        return true
        /*return (
          formData.datosVenta.precioVenta && formData.datosVenta.totalVenta
        );*/
      case 3:
        return true
        /*return (
          formData.datosVehiculoUsado.unidad &&
          formData.datosVehiculoUsado.marca &&
          formData.datosVehiculoUsado.modelo
        );*/
      case 4:
        return true
        //return !(formData.financiamiento.monto > formData.datosVehiculo.precio);
      default:
        return true;
    }
  };

  return (
    <VehicleNewProvider>
      <SellerProvider>
        <ItemProvider>
          <BankProvider>
            <div className="container white z-depth-2" style={{ minHeight: '83vh' }}>
              <div className="row">
                <div className="col s12">
                  <h4 className="center">Contratos</h4>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m2 input-field" hidden={!formData.numeroContrato}>
                  <input
                    type="text"
                    id="numeroContrato"
                    name="numeroContrato"
                    disabled
                    value={formData.numeroContrato}
                  />
                  <label htmlFor="numeroContrato">Número de Contrato</label>
                </div>
                <div className={`col s12 ${!formData.numeroContrato ? 'm6 offset-m3' : 'm6 offset-m1'}`}>
                  <nav>
                    <div className="nav-wrapper teal">
                      <form>
                        <div className="input-field">
                          <input id="search" type="search" required placeholder='Buscas Contrato por Numero o Nombre de Cliente' />
                          <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                          <i className="material-icons">close</i>
                        </div>
                      </form>
                    </div>
                  </nav>
                </div>
              </div>
              <ul className="tabs">
                {tabs.map((tab, index) => (
                  <li
                    key={index}
                    className={`tab ${activeTab === index ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    <a href="#!">{tab}</a>
                  </li>
                ))}
              </ul>

              <div className="section">
                <div className="row">
                  <div className="col s12">
                    <h5 className='center'>{tabs[activeTab]}</h5>
                  </div>
                </div>

                {activeTab === 0 && (
                  <InformacionGeneralForm
                    formData={formData}
                    setFormData={setFormData}
                    setCurrentView={setCurrentView}
                  />
                )}
                {activeTab === 1 && (
                  <DatosVehiculoForm formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 2 && (
                  <DatosVentaForm formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 3 && (
                  <DatosVehiculoUsadoForm
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === 4 && (
                  <FinanciamientoForm formData={formData} setFormData={setFormData} />
                )}
                {activeTab === 5 && (
                  <PaquetesMantenimientoForm
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {activeTab === 6 && <ResumenForm formData={formData} />}
              </div>
              <div className="divider"></div>
              <div className="section">

                <button
                  className="btn"
                  disabled={activeTab === 0}
                  onClick={() => setActiveTab(activeTab - 1)}
                >
                  Anterior
                </button>
                <button
                  className="btn right"
                  disabled={activeTab === tabs.length - 1 || !validarSeccion()}
                  onClick={() => setActiveTab(activeTab + 1)}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </BankProvider>
        </ItemProvider>
      </SellerProvider>
    </VehicleNewProvider>
  );
};

export default ViewLoadVehicleContract;
