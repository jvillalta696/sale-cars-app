import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import SearchVehicleForm from './SubComponents/SearchVehicleForm.jsx';
import ModalListaVehiculos from './SubComponents/ModalListaVehiculos.jsx';

const DatosVehiculoForm = ({ formData, setFormData, setIsLoading, data }) => {
  const [vehicleData, setVehicleData] = useState(formData || null);
  const [vehiculosList, setVehiculosList] = useState([]);
  const [loadingVehiculos, setLoadingVehiculos] = useState(false);

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
    M.updateTextFields();
    // Inicializar el modal de vehículos
    const modalElem = document.getElementById('modalVehiculos');
    if (modalElem) M.Modal.init(modalElem);
  }, [formData, vehicleData]);

  useEffect(() => {
    if (vehicleData) {
      setFormData(vehicleData);
    }
  }, [vehicleData]);

  useEffect(() => {
    document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    // Limpieza al desmontar: restaurar scroll global
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Handler para abrir el modal desde el SearchVehicleForm
  const handleOpenModalVehiculos = async (filters) => {
    setLoadingVehiculos(true);
    setVehiculosList([]);
    const modalElem = document.getElementById('modalVehiculos');
    if (modalElem) {
      const instance = M.Modal.getInstance(modalElem) || M.Modal.init(modalElem);
      instance.open();
    }
    // Buscar vehículos
    try {
      const vehiculos = await filters(); // filters es una función async que retorna la lista
      setVehiculosList(vehiculos || []);
    } catch (e) {
      setVehiculosList([]);
    } finally {
      setLoadingVehiculos(false);
    }
  };

  const handleSelectVehiculo = (vehiculo) => {
    setVehicleData(vehiculo);
    setVehiculosList([]);
    const modalElem = document.getElementById('modalVehiculos');
    if (modalElem) {
      const instance = M.Modal.getInstance(modalElem);
      instance && instance.close();
    }
  };

  return (
    <>
      <SearchVehicleForm
        onBuscarVehiculos={handleOpenModalVehiculos}
        setIsLoading={setIsLoading}
      />
      <ModalListaVehiculos
        vehiculos={vehiculosList}
        loading={loadingVehiculos}
        onSelect={handleSelectVehiculo}
        onClose={() => setVehiculosList([])}
      />
      {!vehicleData ? <p>No hay datos a mostrar</p> :
        <div className="card" style={{ padding: 20, margin: 20 }}>
          <div className="row">
            <div className="col s12 m6 offset-m6 input-field">
              <i className='material-icons prefix'>price_change</i>
              <input type="number" name='precio' value={vehicleData?.precio || ''} onChange={(e) => {
                setVehicleData({ ...vehicleData, precio: e.target.value})
              }} />
              <label htmlFor="precio">Precio</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Unidad || ''} disabled />
              <label htmlFor="unidad">Unidad</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Marca || ''} disabled />
              <label htmlFor="marca">Marca</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Modelo || ''} disabled />
              <label htmlFor="modelo">Modelo</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Color || ''} disabled />
              <label htmlFor="color">Color</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Ano || ''} disabled />
              <label htmlFor="ano">Año</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.VIN || ''} disabled />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Trasmision || ''} disabled />
              <label htmlFor="trasmision">Transmisión</label>
            </div>
            <div className="col s12 m3 input-field">
              <input type="text" value={vehicleData?.Combustible || ''} disabled />
              <label htmlFor="combustible">Combustible</label>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default DatosVehiculoForm;
