interface DatabaseConfig {
    id: string;
  }
  
  interface ContainerConfig {
    id: string;
  }
  
  interface Config {
    endpoint: string;
    key: string;
    database: DatabaseConfig;
  }
  
  const config: Config = {
    endpoint: 'https://sudheeps.documents.azure.com:443/',
    key: 'z24k8ykchU67wFyV0aG0mBmH99y4lWXk2tGWpAIEYsrUzERSeTtBS1zAOdliTx9wkyn5bCculmzNACDbW3bsGg==',
    database: {
      id: 'Bachelors',
    },
  };
  
  export default config;
  