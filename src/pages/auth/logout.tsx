import { useContext, useEffect } from 'react';
import { AuthContext } from 'src/auth/AuthProvider';

const Logout = () => {
  const { makeLogoutUrl } = useContext(AuthContext);

  useEffect(() => {
    const logoutUrl = makeLogoutUrl();
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  }, [makeLogoutUrl]);

  return <div>Loading...</div>;
};

export default Logout;
