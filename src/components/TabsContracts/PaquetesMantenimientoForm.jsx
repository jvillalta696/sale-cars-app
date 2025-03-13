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
      listaGatoAdicional: {
        ...prevData.listaGatoAdicional,
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
      listaGatoAdicional: [
        ...prevData.listaGatoAdicional,
        {
          Tipo: item.Tipo,
          ItemCode: item.ItemCode,
          ItemName: item.ItemName,
          PrecioUnid: item.PrecioUnid,
          Cantidad: 1,
          Total: item.PrecioUnid,
        },
      ],
    }));
    M.Modal.getInstance(document.getElementById('list-item-modal')).close();
  };

  const handleQuantityChange = (index, value) => {
    const newListaGatoAdicional = [...formData.listaGatoAdicional];
    newListaGatoAdicional[index].Cantidad = value;
    newListaGatoAdicional[index].Total = newListaGatoAdicional[index].PrecioUnid * value;
    setFormData((prevData) => ({
      ...prevData,
      listaGatoAdicional: newListaGatoAdicional,
    }));
  };

  const handleRemoveItem = (index) => {
    const newListaGatoAdicional = formData.listaGatoAdicional.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      listaGatoAdicional: newListaGatoAdicional,
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
                  {formData.listaGatoAdicional.map((item, index) => (
                    <tr key={index}>
                      <td>{item.tipoItem}</td>
                      <td>{item.itemCode}</td>
                      <td>{item.itemName}</td>
                      <td>{item.precioUnid}</td>
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
