import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import * as utils from './utils';
import { JWTPayload } from 'jose';
import { Servidor } from 'src/@types/servidor';

type AuthContextProps = {
  auth: JWTPayload | null;
  makeLoginUrl: () => string;
  makeLogoutUrl: () => string | false;
  login: (accessToken: string, idToken: string, code: string, state: string) => JWTPayload;
  servidor: Servidor | null;
};

const initContextData: AuthContextProps = {
  auth: null,
  makeLoginUrl: utils.makeLoginUrl,
  //@ts-expect-error - this is a mock function
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  makeLogoutUrl: () => {},
  //@ts-expect-error - this is a mock function
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  servidor: {} as Servidor,
};

export const AuthContext = createContext(initContextData);

//create a provider for the login state
export const AuthProvider = (props: PropsWithChildren) => {
  const [newServidor, setServidor] = useState<Servidor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await utils.getServidor();
        setServidor(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter servidor:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // utils.getServidor().then((data) => {
  //   setServidor(data);
  //   setLoading(false);
  // });

  const makeLogin = useCallback(
    (accessToken: string, idToken: string, code: string, state: string) => {
      //@ts-expect-error - for refresh token param
      const authData = utils.login(accessToken, idToken, null, state);

      setData((oldData) => ({
        auth: authData,
        makeLoginUrl: oldData.makeLoginUrl,
        makeLogoutUrl: oldData.makeLogoutUrl,
        login: oldData.login,
        servidor: oldData.servidor,
      }));

      utils.exchangeCodeForToken(code).then((newAuthData) => {
        setData((oldData) => ({
          auth: newAuthData,
          makeLoginUrl: oldData.makeLoginUrl,
          makeLogoutUrl: oldData.makeLogoutUrl,
          login: oldData.login,
          servidor: oldData.servidor,
        }));
      });
      return authData;
    },
    []
  );

  const [data, setData] = useState({
    auth: utils.useAuth(),
    makeLoginUrl: utils.makeLoginUrl,
    makeLogoutUrl: utils.makeLogoutUrl,
    login: makeLogin,
    servidor: newServidor,
  });

  // Verifique se newServidor é null e retorne um componente de carregamento se for
  if (newServidor === null) {
    console.log('Aguardando carregamento do servidor...');
    return null; // ou algum componente de carregamento
  }

  return <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>;
};
