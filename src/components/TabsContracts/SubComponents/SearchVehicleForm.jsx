import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import { useVehicle } from '../../../context/VehicleNewContext';
import { getVehicleSaleData } from '../../../services/vehicule.service';
import { useAuth } from '../../../context/AuthContext';

const SearchVehicleForm = ({  setVehicleData, setIsLoading}) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [models, setModels] = useState([]);
  const [colors, setColors] = useState([]);
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
    } else {
      setModels([]);
      setSelectedModel('');
      setColors([]);
    }  
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      const filteredColors = vehicles.filter(item => item.Marca === selectedBrand && item.Modelo === selectedModel).map(item => item.Color);
      setColors(Array.from(new Set(filteredColors)));
    } else {
      setColors([]);
    }
  }, [selectedModel]);
  
//materialize-css needs to be initialized after the select options are updated
  useEffect(() => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, [models, colors]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      setVehicleData(null);
      const vehicleData = await getVehicleSaleData(apiConfig, currentCompany.code, selectedBrand, selectedModel, selectedColor);
      setVehicleData(vehicleData);
      setSelectedBrand('');
      setSelectedModel('');
      setSelectedColor('');
      setModels([]);
      setColors([]);
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
      <h6>Buscar Vehículo</h6>
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
        <div className="col s12 m3 offset-m1 input-field">
          <i className="material-icons prefix">directions_car</i>
          <select name='modelo' id='modelo' value={selectedModel} disabled={!selectedBrand} onChange={(e) => setSelectedModel(e.target.value)} >
            <option value="" disabled selected>Seleccione un modelo</option>
            {models.map((model, index) => (
              <option key={index} value={model}>{model}</option>
            ))}
          </select>
          <label htmlFor="modelo">Modelo</label>
        </div>
        <div className="col s12 m3 offset-m1 input-field">
          <i className="material-icons prefix">palette</i>
          <select name="color" id="color" disabled={!selectedModel} value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="" disabled selected>Seleccione un color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
          <label htmlFor="color">Color</label>
        </div>
        <div className="col s2 m1 input-field right">
          <a className="btn-floating btn-medium waves-effect waves-light teal hoverable" onClick={handleSearch}>
            <i className="material-icons">search</i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchVehicleForm;