import { useState } from 'react';
import React from 'react';
import './tabs.css'
import InformacionGeneralForm from '../components/TabsContracts/InformacionGeneralForm.jsx';
import DatosVehiculoForm from '../components/TabsContracts/DatosVehiculoForm.jsx';
import DatosVentaForm from '../components/TabsContracts/DatosVentaForm.jsx';
import DatosVehiculoUsadoForm from '../components/TabsContracts/DatosVehiculoUsadoForm.jsx';
import FinanciamientoForm from '../components/TabsContracts/FinanciamientoForm.jsx';
import PaquetesMantenimientoForm from '../components/TabsContracts/PaquetesMantenimientoForm.jsx';
import ResumenForm from '../components/TabsContracts/ResumenForm.jsx';

const ViewLoadVehicleContract = ({setCurrentView}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    numeroContrato: '',
    clienteFacturacion: '',
    tipoIdentificacion: '', // Física o Jurídica
    clientePropietario: '',
    vendedor: '',
    fechaDocumento: '',
    opciones: '',
    datosVehiculo: {
      unidad: '',
      marca: '',
      estilo: '',
      modelo: '',
      color: '',
      transmision: '',
      numeroMotor: '',
      numeroChasis: '',
      precio: '',
      bono: '',
      porcentajeDescuento: '',
      gastosLocales: '',
      otrosGastos: '',
    },
    datosVehiculoUsado: {
      unidad: '',
      marca: '',
      estilo: '',
      modelo: '',
      color: '',
      transmision: '',
      numeroMotor: '',
      numeroChasis: '',
      kilometraje: '',
      fechaRevisionTecnica: '',
      valorRecibido: '',
    },
    datosVenta: {
      precioVenta: '',
      gastosInscripcion: 1000,
      tipoGastoInscripcion: '',
      porcentajeDescuento: '',
      montoDescuento: '',
      montoPrima: '',
      montoVehiculoUsado: '',
      deudaUsado: '',
      totalVenta: '',
    },
    financiamiento: {
      entidad: '',
      monto: '',
      interes: '',
      plazo: '',
    },
    paquetesMantenimiento: [],
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
      case 0: // Información General
        return (
          formData.numeroContrato &&
          formData.clienteFacturacion &&
          formData.vendedor
        );
      case 1: // Datos del Vehículo
        return (
          formData.datosVehiculo.unidad &&
          formData.datosVehiculo.marca &&
          formData.datosVehiculo.modelo &&
          formData.datosVehiculo.precio
        );
      case 2: // Datos de Venta
        return (
          formData.datosVenta.precioVenta && formData.datosVenta.totalVenta
        );
      case 3: // Datos del Vehículo Usado
        return (
          formData.datosVehiculoUsado.unidad &&
          formData.datosVehiculoUsado.marca &&
          formData.datosVehiculoUsado.modelo
        );
      case 4: // Financiamiento
        return !(formData.financiamiento.monto > formData.datosVehiculo.precio);
      default:
        return true;
    }
  };

  return (
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
        <div className={`col s12 ${!formData.numeroContrato?'m6 offset-m3':'m6 offset-m1'}`}>
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
          <DatosVehiculoForm
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
  );
};

export default ViewLoadVehicleContract;
