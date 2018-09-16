import { extractKey } from '../utilities/keys';

interface IEnvironmentConfig {
  rootPath: string;
  db: {
    url: string;
    dbname: string;
    username: string;
    password: string;
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
const jwtSecret = extractKey(`${rootPath}/src/shared/keys/jwt.private.key`);

const Config: IConfig = {
  development: {
    rootPath,
    db: {
      url: 'http://localhost:8529',
      dbname: 'NLAA',
      username: 'gong',
      password: 'fj00admin',
    },
    httpPort: 3000,
    wsPort: 3001,
    jwtSecret,
    domain: 'localhost',
    httpProtocol: 'http',
    wsProtocol: 'ws',
  },
  production: {
    rootPath,
    db: {
      url: 'http://10.151.40.17:8529',
      dbname: 'NAGA',
      username: 'gong',
      password: 'fj00admin',
    },
    httpPort: +process.env.HTTP_SERVER_PORT,
    wsPort: +process.env.WS_PORT,
    jwtSecret: process.env.JWT_SECRET,
    domain: process.env.DOMAIN,
    httpProtocol: process.env.HTTP_PROTOCOL,
    wsProtocol: process.env.WS_PROTOCOL,
  },
};

export { IEnvironmentConfig, IConfig, Config };
