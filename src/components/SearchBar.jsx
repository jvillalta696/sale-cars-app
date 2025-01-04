import { useState } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import mockClients from '../mockData/mockClients.json';

const SearchBar = ({ onSelectClient }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 2) {
            const results = mockClients.filter(client =>
                client.cardName.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredClients(results);
        } else {
            setFilteredClients([]);
        }
    };

    const handleSelectClient = (client) => {
        onSelectClient(client);
        setSearchTerm('');
        setFilteredClients([]);
        M.toast({ html: `Cliente ${client.cardName} seleccionado`, classes: 'green' });
    };

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
                        <div className="collection" style={{ position: 'absolute', zIndex: 1000, width: '100%' }}>
                            {filteredClients.map(client => (
                                <a key={client.id} className="collection-item" onClick={() => handleSelectClient(client)}>
                                    {client.cardName}
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
