import React, { useEffect } from 'react';
import M from 'materialize-css';

const PaquetesMantenimientoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      paquetesMantenimiento: {
        ...prevData.paquetesMantenimiento,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    M.updateTextFields();
  }, [formData]);

  return (
    <>
    <div className="card" style={{ padding: 20, margin: 20 }}>
      <span className="card-title">PMPs</span>
      <div className="card-content">
        <div className="row">
          <div className="col s11 input-field">
            <i className='material-icons prefix'>add_shopping_cart</i>
            <input type="search" name="s_accesorios" id="s_accesorios" placeholder='Buscar Accesorio, mantenimiento o adicional ...'/>
            <label htmlFor="s_accesorios">Accesorio</label>
          </div>
          <div className="col s1 input-field">
            <a className="btn-floating waves-light teal"><i className="material-icons">search</i></a>
          </div>
        </div>
      </div>
    </div>
    <div className="card" style={{ padding: 20, margin: 20 }}>
      <div style={{ overflow: 'scroll', height: '400px' }}>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Accesorio</td>
              <td>CDM-123456</td>
              <td>Descripción</td>
              <td>Precio</td>
              <td>Cantidad</td>
              <td>Subtotal</td>
              <td>  <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">remove</i></a></td>
            </tr>            
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default PaquetesMantenimientoForm;
