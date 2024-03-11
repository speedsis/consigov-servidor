import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from 'src/auth/AuthProvider'; // Supondo que você tenha uma função useAuth para obter o contexto de autenticação
import { PATH_AUTH } from 'src/routes/paths';

const Callback = () => {
  const router = useRouter();
  const { push } = useRouter();
  const { login, auth } = useContext(AuthContext);

  useEffect(() => {
    const { hash } = window.location;

    if (auth) {
      push(PATH_AUTH.login);
      return;
    }

    const searchParams = new URLSearchParams(hash.replace('#', ''));
    const accessToken = searchParams.get('access_token') as string;
    const idToken = searchParams.get('id_token') as string;
    const state = searchParams.get('state') as string;
    const code = searchParams.get('code') as string;

    if (!accessToken || !idToken || !state) {
      push(PATH_AUTH.login);
      return;
    }

    login(accessToken, idToken, code, state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, auth, router]);

  return <div>Loading...</div>;
};

export default Callback;
