export interface IUser {
<<<<<<< HEAD
  _key: string ;
  roles: string[];
  email: string;
  salt: string;
  hashedPassword: string;
  name: String;
  birthed: String;
  title: String;
  gender: String;
=======
  method: string;
  roles: string[];
  local: {
    email: string;
    salt: string;
    hashedPassword: string;
    roles: string[];
  };
  google: {
    id: string;
    email: string;
    displayName: string;
  };
  facebook: {
    id: string;
    email: string;
  };
  twitter: {
    id: string;
    username: string;
    displayName: string;
  };
>>>>>>> original
}
