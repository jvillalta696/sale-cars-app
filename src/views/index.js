import ViewFormClientes from './ViewFormClientes';
import ViewWelcome from './ViewWelcome';
import ViewVehicleMasterData from './ViewVehicleMasterData';
import ViewContractSales from './ViewContractSales';
import ViewLoadVehicleContract from './ViewLoadVehicleContract';
import ViewScheduleDeliveries from './ViewScheduleDeliveries';
import ViewConfigure from './ViewConfigure';

// Import other views here

const views = [
  { name: 'Clientes', component: ViewFormClientes },
  { name: 'Welcome', component: ViewWelcome },
  { name: 'VehicleMasterData', component: ViewVehicleMasterData },
  { name: 'ContractSales', component: ViewContractSales },
  { name: 'LoadVehicleContract', component: ViewLoadVehicleContract },
  { name: 'ScheduleDeliveries', component: ViewScheduleDeliveries },
  { name: 'Configure', component: ViewConfigure },
  // Add other views here
];

export default views;
