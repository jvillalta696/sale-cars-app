import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { useClient } from '../context/ClientContext';

const ListClientModal = ({ onSelectClient, onAddClient, type,setType }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState([]);
    const { clients, loading } = useClient();

    useEffect(() => {
        M.Modal.init(document.querySelectorAll('.modal'),{
            onCloseEnd: () => {
                handleCloseModal();
            }
        });
    }, []);

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

    const handleSelectClient = (client) => {
        client.type = type;
        onSelectClient(client);
        setFilteredClients([]);
        setSearchTerm('');
        setType(null);
        M.Modal.getInstance(document.getElementById('list-client-modal')).close();
        M.updateTextFields();
    };

    const handleCloseModal = () => {
        setType(null);
        setFilteredClients([]);
        setSearchTerm('');
    };

    
    return (
        <div id="list-client-modal" className="modal">
            { loading ? (
                <div className="modal-content">
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </div>
            ) : (
                <div className="modal-content">
                <h4>Buscar Cliente</h4>
                <div className="row">
                    <div className="col s12 m9 input-field">
                        <i className="material-icons prefix">search</i>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Buscar por Código o Nombre..."
                        />
                        <label htmlFor="search">
                            Buscar:
                        </label>
                    </div>
                </div>

                <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                    <table className="responsive-table highlight">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClients.length>0&&filteredClients.map((client,index) => (
                                <tr key={client.CardCode} onClick={() => handleSelectClient(client)}>
                                    <td>{client.CardCode}</td>
                                    <td>{client.CardName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
            <div className="modal-footer">
                <button className="btn-flat" onClick={onAddClient}>Agregar Cliente</button>
                <button className="modal-close btn-flat" onClick={handleCloseModal}>Cerrar</button>
            </div>
        </div>
    );
};

ListClientModal.propTypes = {
    onSelectClient: PropTypes.func.isRequired,
    onAddClient: PropTypes.func.isRequired,
};

export default ListClientModal;
