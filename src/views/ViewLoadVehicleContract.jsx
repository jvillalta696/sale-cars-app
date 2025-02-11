import { useState } from 'react';
import React from 'react';
import InformacionGeneralForm from '../components/InformacionGeneralForm';
import DatosVehiculoForm from '../components/DatosVehiculoForm';
import DatosVentaForm from '../components/DatosVentaForm';
import DatosVehiculoUsadoForm from '../components/DatosVehiculoUsadoForm';
import FinanciamientoForm from '../components/FinanciamientoForm';
import PaquetesMantenimientoForm from '../components/PaquetesMantenimientoForm';
import ResumenForm from '../components/ResumenForm';

const ViewLoadVehicleContract = () => {
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
    <div className="container">
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
        <h5>{tabs[activeTab]}</h5>
        {activeTab === 0 && (
          <InformacionGeneralForm
            formData={formData}
            setFormData={setFormData}
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
      <div className="row">
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
