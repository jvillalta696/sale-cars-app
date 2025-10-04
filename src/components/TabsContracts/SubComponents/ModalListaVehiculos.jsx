import React, { useEffect } from 'react';
import M from 'materialize-css';

const ModalListaVehiculos = ({ vehiculos, loading, onSelect, onClose }) => {
  // Limpieza de scroll al cerrar el modal
  const handleClose = () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    onClose && onClose();
  };

  useEffect(() => {
    const elem = document.getElementById('modalVehiculos');
    const instance = M.Modal.init(elem, {
      onCloseEnd: handleClose
    });
    // Abrir el modal automáticamente cuando se monta
    instance.open();
    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <div id="modalVehiculos" className="modal">
      <div className="modal-content">
        <h5>Seleccione un vehículo</h5>
        {loading ? (
          <div className="progress"><div className="indeterminate"></div></div>
        ) : vehiculos.length === 0 ? (
          <p>No hay vehículos encontrados.</p>
        ) : (
          <ul className="collection">
            {vehiculos.map((vehiculo, idx) => (
              <li
                key={vehiculo.Unidad || idx}
                className="collection-item"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  onSelect(vehiculo);
                  const instance = M.Modal.getInstance(document.getElementById('modalVehiculos'));
                  instance && instance.close();
                  // Restaurar scroll también al seleccionar
                  document.body.style.overflow = '';
                  document.documentElement.style.overflow = '';
                }}
              >
                <b>{vehiculo.Marca} {vehiculo.Modelo}</b> - Color: {vehiculo.Color} - Unidad: {vehiculo.Unidad}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat" onClick={handleClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalListaVehiculos;
