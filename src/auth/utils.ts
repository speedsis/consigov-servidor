import { useRouter } from 'next/router';
import { decodeJwt } from 'jose';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { PATH_AUTH } from 'src/routes/paths';

let isLocalhost = false;

if (typeof window !== 'undefined') {
  isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

export function makeLoginUrl() {
  // const nonce = Math.random().toString(36);
  // const state = Math.random().toString(36);

  // // Lembre-se de armazenar com um cookie seguro (https)
  // Cookies.set('nonce', nonce);
  // Cookies.set('state', state);

  // const loginUrlParams = new URLSearchParams({
  //   client_id: 'client-next',
  //   redirect_uri: isLocalhost
  //     ? 'http://localhost:3004/auth/callback'
  //     : 'https://app.consigov.com/auth/callback',
  //   // redirect_uri: 'https://app.consigov.com/auth/callback',
  //   response_type: 'token id_token code',
  //   nonce: nonce,
  //   state: state,
  // });

  // return `https://keycloak.serverconsigov.com/realms/consigov/protocol/openid-connect/auth?${loginUrlParams.toString()}`;

  return `https://www.cesodigital.com.br/login`;
}

export async function exchangeCodeForToken(code: string) {
  const tokenUrlParams = new URLSearchParams({
    client_id: 'client-next',
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: isLocalhost
      ? 'http://localhost:3004/auth/callback'
      : 'https://app.consigov.com/auth/callback',
    // redirect_uri: 'https://app.consigov.com/auth/callback',
    nonce: Cookies.get('nonce') as string,
  });

  console.log('tokenUrlParams: ', tokenUrlParams.values());

  console.log('code: ', code);

  console.log('nonce: ', Cookies.get('nonce') as string);

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

    console.log('response: ', response);

    if (
      !response.ok ||
      response.status === 400 ||
      response.status === 500 ||
      response.status === 404
    ) {
      console.error('Erro na solicitação de troca de código por token');
    }

    if (response.status === 200 && response.ok && response.json.length > 0) {
      console.log('response: ', response);

      const data = await response.json();
      console.log('data: ', data);

      return login(data.access_token, null, data.refresh_token);
    } else {
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

    if (idToken) {
      decodedIdToken = decodeJwt(idToken);
    }

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

  console.log('accessToken: ', accessToken);
  console.log('idToken: ', idToken);

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
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    if (!auth) {
      router.push(PATH_AUTH.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return getAuth();
}

export function getAuth() {
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

export function makeLogoutUrl() {
  if (!Cookies.get('id_token')) {
    return false;
  }
  const logoutParams = new URLSearchParams({
    id_token_hint: Cookies.get('id_token') as string,
    post_logout_redirect_uri: isLocalhost
      ? 'http://localhost:3004/auth/login'
      : 'https://app.consigov.com/auth/login',
    // post_logout_redirect_uri: 'https://app.consigov.com/auth/login',
  });

  Cookies.remove('access_token');
  Cookies.remove('id_token');
  Cookies.remove('refresh_token');
  Cookies.remove('nonce');
  Cookies.remove('state');

  return `https://keycloak.serverconsigov.com/realms/consigov/protocol/openid-connect/logout?${logoutParams.toString()}`;
}
