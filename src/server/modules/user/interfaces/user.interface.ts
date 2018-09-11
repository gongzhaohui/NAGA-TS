export interface IUser {
  _key: string ;
  roles: string[];
  email: string;
  salt: string;
  hashedPassword: string;
  name: String;
  birthed: String;
  title: String;
  gender: String;
}
