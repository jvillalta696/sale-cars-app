export interface ContactModel {
  InternalCode: number | null;
  Name: string;
  MobilePhone: string;
  Phone1: string;
  Phone2: string;
  E_Mail: string;
  FirstName: string;
  LastName: string;
  index?: number | null;
}

export const contactModel: ContactModel = {
  InternalCode: null,
  Name: '',
  MobilePhone: '',
  Phone1: '',
  Phone2: '',
  E_Mail: '',
  FirstName: '',
  LastName: '',
};


