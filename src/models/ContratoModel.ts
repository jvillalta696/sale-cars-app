interface OtroGastoInscripcion {
  Monto: number;
}

interface VehiculoUsado {
  Unidad: string;
  Marca: string;
  VIN: string;
  Anio: string;
  Placa: string;
  Color: string;
  Tipo: string;
  PrecioRecibo: number;
  Trasmision: string;
  Modelo: string;
  Combustible: string;
}

interface Vehiculo {
  Unidad: string;
  Marca: string;
  Modelo: string;
  Ano: number;
  Placa: string;
  Color: string;
  VIN: string;
  Trasmision: string;
  Precio: number;
  Tipo: string | null;
  Combustible: string | null;
}

interface GastoAdicional {
  ItemCode: string;
  ItemName: string;
  PrecioUnid: number;
  TipoItem: number;
  Cantidad: number;
}

export interface ContratoModel {
  DocNum: number | null;
  U_Estado: string | number;
  CodCliFactura: string;
  NombCliFactura: string;
  Tipo: number;
  Opciones: string;
  Fecha: string;
  CodCliVehiculo: string;
  NombCliVehiculo: string;
  Moneda: string;
  NomTitular: string;
  CodTitular: string;
  CodVendedor: string;
  NombVendedor: string;
  PrecioVenta: number;
  Total: number;
  Prima_Contado: number;
  MonUsado: number;
  DeudasUsado: number;
  Descuento: number;
  TotAntImpuesto: number;
  PrecioLista: number;
  Otros: number;
  Impuestos: number;
  TotalC_Imp: number;
  PagContEntre: number;
  EnteFinaciero: string;
  MotoFinanciar: number;
  ListOtrosGastosInscripcion: OtroGastoInscripcion[];
  ListVehiculoUsadoxContrato: VehiculoUsado[];
  ListVehiculoxContrato: Vehiculo[];
  ListaGatoAdicional: GastoAdicional[];
}

export const contratoModel: ContratoModel = {
    DocNum: null,
    U_Estado: "1",
    CodCliFactura: "",
    NombCliFactura: "",
    Tipo: 1,
    Opciones: "",
    Fecha: "",
    CodCliVehiculo: "",
    NombCliVehiculo: "",
    Moneda: "USD",
    NomTitular: "",
    CodTitular: "",
    CodVendedor: "",
    NombVendedor: "",
    PrecioVenta: 0,
    Total: 0,
    Prima_Contado: 0,
    MonUsado: 0,
    DeudasUsado: 0.0,
    Descuento: 0.0,
    TotAntImpuesto: 0,
    PrecioLista: 0,
    Otros: 0.0,
    Impuestos: 0,
    TotalC_Imp: 0,
    PagContEntre: 0,
    EnteFinaciero: "",
    MotoFinanciar: 0,
    ListOtrosGastosInscripcion: [
        {
            Monto: 0
        }
    ],
    ListVehiculoUsadoxContrato: [
        {
            Unidad: "",
            Marca: "",
            VIN: "",
            Anio: "",
            Placa: "",
            Color: "",
            Tipo: "",
            PrecioRecibo: 0,
            Trasmision: "",
            Modelo: "",
            Combustible: ""
        }
    ],
    ListVehiculoxContrato: [ 
        {
            Unidad: "",
            Marca: "",
            Modelo: "",
            Ano: 0,
            Placa: "",
            Color: "",
            VIN: "",
            Trasmision: "",
            Precio: 0,
            Tipo: "",
            Combustible: ""
        }
    ],
    ListaGatoAdicional: [
      
    ]
};
