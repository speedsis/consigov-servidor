import * as utils from 'src/auth/utils';

async function addTokenByKeycloak(headers: Headers, token: string | undefined): Promise<void> {
  const keycloakToken = token || utils.getToken();

  if (keycloakToken) {
    headers.append('Authorization', `Bearer ${keycloakToken}`);
  } else {
    throw new Error('Token de autenticação não encontrado');
  }
}

async function makeHttp(url: string, config: RequestInit, token?: string): Promise<Response> {
  const keycloakToken = token || utils.getToken();

  // Verifique se o token foi fornecido
  if (
    !keycloakToken ||
    keycloakToken === '' ||
    keycloakToken === 'undefined' ||
    keycloakToken === 'null'
  ) {
    console.log('Token de autenticação não encontrado');

    throw new Error('Token de autenticação não encontrado');
  }

  // Se estiver no navegador
  if (process.browser) {
    const headers =
      config.headers instanceof Headers ? config.headers : new Headers(config.headers);
    await addTokenByKeycloak(headers, keycloakToken);
    config.headers = headers;
  } else {
    // Se estiver no servidor Node.js
    // Verifique se config.headers já é uma instância de Headers
    if (!(config.headers instanceof Headers)) {
      config.headers = new Headers(config.headers);
    }
    // Adicione o token de autorização aos cabeçalhos
    config.headers.append('Authorization', `Bearer ${keycloakToken}`);
  }

  // console.log('Token retornado:', keycloakToken);
  // console.log('Configuração retornada:', config);

  return fetch(url, config);
}

export default makeHttp;
