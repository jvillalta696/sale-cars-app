import React from 'react';
import './ResumenForm.css'; // Import the CSS file

const ResumenForm = ({ formData }) => {
  return (
    <div className="resumen-form">
      <h5 className="resumen-title">Resumen del Contrato</h5>
      <div className="section">
        <h6 className="section-title">Información General</h6>
        <p>
          <strong>Número de Contrato:</strong> {formData.DocNum}
        </p>
        <p>
          <strong>Cliente a Facturar:</strong> {formData.NombCliFactura}
        </p>
        <p>
          <strong>Cliente Dueño del Vehículo:</strong> {formData.NombCliVehiculo}
        </p>
        <p>
          <strong>Vendedor:</strong> {formData.NombVendedor}
        </p>
        <p>
          <strong>Fecha del Documento:</strong> {formData.Fecha}
        </p>
        <p>
          <strong>Opciones (Comentarios):</strong> {formData.Opciones}
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
        {formData.ListVehiculoxContrato.map((vehiculo, index) => (
          <div key={index} className="vehicle-info">
            <p>
              <strong>Unidad:</strong> {vehiculo.Unidad}
            </p>
            <p>
              <strong>Marca:</strong> {vehiculo.Marca}
            </p>
            <p>
              <strong>Modelo:</strong> {vehiculo.Modelo}
            </p>
            <p>
              <strong>Año:</strong> {vehiculo.Ano}
            </p>
            <p>
              <strong>Placa:</strong> {vehiculo.Placa}
            </p>
            <p>
              <strong>Color:</strong> {vehiculo.Color}
            </p>
            <p>
              <strong>VIN:</strong> {vehiculo.VIN}
            </p>
            <p>
              <strong>Transmisión:</strong> {vehiculo.Trasmision}
            </p>
            <p>
              <strong>Precio:</strong> {vehiculo.Precio}
            </p>
          </div>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Datos del Vehículo Usado</h6>
        {formData.ListVehiculoUsadoxContrato.map((vehiculoUsado, index) => (
          <div key={index} className="vehicle-info">
            <p>
              <strong>Unidad:</strong> {vehiculoUsado.Unidad}
            </p>
            <p>
              <strong>Marca:</strong> {vehiculoUsado.Marca}
            </p>
            <p>
              <strong>VIN:</strong> {vehiculoUsado.VIN}
            </p>
            <p>
              <strong>Año:</strong> {vehiculoUsado.Anio}
            </p>
            <p>
              <strong>Placa:</strong> {vehiculoUsado.Placa}
            </p>
            <p>
              <strong>Color:</strong> {vehiculoUsado.Color}
            </p>
            <p>
              <strong>Transmisión:</strong> {vehiculoUsado.Trasmision}
            </p>
            <p>
              <strong>Precio Recibo:</strong> {vehiculoUsado.PrecioRecibo}
            </p>
            <p>
              <strong>Combustible:</strong> {vehiculoUsado.Combustible}
            </p>
          </div>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Otros Gastos de Inscripción</h6>
        {formData.ListOtrosGastosInscripcion.map((gasto, index) => (
          <p key={index}>
            <strong>Gasto {index + 1}:</strong> {gasto.Monto}
          </p>
        ))}
      </div>
      <div className="section">
        <h6 className="section-title">Lista de Gastos Adicionales</h6>
        {formData.ListaGatoAdicional && formData.ListaGatoAdicional.length > 0 ? (
          <table className="highlight">
            <thead>
              <tr>
                <th>Item</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {formData.ListaGatoAdicional.map((gasto, index) => (
                <tr key={index}>
                  <td>{gasto.TipoItem}</td>
                  <td>{gasto.ItemCode}</td>
                  <td>{gasto.ItemName}</td>
                  <td>{gasto.PrecioUnid}</td>
                  <td>{gasto.Cantidad}</td>
                  <td>{gasto.Cantidad * gasto.PrecioUnid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay gastos adicionales</p>
        )}
      </div>
    </div>
  );
};

export default ResumenForm;
