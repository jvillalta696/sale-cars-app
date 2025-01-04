import  { useEffect} from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

const VehiculoForm = ({ data }) => {
   
    useEffect(() => {
        M.updateTextFields();
    }, [])

    return (
        <div>
            <div className="card">
                <div className="card-content">
                    <h5 className='center'>Vehículo: {data.VIN}</h5>
                    <div className="row">
                        <div className="col s12 m4">
                            <label>Marca: </label>
                            <span >{data.Marca}</span>
                        </div>
                        <div className="col s12 m4">
                            <label>Estilo: </label>
                            <span>{data.Estilo}</span>
                        </div>
                        <div className="col s12 m4">
                            <label>Año: </label>
                            <span>{data.Año}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col s12 m4">
                            <label >NoMotor: </label>
                            <span >{data.NoMotor}</span>
                        </div>
                        <div className="col s12 m4">
                            <label >CodFabrica: </label>
                            <span >{data.CodFabrica}</span>
                        </div>
                        <div className="col s12 m4">
                            <label >Ultima Fech Serv: </label>
                            <span >{data.UltimaFechServ}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col s12 m4">
                            <label >ColorVehiculo: </label>
                            <span >{data.ColorVehiculo}</span>
                        </div>
                        <div className="col s12 m4">
                            <label >NoPedidoFab: </label>
                            <span >{data.NoPedidoFab}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-content">
                    <h5 className='center'>Reserva</h5>
                    <div className="row">
                        <div className="col s12 m4">
                            <label>Estado de Venta: </label>
                            <span >{data.EstadoVenta}</span>
                        </div>
                        <div className="col s12 m4">
                            <label>Fecha Reserva: </label>
                            <span>{data.FechaReserva}</span>
                        </div>
                        <div className="col s12 m4">
                            <label>Vendedor: </label>
                            <span>{data.Vendedor}</span>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col s12 m4">
                            <label >Fecha Arribo: </label>
                            <span >{data.FechaArribo}</span>
                        </div>
                        <div className="col s12 m4">
                            <label >Fecha Ven Reserva: </label>
                            <span >{data.FechaVenc_Reserva}</span>
                        </div>
                        <div className="col s12 m4">
                            <label >Observaciones: </label>
                            <span >{data.Observaciones}</span>
                        </div>                       
                    </div>
                    <div className='row'>
                        <div className="col s12 m4">
                            <label htmlFor="EntraAlmFiscal">Entrada Alm. Fiscal.</label>
                            <span>{data.EntraAlmFiscal}</span>
                        </div>
                        <div className="col s12 m4">
                            <label htmlFor="SalidaAlmFiscal">Salida Alm. Fiscal.</label>
                            <span>{data.SalidaAlmFiscal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );    
};
VehiculoForm.propTypes = {
    data: PropTypes.object.isRequired
};
export default VehiculoForm