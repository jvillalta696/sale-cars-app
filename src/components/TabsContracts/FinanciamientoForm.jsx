import React, { useEffect } from 'react';
import M from 'materialize-css';
import { useBank } from '../../context/BankContext';

const FinanciamientoForm = ({ formData, setFormData }) => {
  const { banks } = useBank();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
  }, [formData, banks]);

  return (
    <>
      <div className="card" style={{ padding: 20, margin: 20 }}>
        <span className="card-title">
          Financiamiento
        </span>
        <div className="card-contend">
          <div className="row">
            <div className="col s12 m6 input-field">
              <i className='material-icons prefix'>store</i>
              <select name="EnteFinaciero" id="EnteFinaciero" onChange={handleChange} value={formData.EnteFinaciero} defaultValue={""}>
                <option value="" disabled selected>Seleccione un Ente financiero</option>
                {banks.map((banco) => (
                  <option key={banco.CodBanco} value={banco.NombBanco}>
                    {banco.NombBanco}
                  </option>
                ))}
              </select>
              <label htmlFor="EnteFinaciero">Ente Financiero</label>
            </div>
            
            <div className="col s12 m6 input-field">
              <i className='material-icons prefix'>monetization_on</i>
              <input type="number" name="MotoFinanciar" id="MotoFinanciar" value={formData.MotoFinanciar} onChange={handleChange} />
              <label htmlFor="MotoFinanciar">Monto a financiar</label>
            </div>
          </div>                    
        </div>
      </div>
    </>
  );
};

export default FinanciamientoForm;
