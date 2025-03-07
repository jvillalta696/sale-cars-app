import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useItem } from '../../context/ItemContext';
import ListItems from '../ListItemsModel';

const PaquetesMantenimientoForm = ({ formData, setFormData }) => {
  const { items, fetchItems, loading } = useItem();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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

  const handleSearch = () => {
    if (searchTerm.length > 2) {
      const results = items.filter(item =>
        item.ItemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ItemCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems(items);
    }
    M.Modal.getInstance(document.getElementById('list-item-modal')).open();
  };

  const handleSelectItem = (item) => {
    setFormData((prevData) => ({
      ...prevData,
      paquetesMantenimiento: [
        ...prevData.paquetesMantenimiento,
        {
          Tipo: item.Tipo,
          ItemCode: item.ItemCode,
          ItemName: item.ItemName,
          Precio: item.Precio,
          Cantidad: 1,
          Total: item.Precio,
        },
      ],
    }));
    M.Modal.getInstance(document.getElementById('list-item-modal')).close();
  };

  const handleQuantityChange = (index, value) => {
    const newPaquetesMantenimiento = [...formData.paquetesMantenimiento];
    newPaquetesMantenimiento[index].Cantidad = value;
    newPaquetesMantenimiento[index].Total = newPaquetesMantenimiento[index].Precio * value;
    setFormData((prevData) => ({
      ...prevData,
      paquetesMantenimiento: newPaquetesMantenimiento,
    }));
  };

  const handleRemoveItem = (index) => {
    const newPaquetesMantenimiento = formData.paquetesMantenimiento.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      paquetesMantenimiento: newPaquetesMantenimiento,
    }));
  };

  useEffect(() => {
    M.updateTextFields();
    M.Modal.init(document.querySelectorAll('.modal'));
  }, []);

  return (
    <>
      {loading ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <>
          <div className="card" style={{ padding: 20, margin: 20 }}>
            <span className="card-title">PMPs</span>
            <div className="card-content">
              <div className="row">
                <div className="col s11 input-field">
                  <i className='material-icons prefix'>add_shopping_cart</i>
                  <input
                    type="search"
                    name="s_accesorios"
                    id="s_accesorios"
                    placeholder='Buscar Accesorio, mantenimiento o adicional ...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <label htmlFor="s_accesorios">Accesorio</label>
                </div>
                <div className="col s1 input-field">
                  <a className="btn-floating waves-light teal" onClick={handleSearch}>
                    <i className="material-icons">search</i>
                  </a>
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
                  {formData.paquetesMantenimiento.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Tipo}</td>
                      <td>{item.ItemCode}</td>
                      <td>{item.ItemName}</td>
                      <td>{item.Precio}</td>
                      <td>
                        <input
                          type="number"
                          value={item.Cantidad}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                      </td>
                      <td>{item.Total}</td>
                      <td>
                        <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => handleRemoveItem(index)}>
                          <i className="material-icons">remove</i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ListItems
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredItems={filteredItems}
            onSelectItem={handleSelectItem}
            handleSearch={handleSearch}
          />
        </>
      )}
    </>
  );
};

export default PaquetesMantenimientoForm;
