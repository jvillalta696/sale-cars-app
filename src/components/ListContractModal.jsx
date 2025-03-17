import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContract } from '../context/ContractContext';
import M from 'materialize-css';

const ListContractModal = ({isModalOpen,onSelectContract, dataSearch }) => {
  const { contracts } = useContract();
  const [searchTerm, setSearchTerm] = useState(dataSearch);
  const [filteredContracts, setFilteredContracts] = useState([]);

  const handleSearch = () => {
    console.log('searchTerm:', searchTerm);
    if (searchTerm.length > 3) {
      const filtered = contracts.ListaContratos.filter(contract =>
        contract.NombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.DocNum.toString().includes(searchTerm)
      );
      setFilteredContracts(filtered);
    } else {
      setFilteredContracts([]);
    }
  };

  useEffect(() => {
    if (dataSearch
      && dataSearch.length > 3) {
      setSearchTerm(dataSearch);
    };
  }
    , [dataSearch]);

  useEffect(() => {
    M.updateTextFields();
    handleSearch();
  }, []);

  useEffect(() => {
    if (isModalOpen && dataSearch && dataSearch.length >= 3) {
      setSearchTerm(dataSearch);
      console.log('dataSearch:', dataSearch);
      handleSearch();
    }
  }, [isModalOpen]);

  return (
    <div id='list-contract-model' className="modal">
      <div className="modal-content">
        <h4>Buscar Contrato</h4>
        <div className="row">
          <div className="col s8 input-field">
            <input
              type="text"
              placeholder="Buscar por Número o Nombre de Cliente"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col s2">
            <button className="btn" onClick={handleSearch}>
              Buscar
            </button>          
          </div>
          <div className="col s2">
              <button className="modal-close btn"
                onClick={() => { setSearchTerm(''); setFilteredContracts([]); }}>
                Cerrar
              </button>
            </div>
        </div>
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Número de Contrato</th>
              <th>Nombre del Cliente</th>
              <th>Fecha del Contrato</th>
              <th>Estado del Contrato</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract) => (
              <tr key={contract.DocNum}>
                <td>{contract.DocNum}</td>
                <td>{contract.NombreCliente}</td>
                <td>{new Date(contract.FechaContrato).toLocaleDateString()}</td>
                <td>{contract.EstadoContrato}</td>
                <td>
                  <button 
                    className="modal-close btn"
                    onClick={() => {
                      onSelectContract(contract);
                      setSearchTerm('');
                      setFilteredContracts([]);                      
                    }}
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn" onClick={() => { setSearchTerm(''); setFilteredContracts([]); }}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

ListContractModal.propTypes = {  
  ismodalOpen: PropTypes.bool.isRequired,
  onSelectContract: PropTypes.func.isRequired,
  dataSearch: PropTypes.string.isRequired,
  onSetDataSearch: PropTypes.func.isRequired,
  
};

export default ListContractModal;
