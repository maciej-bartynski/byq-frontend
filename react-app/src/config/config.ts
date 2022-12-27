const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_PATH = process.env.REACT_APP_API_PATH;

const config = {
    baseUrl: BASE_URL,
    apiPath: API_PATH,
    sessionStorageAccessToken: "access_token",
    sessionStorageUser: "me"
}

export default config;