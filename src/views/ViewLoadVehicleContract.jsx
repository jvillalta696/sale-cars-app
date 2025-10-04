import React, { useState, useEffect, useRef } from 'react';
import './tabs.css'
import InformacionGeneralForm from '../components/TabsContracts/InformacionGeneralForm';
import DatosVehiculoForm from '../components/TabsContracts/DatosVehiculoForm';
import DatosVentaForm from '../components/TabsContracts/DatosVentaForm';
import DatosVehiculoUsadoForm from '../components/TabsContracts/DatosVehiculoUsadoForm';
import FinanciamientoForm from '../components/TabsContracts/FinanciamientoForm';
import PaquetesMantenimientoForm from '../components/TabsContracts/PaquetesMantenimientoForm';
import ResumenForm from '../components/TabsContracts/ResumenForm';
import { VehicleNewProvider } from '../context/VehicleNewContext';
import { SellerProvider } from '../context/SellerContext';
import { ItemProvider } from '../context/ItemContext';
import { BankProvider } from '../context/BankContext';
import { contratoModel } from '../models/ContratoModel';
import ListContractModal from '../components/ListContractModal';
import { getContratoById,createContrato, updateContrato } from '../services/contrato.service';
import { useAuth } from '../context/AuthContext';
import FixedActionButton from '../components/TabsContracts/SubComponents/FixedActionButton';
import { useContract } from '../context/ContractContext';
import useCurrentDate from '../hooks/useCurrentDate.js';
/**
 * @typedef {import('../models/ContratoModel').ContratoModel} ContratoModel
 */

