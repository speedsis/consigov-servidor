import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';
import { Servidor } from 'src/@types/servidor';
import { UserData } from 'src/@types/user';
import { ServidorService } from 'src/services/servidor.service';

let isLocalhost = false;

if (typeof window !== 'undefined') {
  isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

export function makeLoginUrl() {
  const nonce = Math.random().toString(36);
  const state = Math.random().toString(36);

  // Lembre-se de armazenar com um cookie seguro (https)
  Cookies.set('nonce', nonce);
  Cookies.set('state', state);

  const loginUrlParams = new URLSearchParams({
    client_id: 'client-next',
    redirect_uri: isLocalhost
      ? 'http://localhost:3004/auth/callback'
      : 'https://servidor.consigov.com/auth/callback',
    // redirect_uri: 'https://servidor.consigov.com/auth/callback',
    response_type: 'token id_token code',
    nonce: nonce,
    state: state,
  });

  return `https://keycloak.serverconsigov.com/realms/consigov/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const tokenUrlParams = new URLSearchParams({
    client_id: 'client-next',
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: isLocalhost
      ? 'http://localhost:3004/auth/callback'
      : 'https://servidor.consigov.com/auth/callback',
    // redirect_uri: 'https://servidor.consigov.com/auth/callback',
    nonce: Cookies.get('nonce') as string,
  });

  try {
    const response = await fetch(
      'https://keycloak.serverconsigov.com/realms/consigov/protocol/openid-connect/token',

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenUrlParams.toString(),
        // mode: 'no-cors',
      }
    );

    if (!response.ok) {
      console.error('Erro na solicitação de troca de código por token');
      return null;
    }

    const data = await response.json();
    console.log('data: ', data);

    if (data && data.access_token) {
      return login(data.access_token, null, data.refresh_token);
    } else {
      console.error('Erro na resposta JSON: dados de token ausentes');
      return null;
    }
  } catch (error) {
    console.error('Erro na solicitação de troca de código por token:', error);
    throw error;
  }
}

export function login(
  accessToken: string,
  idToken: string | null,
  refreshToken?: string,
  state?: string
) {
  const stateCookie = Cookies.get('state');

  if (state && stateCookie !== state) {
    throw new Error('Invalid state');
  }

  let decodedAccessToken = null;
  let decodedIdToken = null;
  let decodedRefreshToken = null;

  try {
    decodedAccessToken = decodeJwt(accessToken);

    // console.log('decodedAccessToken: ', decodedAccessToken);

    if (idToken) {
      decodedIdToken = decodeJwt(idToken);
      saveToCookieData(decodedIdToken);
    }

    // console.log('decodedIdToken: ', decodedIdToken);

    if (refreshToken) {
      decodedRefreshToken = decodeJwt(refreshToken);
    }
  } catch (e) {
    console.error(e);
    throw new Error('Invalid token');
  }

  if (decodedAccessToken.nonce !== Cookies.get('nonce')) {
    throw new Error('Invalid nonce');
  }

  if (decodedIdToken && decodedIdToken.nonce !== Cookies.get('nonce')) {
    throw new Error('Invalid nonce');
  }

  if (decodedRefreshToken && decodedRefreshToken.nonce !== Cookies.get('nonce')) {
    throw new Error('Invalid nonce');
  }

  // console.log('accessToken: ', accessToken);
  // console.log('idToken: ', idToken);

  Cookies.set('access_token', accessToken);

  if (idToken) {
    Cookies.set('id_token', idToken);
  }

  if (decodedRefreshToken) {
    Cookies.set('refresh_token', refreshToken as string);
  }

  return decodedAccessToken;
}

export function useAuth() {
  const token = Cookies.get('access_token');

  if (!token) {
    return null;
  }

  try {
    return decodeJwt(token);
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function getToken() {
  const token = Cookies.get('access_token');

  if (!token) {
    return null;
  }

  try {
    return token;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function getTokenExpiration() {
  const token = Cookies.get('access_token');

  if (!token) {
    return null;
  }

  try {
    const decodedToken = decodeJwt(token);
    const tokenExpiration =
      decodedToken && typeof decodedToken.exp === 'number' ? decodedToken.exp * 1000 : null; // Verifica se decodedToken.exp é um número
    // const currentTime = Date.now();

    if (tokenExpiration) {
      // Verifique se tokenExpiration não é nulo ou indefinido
      return null;
    }

    return tokenExpiration; // Retorne o tempo de expiração em milissegundos
  } catch (e) {
    console.error(e);
    return null;
  }
}

export function makeLogoutUrl() {
  if (!Cookies.get('id_token')) {
    return false;
  }
  const logoutParams = new URLSearchParams({
    id_token_hint: Cookies.get('id_token') as string,
    post_logout_redirect_uri: isLocalhost
      ? 'http://localhost:3004/auth/login'
      : 'https://servidor.consigov.com/auth/login',
    // post_logout_redirect_uri: 'https://servidor.consigov.com/auth/login',
  });

  Cookies.remove('access_token');
  Cookies.remove('id_token');
  Cookies.remove('refresh_token');
  Cookies.remove('nonce');
  Cookies.remove('state');

  return `https://keycloak.serverconsigov.com/realms/consigov/protocol/openid-connect/logout?${logoutParams.toString()}`;
}

async function saveToCookieData(auth: any) {
  const userDataString = Cookies.get('userData');

  try {
    const userData: UserData = {
      user: auth?.preferred_username,
      email: auth?.email,
      consignataria: {
        id: auth?.consignataria[0].id,
        descricao: auth?.consignataria[0].descricao,
      },
      unidade: {
        value: auth?.unidade[0].value,
        label: auth?.unidade[0].label,
      },
      servidor: '90589165291',
    };

    if (userData.consignataria.id === '' || userData.unidade.value === '') {
      return;
    }

    if (userDataString) {
      Cookies.remove('userData');
    }

    // Define o novo userData
    Cookies.set('userData', JSON.stringify(userData), { expires: 7 });

    console.log('auth resposta : ', userData);
  } catch (error) {
    console.error('Erro ao fazer parsing do JSON:', error);
  }
}

export async function getServidor(): Promise<Servidor> {
  const token = Cookies.get('access_token');

  if (!token) {
    return {} as Servidor;
  }

  try {
    const data = await new ServidorService().getServidor(
      'clukjlqxp0000ik9inf67gl1f',
      '01936830248',
      'cpf'
    );

    return data;
  } catch (error) {
    console.error('Erro ao obter servidor:', error);
    return {} as Servidor;
  }
}

export function userData() {
  const userDataString = Cookies.get('userData');
  if (userDataString) {
    try {
      return JSON.parse(userDataString);
    } catch (error) {
      console.error('Erro ao fazer parsing do JSON:', error);
    }
  }
  return null;
}
