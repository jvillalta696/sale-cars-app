import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { useClient } from '../context/ClientContext';
import { useAuth } from '../context/AuthContext';
import { getClientByCode } from '../services/client.service';

const SearchBar = ({ onSelectClient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const { clients, loading } = useClient();
  const { currentCompany, apiConfig } = useAuth();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 3) {
      const results = clients.filter(
        (client) =>
          client.CardName.toLowerCase().includes(term.toLowerCase()) ||
          client.CardCode.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredClients(results);
    } else {
      setFilteredClients([]);
    }
  };

  const handleSelectClient = async (client) => {
    console.log(client);
    try {
      const clnt = await getClientByCode(
        apiConfig,
        currentCompany.code,
        client.CardCode
      );
      if (clnt.Estado !== 'OK') {
        throw new Error(clnt.Mensaje);
      }
      onSelectClient(clnt.SocioNegocio);
      setSearchTerm('');
      setFilteredClients([]);
      M.toast({
        html: `Cliente ${client.CardName} seleccionado`,
        classes: 'green',
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (loading) {
      setFilteredClients([]);
      setSearchTerm('');
    }
  }, [loading]);
  return (
    <nav>
      <div className="nav-wrapper teal darken-2">
        <form>
          <div className="input-field" style={{ position: 'relative' }}>
            <input
              id="search"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Buscar cliente..."
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
            {filteredClients.length > 0 && (
              <div
                className="collection"
                style={{
                  position: 'absolute',
                  zIndex: 1000,
                  width: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {filteredClients.map((client) => (
                  <a
                    key={client.CardCode}
                    className="collection-item"
                    onClick={() => handleSelectClient(client)}
                  >
                    {`${client.CardCode} - ${client.CardName}`}
                  </a>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  onSelectClient: PropTypes.func.isRequired,
};

export default SearchBar;
