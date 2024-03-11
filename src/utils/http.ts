import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { first, Subject } from 'rxjs';

const http = axios.create({
  // baseURL:  process.env.NEST_API_HOST,
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
});

const makeHttp = (token?: string): AxiosInstance => {
  if (!process.browser && !token) {
    throw new Error('O token de acesso deve ser fornecido');
  }

  // console.log('retorno do process', process.env.NEXT_PUBLIC_API_URL  as string)

  http.interceptors.request.use(async (request: any) => {
    // Adicione verificações para garantir que as propriedades necessárias estejam presentes
    if (!request.headers) {
      request.headers = {};
    }

    // if (process.browser) {
    //   return addTokenByKeycloak(request);
    // } else {
    //   addToken(request, token!);
    //   return request;
    // }

    return request;
  });

  return http;
};

export const keycloakEvents$ = new Subject();

// function addTokenByKeycloak(
//   request: AxiosRequestConfig
// ): AxiosRequestConfig | Promise<AxiosRequestConfig> {
//   const keycloak = getKeycloakInstance(null as any);
//   if (keycloak?.token) {
//     addToken(request, keycloak?.token);
//     return request;
//   }

//   // console.log('resposta keycloak', keycloak?.token)

//   return new Promise((resolve, reject) => {
//     keycloakEvents$.pipe(first()).subscribe((event: any) => {
//       if (event.type === 'success' && keycloak?.token) {
//         addToken(request, keycloak?.token);

//         //  console.log('no request', request)

//         resolve(request);
//       } else {
//         reject('Unauthenticated');
//       }
//     });
//   });
// }

// function addToken(request: AxiosRequestConfig, token: string) {
//   request.headers!.Authorization = `Bearer ${token}`;

//   // request.headers["Authorization"] = `Bearer ${token}`;
// }

export default makeHttp;
