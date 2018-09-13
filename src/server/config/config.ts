import { extractKey } from '../utilities/keys';

interface IEnvironmentConfig {
  rootPath: string;
  db: {
<<<<<<< HEAD
    url: string;
    databasename: string,
    user: string;
    password: string;
=======
    url: string,
    dbname: string,
    username: string,
    password: string
>>>>>>> original
  };
  httpPort: number;
  wsPort: number;
  jwtSecret: string;
  domain: string;
  httpProtocol: string;
  wsProtocol: string;
}

interface IConfig {
  [key: string]: IEnvironmentConfig;
  development: IEnvironmentConfig;
  production: IEnvironmentConfig;
}

const rootPath = process.cwd();
const jwtSecret = extractKey(`${rootPath}/keys/jwt.private.key`);

const Config: IConfig = {
  development: {
    rootPath,
    db: {
      url: 'http://10.151.40.17:8529',
<<<<<<< HEAD
      databasename: 'NLAA',
      user: 'root',
      password: 'fj00admin',
    },
    httpPort: 3000,
    wsPort: 3001,
    jwtSecret: 'fj00admin',
    domain: 'localhost',
    httpProtocol: 'http',
    wsProtocol: 'ws',
=======
      dbname : 'NLAA',
      username: 'gong',
      password: 'fj00admin'
    },
    httpPort: 3000,
    wsPort: 3001,
    jwtSecret,
    domain: 'localhost',
    httpProtocol: 'http',
    wsProtocol: 'ws'
>>>>>>> original
  },
  production: {
    rootPath,
    db: {
<<<<<<< HEAD
      url: process.env.DB_URL,
      databasename: 'NLAA',
      user: 'root',
      password: 'fj00admin',
    },
    httpPort: +process.env.HTTP_SERVER_PORT,
    wsPort: +process.env.WS_PORT,
    jwtSecret: process.env.JWT_SECRET || 'fj00admin',
    domain: process.env.DOMAIN,
    httpProtocol: process.env.HTTP_PROTOCOL,
    wsProtocol: process.env.WS_PROTOCOL,
  },
};

export { IEnvironmentConfig, IConfig, Config };
=======
      url: 'http://10.151.40.17:8529',
      dbname: 'NAGA',
      username: 'gong',
      password: 'fj00admin'
    },
    httpPort: +process.env.HTTP_SERVER_PORT,
    wsPort: +process.env.WS_PORT,
    jwtSecret: process.env.JWT_SECRET,
    domain: process.env.DOMAIN,
    httpProtocol: process.env.HTTP_PROTOCOL,
    wsProtocol: process.env.WS_PROTOCOL
  }
};

export {
  IEnvironmentConfig,
  IConfig,
  Config
};
>>>>>>> original
