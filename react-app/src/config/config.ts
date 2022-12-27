const API_SERVER = process.env.REACT_APP_API_SERVER;
const PROXY_SERVER = process.env.REACT_APP_STATIC_SERVER;
const API_PATH = process.env.REACT_APP_API_PATH;
const AUTH_CONFIG_PATH = process.env.REACT_APP_AUTH_CONFIG_PATH;
const SESSION_STORAGE_ACCESS_TOKEN = process.env.REACT_APP_SESSION_STORAGE_ACCESS_TOKEN;
const SESSION_STORAGE_USER = process.env.REACT_APP_SESSION_STORAGE_USER;
const DEVELOPMENT_USER_PATH = process.env.REACT_APP_DEVELOPMENT_USER_PATH;

if (!SESSION_STORAGE_USER || !SESSION_STORAGE_ACCESS_TOKEN) throw new Error(`SessionStorage user not specified`);

const config = {
    apiServer: API_SERVER,
    proxyServer: PROXY_SERVER,
    apiPath: API_PATH,
    authConfigPath: AUTH_CONFIG_PATH,
    sessionStorageAccessToken: SESSION_STORAGE_ACCESS_TOKEN,
    sessionStorageUser: SESSION_STORAGE_USER,
    developmentUserPath: DEVELOPMENT_USER_PATH,
}

export default config;