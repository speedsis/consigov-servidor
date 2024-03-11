// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';

// components
import { CustomAvatar } from 'src/components/custom-avatar';
import { AuthContext } from 'src/auth/AuthProvider';
import { useContext } from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { auth } = useContext(AuthContext);

  return (
    <Link underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar
          src={'/assets/icons/hidra-preview.svg'}
          alt={(auth as any)?.family_name}
          name={(auth as any)?.family_name}
        />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {(auth as any)?.family_name}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {'ROLE-ADMIN'}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
