import DatabaseConfig from "./database.config";


const AppConfig = () => ({
    environment: process.env.NODE_ENV,
    port: process.env.NODE_PORT,
    host: process.env.NODE_HOST,
    database: {
        ...DatabaseConfig()
    }
});

export default AppConfig;