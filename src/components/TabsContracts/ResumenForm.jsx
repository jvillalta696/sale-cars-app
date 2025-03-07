import React from 'react';

const ResumenForm = ({ formData }) => {
  return (
    <div>
      <h5>Resumen del Contrato</h5>
      <div>
        <h6>Información General</h6>
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
      </div>
      <div>
        <h6>Datos del Vehículo</h6>
        <p>
          <strong>Unidad:</strong> {formData.datosVehiculo.unidad}
        </p>
        <p>
          <strong>Marca:</strong> {formData.datosVehiculo.marca}
        </p>
        <p>
          <strong>Estilo:</strong> {formData.datosVehiculo.estilo}
        </p>
        <p>
          <strong>Modelo:</strong> {formData.datosVehiculo.modelo}
        </p>
        <p>
          <strong>Color:</strong> {formData.datosVehiculo.color}
        </p>
        <p>
          <strong>Transmisión:</strong> {formData.datosVehiculo.transmision}
        </p>
        <p>
          <strong>Número de Motor:</strong> {formData.datosVehiculo.numeroMotor}
        </p>
        <p>
          <strong>Número de Chasis:</strong>{' '}
          {formData.datosVehiculo.numeroChasis}
        </p>
        <p>
          <strong>Precio:</strong> {formData.datosVehiculo.precio}
        </p>
        <p>
          <strong>Bono:</strong> {formData.datosVehiculo.bono}
        </p>
        <p>
          <strong>Porcentaje de Descuento:</strong>{' '}
          {formData.datosVehiculo.porcentajeDescuento}
        </p>
        <p>
          <strong>Gastos Locales:</strong>{' '}
          {formData.datosVehiculo.gastosLocales}
        </p>
        <p>
          <strong>Otros Gastos:</strong> {formData.datosVehiculo.otrosGastos}
        </p>
      </div>
      <div>
        <h6>Datos del Vehículo Usado</h6>
        <p>
          <strong>Unidad:</strong> {formData.datosVehiculoUsado.unidad}
        </p>
        <p>
          <strong>Marca:</strong> {formData.datosVehiculoUsado.marca}
        </p>
        <p>
          <strong>Estilo:</strong> {formData.datosVehiculoUsado.estilo}
        </p>
        <p>
          <strong>Modelo:</strong> {formData.datosVehiculoUsado.modelo}
        </p>
        <p>
          <strong>Color:</strong> {formData.datosVehiculoUsado.color}
        </p>
        <p>
          <strong>Transmisión:</strong>{' '}
          {formData.datosVehiculoUsado.transmision}
        </p>
        <p>
          <strong>Número de Motor:</strong>{' '}
          {formData.datosVehiculoUsado.numeroMotor}
        </p>
        <p>
          <strong>Número de Chasis:</strong>{' '}
          {formData.datosVehiculoUsado.numeroChasis}
        </p>
        <p>
          <strong>Kilometraje:</strong>{' '}
          {formData.datosVehiculoUsado.kilometraje}
        </p>
        <p>
          <strong>Fecha de Revisión Técnica:</strong>{' '}
          {formData.datosVehiculoUsado.fechaRevisionTecnica}
        </p>
        <p>
          <strong>Valor Recibido:</strong>{' '}
          {formData.datosVehiculoUsado.valorRecibido}
        </p>
      </div>
      <div>
        <h6>Datos de Venta</h6>
        <p>
          <strong>Precio de Venta:</strong> {formData.datosVenta.precioVenta}
        </p>
        <p>
          <strong>Gastos de Inscripción:</strong>{' '}
          {formData.datosVenta.gastosInscripcion}
        </p>
        <p>
          <strong>Tipo de Gasto de Inscripción:</strong>{' '}
          {formData.datosVenta.tipoGastoInscripcion}
        </p>
        <p>
          <strong>Porcentaje de Descuento:</strong>{' '}
          {formData.datosVenta.porcentajeDescuento}
        </p>
        <p>
          <strong>Monto de Descuento:</strong>{' '}
          {formData.datosVenta.montoDescuento}
        </p>
        <p>
          <strong>Monto de Prima:</strong> {formData.datosVenta.montoPrima}
        </p>
        <p>
          <strong>Monto del Vehículo Usado:</strong>{' '}
          {formData.datosVenta.montoVehiculoUsado}
        </p>
        <p>
          <strong>Deuda del Usado:</strong> {formData.datosVenta.deudaUsado}
        </p>
        <p>
          <strong>Total de la Venta:</strong> {formData.datosVenta.totalVenta}
        </p>
      </div>
      <div>
        <h6>Financiamiento</h6>
        <p>
          <strong>Entidad:</strong> {formData.financiamiento.entidad}
        </p>
        <p>
          <strong>Monto:</strong> {formData.financiamiento.monto}
        </p>
        <p>
          <strong>Interés:</strong> {formData.financiamiento.interes}
        </p>
        <p>
          <strong>Plazo:</strong> {formData.financiamiento.plazo}
        </p>
      </div>
      <div>
        <h6>Paquetes de Mantenimiento</h6>
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
