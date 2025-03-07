import React, { useEffect } from 'react';
import M from 'materialize-css';

const ListItems = ({ searchTerm, setSearchTerm, filteredItems, onSelectItem,handleSearch }) => {
  useEffect(() => {
    M.updateTextFields();
    M.Modal.init(document.querySelectorAll('.modal'));
  }, []);

  return (
    <div id="list-item-modal" className="modal">
      <div className="modal-content">
        <h4>Lista de Artículos</h4>
        <div className="row">
          <div className="col s12 m9 input-field">
            <i className="material-icons prefix">search</i>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value);handleSearch();}}
              placeholder="Buscar por Código o Descripción..."
            />
            <label htmlFor="search">Buscar:</label>
          </div>
        </div>
        <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
          <table className="responsive-table highlight">
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.ItemCode} onClick={() => onSelectItem(item)}>
                    <td>{item.ItemCode}</td>
                    <td>{item.ItemName}</td>
                    <td>{item.Precio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay artículos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">Cerrar</button>
      </div>
    </div>
  );
};

export default ListItems;
