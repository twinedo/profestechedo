import {BASE_URL} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosResponse} from 'axios';

type ConfigProps = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  params?: object;
  data?: any;
  headers?: any;
  cancelToken?: any;
  isAuth?: boolean;
};

const instance = axios.create();

// Interceptor function
// instance.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     try {
//       // const token = await zustandStorage.getItem('@cfmcrm_access_token');
//       const token = await AsyncStorage.getItem('@cfmcrm_access_token');
//       config.headers.Authorization = `Bearer ${token}`;
//       // }
//     } catch (error) {
//       console.error('Error in token refresh:', error);
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   },
// );

// instance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async (error: AxiosError) => {
//     const {_onLogin} = authStore();
//     const cred = await AsyncStorage.getItem('credentials');
//     if (error.response?.status === 401) {
//       try {
//         var requestOptions = {
//           method: 'GET',
//           headers: {
//             Authorization: 'Basic ' + cred,
//           },
//         };

//         const response = await fetch(`${API_DEV}/token/cfmcrm`, requestOptions);
//         // console.log('res refresh', await response.json());
//         const dat = await response.json();
//         _onLogin(dat[0]);

//         return instance(error?.config!);
//       } catch (err) {
//         throw err;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export const _useAxios = async (props: ConfigProps) => {
  const {
    url,
    method,
    params,
    data,
    headers,
    cancelToken,
    isAuth = true,
  } = props;

  try {
    const response: AxiosResponse = await instance({
      baseURL: `${BASE_URL}`,
      url,
      method,
      params,
      data,
      cancelToken,
      headers,
    });

    return Promise.resolve(response);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<any>;
      if (serverError && serverError.response) {
        return Promise.reject(serverError.response);
      }
    } else {
      throw new Error('different error than axios');
    }
  }
};

export default instance;
