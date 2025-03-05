import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useSeller } from '../context/SellerContext';

const ListSellersModal = ({ onSelectSeller }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { sellers, loading } = useSeller();
    const [filteredSellers, setFilteredSellers] = useState(sellers);

    useEffect(() => {
        M.updateTextFields();
        M.Modal.init(document.querySelectorAll('.modal'));
    }, []);

    useEffect(() => {
        if (searchTerm.length > 2) {
            const results = sellers.filter(seller =>
                seller.SlpName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSellers(results);
        } else {
            setFilteredSellers(sellers);
        }
    }, [searchTerm, sellers]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectSeller = (seller) => {
        onSelectSeller(seller);
        M.Modal.getInstance(document.getElementById('list-seller-modal')).close();
    };

    return (
        <div id="list-seller-modal" className="modal">
            <div className="modal-content">
                <h4>Lista de Vendedores</h4>
                <div className="row">
                    <div className="col s12 m9 input-field">
                        <i className="material-icons prefix">search</i>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Buscar por Nombre..."
                        />
                        <label htmlFor="search">Buscar:</label>
                    </div>
                </div>
                {loading ? <div className="progress"><div className="indeterminate"></div></div> :
                    <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
                        <table className="responsive-table highlight">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSellers.length > 0 ? (
                                    filteredSellers.map((s) => (
                                        <tr key={s.SlpCode} onClick={() => handleSelectSeller(s)}>
                                            <td>{s.SlpCode}</td>
                                            <td>{s.SlpName}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2">No hay vendedores</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                }

            </div>
            <div className="modal-footer">
                <button className="modal-close btn-flat">Cerrar</button>
            </div>
        </div>
    );
};

export default ListSellersModal;
