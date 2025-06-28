export interface IUser {
  id: string;
  username: string;
  name: string | null;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ISafeUser = Omit<IUser, 'password'>;
