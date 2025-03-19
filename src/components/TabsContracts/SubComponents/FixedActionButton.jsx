import React, { useEffect } from 'react';

const FixedActionButton = ({ onCreate, DocNum }) => {
    useEffect(() => {
        const tooltips = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tooltips);
        const elems = document.querySelectorAll('.fixed-action-btn');
        console.log(DocNum);
        M.FloatingActionButton.init(elems,/*{
            toolbarEnabled: true
        }*/);
    }, []);
    return (
        <div className="fixed-action-btn ">
            <a className="btn-floating btn-large teal">
                <i className="large material-icons">menu</i>
            </a>
            <ul>
                {
                    DocNum === null || DocNum === undefined && (<li>
                        <a className="btn-floating teal tooltipped"
                            data-position="left"
                            data-tooltip="Crear"
                            onClick={onCreate}>
                            <i className="material-icons">save</i>
                        </a>
                    </li>)
                }

                <li>
                    <a className="btn-floating cyan dark tooltipped" data-position="left" data-tooltip="Atras">
                        <i className="material-icons ">arrow_back</i>
                    </a>
                </li>
                <li>
                    <a className="btn-floating cyan tooltipped" data-position="left" data-tooltip="Siguiente">
                        <i className="material-icons">arrow_forward</i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default FixedActionButton;