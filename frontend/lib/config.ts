interface DatabaseConfig {
    id: string;
  }
  
  interface Config {
    endpoint: string;
    key: string;
    database: DatabaseConfig;
    container: DatabaseConfig;
  }
  
  const config: Config = {
    endpoint: process.env.COSMOS_ENDPOINT || '',
    key: process.env.COSMOS_KEY || '',
    database: {
      id: 'Bachelors', // Your database name
    },
    container: {
      id: 'Users', // Your container name
    },
  };
  
  export default config;
  