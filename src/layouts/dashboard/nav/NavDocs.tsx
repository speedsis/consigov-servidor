// @mui
import { Stack, Button, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/auth/AuthProvider';
// auth

// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

export default function NavDocs() {
  const { auth } = useContext(AuthContext);

  const { translate } = useLocales();

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        display: 'block',
        textAlign: 'center',
      }}
    >
      <Box component="img" src="/assets/illustrations/illustration_docs.svg" />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {`${translate('docs.hi')}, ${(auth as any)?.family_name}`}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
          {`${translate('docs.description')}`}
        </Typography>
      </div>

      <Button variant="contained">{`${translate('docs.documentation')}`}</Button>
    </Stack>
  );
}
