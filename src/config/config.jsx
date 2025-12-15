// config/config.js
// const BASE_URL = "https://isnap-backend.duckdns.org"; 
const BASE_URL = "http://192.168.68.120:8080"; 
// const BASE_URL = "http://localhost:8080"; 
// const BASE_URL ="https://43.204.192.110:8080";
export default BASE_URL;


export const getFullFileUrl = (filePath) => {
  if (!filePath) return "";
  return `${BASE_URL}${filePath.startsWith("/") ? filePath : `/${filePath}`}`;
};