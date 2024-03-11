import { PropsWithChildren, useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import { useRouter } from 'next/router';
import { PATH_AUTH } from 'src/routes/paths';

export function PrivateRoute(props: PropsWithChildren) {
  const router = useRouter();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      router.push(PATH_AUTH.login);
    }
  }, [auth, router]);

  return auth ? props.children : null;
}
