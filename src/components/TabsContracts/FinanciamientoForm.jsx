import React, { useEffect } from 'react';
import M from 'materialize-css';

const FinanciamientoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      financiamiento: {
        ...prevData.financiamiento,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
  }, [formData]);

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
              <select name="U_EntFin" id="U_EntFin">
                <option value="" disabled selected>Seleccione un Ente financiero</option>
              </select>   
              <label htmlFor="U_EntFin">Ente Financiero</label>           
            </div>
            
            <div className="col s12 m6 input-field">
              <i className='material-icons prefix'>monetization_on</i>
              <input type="number" name="U_Financia-" id="U_Financia-" onChange={handleChange} />
              <label htmlFor="U_Financia-">Monto a financiar</label>
            </div>
          </div>                    
        </div>
      </div>
    </>
  );
};

export default FinanciamientoForm;
