/* interfaces */

export interface UserType {
  _id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface TokensPair {
  access: string | null;
  refresh: string | null;
}

export interface UserFormData {
  email: string;
  password: string;
  username: string;
}

/* enumerations */

export enum SigningKind {
  get = 0,
  create = 1,
}
