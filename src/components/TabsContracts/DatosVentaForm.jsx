import React, { useEffect } from 'react';
import M from 'materialize-css';

const DatosVentaForm = ({ formData, setFormData }) => {

  // Sincroniza PrecioLista y PrecioVenta con el precio del primer vehículo al montar o cuando cambie ListVehiculoxContrato
  useEffect(() => {
    let impuestos = 0;
    if (
      formData &&
      Array.isArray(formData.ListVehiculoxContrato) &&
      formData.ListVehiculoxContrato.length > 0 && formData.ListVehiculoxContrato[0].precio !== 0
    ) {
      const precioVehiculo = Number(formData.ListVehiculoxContrato[0].precio);
      if (
        (formData.PrecioLista !== precioVehiculo || formData.PrecioVenta !== precioVehiculo) &&
        !isNaN(precioVehiculo)
      ) {
         impuestos = formData.ListVehiculoxContrato[0].Combustible === 'ELECTRICO' ? precioVehiculo * 0.03 : precioVehiculo * 0.13;
        setFormData((prevData) => ({
          ...prevData,
          PrecioLista: precioVehiculo,
          PrecioVenta: precioVehiculo,
          Impuestos: impuestos, // Ejemplo: 15% de impuestos
        }));
      }
    }else if(formData &&
      Array.isArray(formData.ListVehiculoUsadoxContrato) &&
      formData.ListVehiculoUsadoxContrato.length > 0 && formData.ListVehiculoUsadoxContrato[0].precio !== 0){
      const precioVehiculo = Number(formData.ListVehiculoUsadoxContrato[0].precio);
      if (
        (formData.PrecioLista !== precioVehiculo || formData.PrecioVenta !== precioVehiculo) &&
        !isNaN(precioVehiculo)
      ) {

        setFormData((prevData) => ({
          ...prevData,
          PrecioLista: precioVehiculo,
          PrecioVenta: precioVehiculo,
          Impuestos: 0, // Ejemplo: 15% de impuestos
        }));
      }
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  return (
    <>
      <div className="row">
        <div className="col s12 m12 l6">
          <div className="card" style={{ padding: 20, margin: 20 }}>
            <span className="card-title">Monto Vehiculo</span>
            <div className="card-content">
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="PrecioLista" id="PrecioLista" value={formData.PrecioLista} disabled />
                  <label htmlFor="PrecioLista">Precios de lista</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="PrecioVenta" id="PrecioVenta" value={formData.PrecioVenta} disabled />
                  <label htmlFor="PrecioVenta">Precio de Venta</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input 
                    type="number" 
                    name="Otros" 
                    id="Otros" 
                    value={formData.ListOtrosGastosInscripcion[0]?.Monto || ''} 
                    onChange={(e) => {
                      const { value } = e.target;
                      setFormData((prevData) => {
                        const updatedList = [...prevData.ListOtrosGastosInscripcion];
                        if (updatedList.length > 0) {
                          updatedList[0] = { ...updatedList[0], Monto: value };
                        }
                        return {
                          ...prevData,
                          ListOtrosGastosInscripcion: updatedList,
                        };
                      });
                    }} />
                  <label htmlFor="Otros">Otros</label>
                </div>
                <div className="col s12  m6 l4 offset-l1 input-field">
                  <input type="number" name="Descuento" id="Descuento" value={formData.Descuento} onChange={handleChange} />
                  <label htmlFor="Descuento">Descuento</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="TotAntImpuesto" id="TotAntImpuesto" value={formData.TotAntImpuesto} onChange={handleChange} />
                  <label htmlFor="TotAntImpuesto">Subtotal</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="Impuestos" id="Impuestos" value={formData.Impuestos} disabled/>
                  <label htmlFor="Impuestos">Impuestos</label>
                </div>
              </div>
              <div className="divider"></div>

              <div className="row">
                <div className="col s12 m6 offset-m6 l4 offset-l6 input-field">
                  <input type="number" name="Total" id="Total" value={formData.Total} onChange={handleChange} />
                  <label htmlFor="Total">TOTAL</label>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="col s12 m12 l6">
          <div className="card" style={{ padding: 20, margin: 20 }}>
            <span className="card-title">Pago del Vehiculo</span>
            <div className="card-content">
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="Prima_Contado" id="Prima_Contado" value={formData.Prima_Contado} onChange={handleChange} />
                  <label htmlFor="Prima_Contado">Prima / Contado</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="MonUsado" id="MonUsado" value={formData.MonUsado} onChange={handleChange} />
                  <label htmlFor="MonUsado">Usado</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="TotalC_Imp" id="TotalC_Imp" value={formData.TotalC_Imp} onChange={handleChange} />
                  <label htmlFor="TotalC_Imp">Total C/Imp.</label>
                </div>
                <div className="col s12  m6 l4 offset-l1 input-field">
                  <input type="number" name="DeudasUsado" id="DeudasUsado" value={formData.DeudasUsado} onChange={handleChange} />
                  <label htmlFor="DeudasUsado">Deudas Usado</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="MotoFinanciar" id="MotoFinanciar" value={formData.MotoFinanciar} onChange={handleChange} />
                  <label htmlFor="MotoFinanciar">Financiamiento</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="PagoContraEnt" id="PagoContraEnt" value={formData.PagoContraEnt} onChange={handleChange} />
                  <label htmlFor="PagoContraEnt">Pago Contra Ent.</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatosVentaForm;
