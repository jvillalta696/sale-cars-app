import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useVehicle } from '../../../context/VehicleNewContext';
import { getVehicleSaleData } from '../../../services/vehicule.service';
import { useAuth } from '../../../context/AuthContext';

const SearchVehicleForm = ({  setVehicleData, setIsLoading}) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCondicion, setSelectedCondicion] = useState('');
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [condiciones, setCondiciones] = useState([]);
  const { vehicles } = useVehicle();
  const [data, setData] = useState(null);
  const { currentCompany,  apiConfig } = useAuth();

  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      const filteredModels = vehicles.filter(item => item.Marca === selectedBrand).map(item => item.Modelo);
      setModels(Array.from(new Set(filteredModels)));
      setSelectedModel('');
      setColors([]);
      setSelectedColor('');
      setCondiciones([]);
      setSelectedCondicion('');
    } else {
      setModels([]);
      setSelectedModel('');
      setColors([]);
      setSelectedColor('');
      setCondiciones([]);
      setSelectedCondicion('');
    }  
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      const filteredColors = vehicles.filter(item => item.Marca === selectedBrand && item.Modelo === selectedModel).map(item => item.Color);
      setColors(Array.from(new Set(filteredColors)));
      setSelectedColor('');
      setCondiciones([]);
      setSelectedCondicion('');
    } else {
      setColors([]);
      setSelectedColor('');
      setCondiciones([]);
      setSelectedCondicion('');
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedColor) {
      const filteredCondiciones = vehicles.filter(item => item.Marca === selectedBrand && item.Modelo === selectedModel && item.Color === selectedColor).map(item => item.Condicion);
      setCondiciones(Array.from(new Set(filteredCondiciones)));
    } else {
      setCondiciones([]);
      setSelectedCondicion('');
    }
  }, [selectedColor]);
  
//materialize-css needs to be initialized after the select options are updated
  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, [models, colors, condiciones]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      setVehicleData(null);
      const vehicleData = await getVehicleSaleData(apiConfig, currentCompany.code, selectedBrand, selectedModel, selectedColor, selectedCondicion);
      setVehicleData(vehicleData);
      setSelectedBrand('');
      setSelectedModel('');
      setSelectedColor('');
      setSelectedCondicion('');
      setModels([]);
      setColors([]);
      setCondiciones([]);
    } catch (error) {
      console.error(error);
      setVehicleData(null);
    }
    finally
    {
      setIsLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '20px', margin: '20px' }}>
      <div className="row">
        <div className="col s2 m4">
          <h6>Buscar Vehículo</h6> 
        </div>
        <div className="col s4 m1 input-field right">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable" onClick={handleSearch}>
            <i className="material-icons">search</i>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">directions_car</i>
          <select name='marca' id='marca' value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
            <option value="" disabled selected>Seleccione una marca</option>
            {[...
// @ts-ignore
            new Set(vehicles.map(item => item.Marca))].map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <label htmlFor="marca">Marca</label>
        </div>
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">directions_car</i>
          <select name='modelo' id='modelo' value={selectedModel} disabled={!selectedBrand} onChange={(e) => setSelectedModel(e.target.value)} >
            <option value="" disabled selected>Seleccione un modelo</option>
            {models.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
          <label htmlFor="modelo">Modelo</label>
        </div>
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">palette</i>
          <select name="color" id="color" disabled={!selectedModel} value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="" disabled selected>Seleccione un color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
          <label htmlFor="color">Color</label>
        </div>
        <div className="col s12 m3 input-field">
          <i className="material-icons prefix">star</i>
          <select name="condicion" id="condicion" disabled={!selectedColor} value={selectedCondicion} onChange={(e) => setSelectedCondicion(e.target.value)}>
            <option value="" disabled selected>Seleccione condición</option>
            {condiciones.map((condicion, index) => (
              <option key={index} value={condicion}>{condicion}</option>
            ))}
          </select>
          <label htmlFor="condicion">Condición</label>
        </div>
      </div>
    </div>
  );
};

export default SearchVehicleForm;