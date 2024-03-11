import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
// routes e keycloak

import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

export default function RoleBasedGuard({ hasContent, roles, children }: RoleBasedGuardProp) {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  // const router = useRouter();
  let currentRole = '';
  // let avatar = '';

  // Verifica se o usuário está autenticado no Keycloak
  // if (typeof window !== 'undefined' && initialized && !keycloak?.authenticated) {
  //   router.replace(`/auth/login?from=${window!.location.pathname}`);
  //   return;
  // }

  // avatar = (keycloak?.idTokenParsed as any)?.avatar_url;
  if (initialized && keycloak?.authenticated) {
    currentRole = (keycloak?.idTokenParsed as any)?.role;
  }

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permissão negada
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Você não tem permissão para acessar esta página.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