const ViewLoadVehicleContract = ({ setCurrentView }) => {
   const { fetchContracts } = useContract();
  const { apiConfig, currentCompany } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(/** @type {ContratoModel} */(contratoModel));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const currentDate = useCurrentDate();
  const tabs = [
    'Información General',
    'Datos del Vehículo',
    'Datos del Vehículo Usado',
    'Financiamiento',
    'Datos de Venta',
    'Paquetes de Mantenimiento',
    'Resumen',
  ];

  const validarSeccion = () => {
    switch (activeTab) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return true;
    }
  };

  const handleSelectContract = async (contract) => {
    try {
      const contractData = await getContratoById(apiConfig, currentCompany.code, contract.DocNum);
      console.log('Contrato seleccionado:', contractData);
      setFormData(contractData);
    } catch (error) {
      console.error('Error loading contract:', error);
    }

  };
  useEffect(() => {
    if(formData.Fecha === ''){
      console.log('Fecha:',currentDate);
      setFormData((prevData) => ({
        ...prevData,
        Fecha: currentDate,
      }));
    }
  }, [formData]);
  const handleCreateContract = async () => {
    setIsLoading(true);
    try {
      let response = null;
      let action = '';
      if (formData.DocNum===null){
        action = 'crear'
        console.log('Creando contrato');
          response = await createContrato(apiConfig, currentCompany.code, formData);
          setFormData((prevData) => ({
            ...prevData,
            DocNum: response.NumContrato
            ,
          }));
      }
      else{
        action = 'actualizar'
        console.log('Actualizando contrato');
        response = await updateContrato(apiConfig, currentCompany.code, formData);
      }
    
      if (response.Estado === 'Err') {       
        throw new Error(`Error al ${action} contrato: `+response.MsgError);
      }
      
      await fetchContracts();
      M.toast({ html: `Contrato ${action} correctamente`, classes: 'green' });
      console.log('Contrato creado:', response);
    } catch (error) {
      M.toast({ html: error.message, classes: 'red' });
      console.error(`Error  creating or update:`, error);
    }finally{
      setIsLoading(false);
    }
  };

  // Restaurar scroll al cambiar de tab
  useEffect(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }, [activeTab]);

  return (
      <VehicleNewProvider>
        <SellerProvider>
          <ItemProvider>
            <BankProvider>
              <div className="container white z-depth-2" style={{ minHeight: '83vh' }}>
                <div className="row">
                  <div className="col s12">
                    <h4 className="center">Contratos</h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m2 input-field" hidden={!formData.DocNum}>
                    <input
                      type="text"
                      id="numeroContrato"
                      name="numeroContrato"
                      disabled
                      value={formData.DocNum || ''}
                    />
                    <label htmlFor="numeroContrato">Número de Contrato</label>
                  </div>
                  <div className={`col s12 ${!formData.DocNum ? 'm6 offset-m3' : 'm6 offset-m1'}`}>
                    <nav>
                      <div className="nav-wrapper teal">
                        <form>
                          <div className="input-field">
                            <input id="search" type="search"
                              required
                              value={searchTerm}
                              placeholder='Buscas Contrato por Numero o Nombre de Cliente'
                              onChange={(e) => setSearchTerm(e.target.value)}
                              ref={searchInputRef}
                            />
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons" onClick={() => setSearchTerm('')}>close</i>
                          </div>
                        </form>
                      </div>
                    </nav>
                  </div>
                  <div className="col s12 m1 input-field">
                    <button
                      className="btn right"
                      onClick={() => {
                        setIsModalOpen(true);
                        const instance = M.Modal.init(document.getElementById('list-contract-model'),
                          {
                            onCloseEnd: () => {
                              if (searchInputRef.current) {
                                searchInputRef.current.value = ''; // Limpia el valor del campo de búsqueda usando la referencia
                                setSearchTerm(''); // Limpia el estado de búsqueda
                              }
                              M.updateTextFields();
                              setIsModalOpen(false);
                            }
                          });
                        instance.open();
                      }}>
                      <i className="material-icons">search</i>
                    </button>
                  </div>
                  <div className="col s12 m2 input-field" hidden={!formData.DocNum}>
                    <a
                      type="text"
                      id="numeroContrato"
                      className="btn right"
                      href={`https://db.cloud.delserint.com:466/api/report/GetReport?CodeBD=${currentCompany.code}&DocNum=${formData.DocNum}&ReportName=ContratoVenta&Format=PDF`}
                    >
                      <i className="material-icons">picture_as_pdf</i>                      
                    </a>
                    </div>
                </div>
                <ul className="tabs">
                  {tabs.map((tab, index) => (
                    <li
                      key={index}
                      className={`tab ${activeTab === index ? 'active' : ''} ${!validarSeccion() && activeTab + 1 === index ? 'disabled' : ''}`}
                      onClick={() => {
                        if (index === activeTab || (index === activeTab + 1 && validarSeccion()) || index < activeTab) {
                          setActiveTab(index);
                        }
                      }}
                    >
                      <a href="#!">{tab}</a>
                    </li>
                  ))}
                </ul>
                {
                  isLoading && (
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                  )
                }
                <div className="section">
                  <div className="row">
                    <div className="col s12">
                      <h5 className='center'>{tabs[activeTab]}</h5>
                    </div>
                  </div>

                  {activeTab === 0 && (
                    <InformacionGeneralForm
                      formData={formData}
                      setFormData={setFormData}
                      setCurrentView={setCurrentView}
                    />
                  )}
                  {activeTab === 1 && (
                    <DatosVehiculoForm 
                      formData={formData.ListVehiculoxContrato[0]} 
                      setFormData={(updatedData) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          ListVehiculoxContrato: [
                            { ...prevData.ListVehiculoxContrato[0], ...updatedData },
                          ],
                        }))}
                       setIsLoading={setIsLoading} data={formData}/>
                  )}
                  {activeTab === 2 && (
                    <DatosVehiculoUsadoForm
                      formData={formData.ListVehiculoUsadoxContrato[0] || {}}
                      setFormData={(updatedData) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          ListVehiculoUsadoxContrato: [
                            { ...prevData.ListVehiculoUsadoxContrato[0], ...updatedData },
                          ],
                        }))
                      }
                      setIsLoading={setIsLoading}
                    />
                  )}
                  {activeTab === 3 && (
                    <FinanciamientoForm formData={formData} setFormData={setFormData} />
                  )}
                  {activeTab === 4 && (
                    <DatosVentaForm formData={formData} setFormData={setFormData} />
                  )}
                  {activeTab === 5 && (
                    <PaquetesMantenimientoForm
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {activeTab === 6 && <ResumenForm formData={formData} />}
                </div>
                <div className="divider"></div>
                <div className="section">

                  <button
                    className="btn"
                    disabled={activeTab === 0}
                    onClick={() => setActiveTab(activeTab - 1)}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn right"
                    disabled={activeTab === tabs.length - 1 || !validarSeccion()}
                    onClick={() => setActiveTab(activeTab + 1)}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
              <FixedActionButton 
              onCreate={handleCreateContract} 
              data={formData}
              activeTab={activeTab}
              tabs={tabs}
              validarSeccion={validarSeccion}
              setActiveTab={setActiveTab}
              />
              <ListContractModal
                isModalOpen={isModalOpen}
                onSelectContract={handleSelectContract}
                dataSearch={searchTerm}
                onSetDataSearch={setSearchTerm} />
            </BankProvider>
          </ItemProvider>
        </SellerProvider>
      </VehicleNewProvider>
  );
};

export default ViewLoadVehicleContract;
