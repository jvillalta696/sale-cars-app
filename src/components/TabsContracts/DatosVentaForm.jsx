import React, { useEffect } from 'react';
import M from 'materialize-css';

const DatosVentaForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      datosVenta: {
        ...prevData.datosVenta,
        [name]: value,
      },
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
                  <input type="number" name="U_PreLis" id="U_PreLis" />
                  <label htmlFor="U_PreLis">Precios de lista</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_Pre_Vta" id="U_Pre_Vta" />
                  <label htmlFor="U_Pre_Vta">Precio de Venta</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_Otros_L" id="U_Otros_L" />
                  <label htmlFor="U_Otros_L">Otros</label>
                </div>
                <div className="col s12  m6 l4 offset-l1 input-field">
                  <input type="number" name="U_Nota_Cre" id="U_Nota_Cre" />
                  <label htmlFor="U_Nota_Cre">Descuento</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_AntImp" id="U_AntImp" />
                  <label htmlFor="U_AntImp">Subtotal</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_Pre_Imp" id="U_Pre_Imp" />
                  <label htmlFor="U_Pre_Imp">Impuestos</label>
                </div>
              </div>
              <div class="divider"></div>

              <div className="row">
                <div className="col s12 m6 offset-m6 l4 offset-l6 input-field">
                  <input type="number" name="U_DocTotal" id="U_DocTotal" />
                  <label htmlFor="U_DocTotal">TOTAL</label>
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
                  <input type="number" name="U_Deposito" id="U_Deposito" />
                  <label htmlFor="U_Deposito">Prima / Contado</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_Mon_Usa" id="U_Mon_Usa" />
                  <label htmlFor="U_Mon_Usa">Usado</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_TotalCImpuest" id="U_TotalCImpuest" />
                  <label htmlFor="U_TotalCImpuest">Total C/Imp.</label>
                </div>
                <div className="col s12  m6 l4 offset-l1 input-field">
                  <input type="number" name="U_Deu_Usa" id="U_Deu_Usa" />
                  <label htmlFor="U_Deu_Usa">Deudas Usado</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="U_FinanciaT" id="U_FinanciaT" />
                  <label htmlFor="U_FinanciaT">Financiamiento</label>
                </div>
                <div className="col s12 m6 l4 offset-l1 input-field">
                  <input type="number" name="pago_c_ent" id="pago_c_ent" />
                  <label htmlFor="pago_c_ent">Pago Contra Ent.</label>
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
