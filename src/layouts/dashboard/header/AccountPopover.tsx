import { useContext, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';

// components
import { CustomAvatar } from 'src/components/custom-avatar';
import { useSnackbar } from 'src/components/snackbar';
import MenuPopover from 'src/components/menu-popover';
import { IconButtonAnimate } from 'src/components/animate';

import { PATH_AUTH } from 'src/routes/paths';
import { AuthContext } from 'src/auth/AuthProvider';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/dashboard/home',
  },
  {
    label: 'Perfil',
    linkTo: '/',
  },
  // {
  //   label: 'Configurações',
  //   linkTo: '/',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { auth } = useContext(AuthContext);

  const router = useRouter();

  const { replace, push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      router.push(PATH_AUTH.logout);
    } catch (error) {
      enqueueSnackbar('Não é possível sair!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    push(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar
          src="/avatar/ally.jpeg"
          alt="CONSIGOV"
          // src={(keycloak?.idTokenParsed as any)?.avatar_url}
          // alt={(keycloak?.idTokenParsed as any)?.family_name}
          name={'CONSIGOV'}
        />
      </IconButtonAnimate>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {(auth as any)?.family_name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {(auth as any)?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Sair
        </MenuItem>
      </MenuPopover>
    </>
  );
}
