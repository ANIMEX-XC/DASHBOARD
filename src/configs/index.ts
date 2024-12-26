export const CONFIGS = {
  env: import.meta.env.VITE_APP_STAGE || 'development',
  baseUrl: 'http://localhost:8000/api/v1', //'https://jasaapk.us/fresh/api/v1',
  localStorageKey: 'qwerty',
  uploadFileUrl: 'http://localhost:8000/api/v1/upload-file/products-images',
  tokenKeyLocalStorage: 'qwerty',
  tokenSecret: 'qwerty'
}
