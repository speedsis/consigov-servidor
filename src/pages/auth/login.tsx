import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeLoginUrl } from 'src/auth/utils';
import { AuthContext } from 'src/auth/AuthProvider';
import { PATH_DASHBOARD } from 'src/routes/paths';

const Login = () => {
  const { auth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = makeLoginUrl();

    if (!auth) {
      router.push(redirectUrl);
    } else {
      router.push(PATH_DASHBOARD.home);
    }
  }, [auth, router]);

  // Retorne um componente React ou um valor primitivo
  return <div>Loading...</div>;
};

export default Login;
