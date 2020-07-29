import { extractKey } from '../utilities/keys';

interface IEnvironmentConfig {
  rootPath: string;
  db: {
    url: string;
    dbname: string;
    username: string;
    password: string;
  };
  mssql: {
    server: string;
    database: string;
    user: string;
    password: string;
  };
  database: {
    type: string,
    name?: string,
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    domain?: string
  };
  httpPort: number;
  wsPort: number;
  jwtSecret: string;
  domain: string;
  httpProtocol: string;
  wsProtocol: string;
  validator: {
		validationError: {
			target: false,
			value: false
		}
	};
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
      url: 'http://10.151.40.17:8529',
      dbname: 'NAGA',
      username: 'gong',
      password: 'fj00admin',
    },
    mssql: {
      server: 'cws',
      database: 'TipMan',
      user: 'dfg/it08',
      password: 'G1971g',
    },
    database: {
      type: 'mssql',
      name: 'sql',
      host: 'localhost',
      port: 1433,
      username: 'gong',
      password: 'G1971g',
      database: 'test',
      domain: 'dfg'
    },
    httpPort: 4000,
    wsPort: 3001,
    jwtSecret: 'fj00admin',
    domain: 'localhost',
    httpProtocol: 'http',
    wsProtocol: 'ws',
    validator: {
      validationError: {
        target: false,
        value: false
      }
    }
  },
  production: {
    rootPath,
    db: {
      url: 'http://10.151.40.17:8529',
      dbname: 'NAGA',
      username: 'gong',
      password: 'fj00admin',
    },
    mssql: {
      server: 'cws',
      database: 'TipMan',
      user: 'dfg/it08',
      password: 'G1971g',
    },
    database: {
      type: 'mssql',
      name: 'sql',
      host: 'localhost',
      port: 1433,
      username: 'gong',
      password: 'G1971g',
      database: 'test',
      domain: 'dfg'
    },
    httpPort: +process.env.HTTP_SERVER_PORT,
    wsPort: +process.env.WS_PORT,
    jwtSecret: process.env.JWT_SECRET,
    domain: process.env.DOMAIN,
    httpProtocol: process.env.HTTP_PROTOCOL,
    wsProtocol: process.env.WS_PROTOCOL,
    validator: {
      validationError: {
        target: false,
        value: false
      }
    }
  },

};

export { IEnvironmentConfig, IConfig, Config };
