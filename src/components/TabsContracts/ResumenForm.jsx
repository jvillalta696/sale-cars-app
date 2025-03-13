import React from 'react';
import './ResumenForm.css'; // Import the CSS file

const ResumenForm = ({ formData }) => {
  return (
    <div className="resumen-form">
      <h5 className="resumen-title">Resumen del Contrato</h5>
      <div className="section">
        <h6 className="section-title">Información General</h6>
        <p>
          <strong>Número de Contrato:</strong> {formData.numeroContrato}
        </p>
        <p>
          <strong>Cliente a Facturar:</strong> {formData.clienteFacturacion}
        </p>
        <p>
          <strong>Tipo de Identificación:</strong> {formData.tipoIdentificacion}
        </p>
        <p>
          <strong>Cliente Dueño del Vehículo:</strong>{' '}
          {formData.clientePropietario}
        </p>
        <p>
          <strong>Vendedor:</strong> {formData.vendedor}
        </p>
        <p>
          <strong>Fecha del Documento:</strong> {formData.fechaDocumento}
        </p>
        <p>
          <strong>Opciones (Comentarios):</strong> {formData.opciones}
        </p>
        <p>
          <strong>Ente Financiero:</strong> {formData.EnteFinaciero}
        </p>
        <p>
          <strong>Monto a Financiar:</strong> {formData.MotoFinanciar}
        </p>
      </div>
      <div className="section">
        <h6 className="section-title">Datos del Vehículo</h6>
        {formData.vehiculoxContrato.map((vehiculo, index) => (
          <div key={index} className="vehicle-info">
            <p>
              <strong>Unidad:</strong> {vehiculo.unidad}
            </p>
            <p>
              <strong>Marca:</strong> {vehiculo.marca}
            </p>
            <p>
              <strong>Modelo:</strong> {vehiculo.modelo}
            </p>
            <p>
              <strong>Año:</strong> {vehiculo.ano}
            </p>
            <p>
              <strong>Placa:</strong> {vehiculo.placa}
            </p>
            <p>
              <strong>Color:</strong> {vehiculo.color}
            </p>
            <p>
              <strong>VIN:</strong> {vehiculo.vin}
            </p>
            <p>
              <strong>Transmisión:</strong> {vehiculo.transmision}
            </p>
            <p>
              <strong>Precio:</strong> {vehiculo.precio}
            </p>
          </div>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Datos del Vehículo Usado</h6>
        {formData.vehiculoUsadoxContrato.map((vehiculoUsado, index) => (
          <div key={index} className="vehicle-info">
            <p>
              <strong>Unidad:</strong> {vehiculoUsado.unidad}
            </p>
            <p>
              <strong>Marca:</strong> {vehiculoUsado.marca}
            </p>
            <p>
              <strong>VIN:</strong> {vehiculoUsado.vin}
            </p>
            <p>
              <strong>Año:</strong> {vehiculoUsado.anio}
            </p>
            <p>
              <strong>Placa:</strong> {vehiculoUsado.placa}
            </p>
            <p>
              <strong>Color:</strong> {vehiculoUsado.color}
            </p>
            <p>
              <strong>Transmisión:</strong> {vehiculoUsado.transmision}
            </p>
            <p>
              <strong>Precio Recibo:</strong> {vehiculoUsado.precioRecibo}
            </p>
            <p>
              <strong>Combustible:</strong> {vehiculoUsado.combustible}
            </p>
          </div>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Otros Gastos de Inscripción</h6>
        {formData.otrosGastosInscripcion.map((gasto, index) => (
          <p key={index}>
            <strong>Gasto {index + 1}:</strong> {gasto.monto}
          </p>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Lista de Gastos Adicionales</h6>
        {formData.listaGatoAdicional.map((gasto, index) => (
          <p key={index}>
            <strong>Item {index + 1}:</strong> 
            {gasto.itemCode} - {gasto.itemName} - {gasto.precioUnid} - {gasto.tipoItem}
          </p>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Paquetes de Mantenimiento</h6>
        {formData.paquetesMantenimiento.map((paquete, index) => (
          <p key={index}>
            <strong>Paquete {index + 1}:</strong> 
            {paquete.Tipo} - {paquete.ItemCode} - {paquete.ItemName} - {paquete.Precio} - {paquete.Cantidad} - {paquete.Total}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResumenForm;
