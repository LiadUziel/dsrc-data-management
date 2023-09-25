export interface User {
  firstName: string;
  lastName: string;
  email: string;
  isLogged: boolean;
  roles: Role[];
  iat: number;
  exp: number;
}

export type Role = 'submitter' | 'admin' | 'reviewer' | 'teamMember';
