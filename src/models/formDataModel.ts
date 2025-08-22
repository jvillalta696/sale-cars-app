import { ContactModel } from './contactModel';

export interface FormDataModel {
  CardName: string;
  CardCode: string;
  GroupCode: string;
  Address: string;
  EstCivil: string;
  Phone1: string;
  Phone2: string;
  Fax: string;
  GlblLocNum: string;
  LictradNum: string;
  Currency: string;
  Email: string;
  TypeID?: string;
  Contacto: ContactModel[];
}

const formDataModel: FormDataModel = {
  CardName: '',
  CardCode: '',
  GroupCode: '',
  Address: '',
  EstCivil: '',
  Phone1: '',
  Phone2: '',
  Fax: '',
  GlblLocNum: '',
  LictradNum: '',
  Currency: 'USD',
  Email: '',
  Contacto: [],
};

export default formDataModel;
