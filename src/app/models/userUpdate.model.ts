export interface UserUpdate {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  newUsername: string;
  role: string;
  email: string;
  newEmail: string;
  active: boolean;
  notLocked: boolean;
}
