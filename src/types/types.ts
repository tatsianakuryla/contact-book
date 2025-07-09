export interface Group {
  name: string;
}

export interface Contact {
  id: string;
  name: string;
  telephoneNumber: string;
  group: Group;
}

export type Contacts = Contact[];
export type Groups = Group[];
