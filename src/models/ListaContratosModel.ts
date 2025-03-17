export interface SearchContratoModel {
  DocNum: number;
  NombreCliente: string;
  FechaContrato: string;
  EstadoContrato: number;
}

export interface ListaContratosModel {
  ListaContratos: SearchContratoModel[];
}

export const DefaultContractsList: ListaContratosModel = {
  ListaContratos: []
};
