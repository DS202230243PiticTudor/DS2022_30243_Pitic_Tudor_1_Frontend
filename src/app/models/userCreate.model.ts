export interface UserCreate {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  email: string;
  active: boolean;
  notLocked: boolean;
}
