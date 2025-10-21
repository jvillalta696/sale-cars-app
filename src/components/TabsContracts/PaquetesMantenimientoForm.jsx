import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useItem } from '../../context/ItemContext';
import ListItems from '../ListItemsModel';

const PaquetesMantenimientoForm = ({ formData, setFormData }) => {
  const { items, fetchItems, loading } = useItem();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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
    console.log('Item seleccionado:', item);
    setFormData((prevData) => ({
      ...prevData,
      ListaGatoAdicional: [
        ...prevData.ListaGatoAdicional,
        {
          TipoItem: item.Tipo,
          ItemCode: item.ItemCode,
          ItemName: item.ItemName,
          PrecioUnid: item.PrecioUnid || item.Precio,
          Cantidad: 1,         
        },
      ],
    }));
    M.Modal.getInstance(document.getElementById('list-item-modal')).close()
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };

  const handleQuantityChange = (index, value) => {
    const newListaGatoAdicional = [...formData.ListaGatoAdicional];
    newListaGatoAdicional[index].Cantidad = value;  
    setFormData((prevData) => ({
      ...prevData,
      ListaGatoAdicional: newListaGatoAdicional,
    }));
  };

  const handleRemoveItem = (index) => {
    const newListaGatoAdicional = formData.ListaGatoAdicional.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      ListaGatoAdicional: newListaGatoAdicional,
    }));
  };

  useEffect(() => {
    if (!Array.isArray(formData.ListaGatoAdicional)) {
      setFormData(prev => ({
        ...prev,
        ListaGatoAdicional: [],
      }));
    };

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
                  {Array.isArray(formData.ListaGatoAdicional) && formData.ListaGatoAdicional.length > 0 ? formData.ListaGatoAdicional.map((item, index) => (
                    <tr key={index}>
                      <td>{item.TipoItem}</td>
                      <td>{item.ItemCode}</td>
                      <td>{item.ItemName}</td>
                      <td>{item.PrecioUnid}</td>
                      <td>
                        <input
                          type="number"
                          value={item.Cantidad}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                      </td>
                      <td>{item.PrecioUnid * item.Cantidad}</td>
                      <td>
                        <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => handleRemoveItem(index)}>
                          <i className="material-icons">remove</i>
                        </a>
                      </td>
                    </tr>
                  )): <p>No hay datos a mostrar</p> }
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
