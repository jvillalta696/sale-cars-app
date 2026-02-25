import React, { act, useEffect } from 'react';
import PropTypes from 'prop-types';
const FixedActionButton = ({ onCreate, data, activeTab, tabs, validarSeccion, setActiveTab }) => {
    const showButton = data && data.U_Estado == "1";
    
    useEffect(() => {
        const tooltips = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltips);
        const elems = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(elems,/*{
            toolbarEnabled: true
        }*/);
    }, []);

    useEffect(() => {
        // Reinicializar Materialize cuando cambie la visibilidad del botón
            setTimeout(() => {
                const tooltips = document.querySelectorAll('.tooltipped');
                M.Tooltip.init(tooltips);
                const elems = document.querySelectorAll('.fixed-action-btn');
                M.FloatingActionButton.init(elems);
            }, 100);
            console.log(showButton,data.U_Estado);
    }, [showButton]);

    return (
        <div className="fixed-action-btn ">
            <a className="btn-floating btn-large teal">
                <i className="large material-icons">menu</i>
            </a>
            <ul>
                <li>{showButton &&
                    <a className="btn-floating teal tooltipped"
                        data-position="left"
                        data-tooltip={data.DocNum ? "Actualizar" : "Crear"}
                        onClick={onCreate}>
                        <i className="material-icons">save</i>
                    </a>
                    }
                </li>
                <li>
                    <a
                        className={activeTab === 0 ? "btn-floating cyan dark tooltipped disabled" : "btn-floating cyan dark tooltipped"}
                        data-position="left"
                        data-tooltip="Atras"
                        onClick={activeTab === 0 ? undefined : () => setActiveTab(activeTab - 1)}>
                        <i className="material-icons ">arrow_back</i>
                    </a>
                </li>
                <li>
                    <a
                        className={activeTab === tabs.length - 1 || !validarSeccion() ? "btn-floating cyan dark tooltipped disabled" : "btn-floating cyan dark tooltipped"}
                        data-position="left"
                        data-tooltip="Siguiente"
                        onClick={activeTab === tabs.length - 1 || !validarSeccion() ? undefined : () => setActiveTab(activeTab + 1)}>
                        <i className="material-icons">arrow_forward</i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

FixedActionButton.propTypes = {
    onCreate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    activeTab: PropTypes.number.isRequired, // Cambiado de bool a number
    tabs: PropTypes.array.isRequired,
    validarSeccion: PropTypes.func.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};

export default FixedActionButton;