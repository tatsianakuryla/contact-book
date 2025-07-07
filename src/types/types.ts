export interface Group {
  group: string;
}

export interface Contact {
  name: string;
  telephoneNumber: string;
  group: Group;
}

export type Contacts = Contact[];
export type Groups = Group[];
