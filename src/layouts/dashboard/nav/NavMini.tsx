// @mui
import { Stack, Box } from '@mui/material';
// config
import { NAV } from '../../../config-global';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components

import { NavSectionMini } from '../../../components/nav-section';
//
import navConfig from './config-navigation';

import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function NavMini() {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD_MINI },
      }}
    >
      {/* <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_DASHBOARD_MINI - 12,
        }}
      /> */}

      <Stack
        sx={{
          pb: 2,
          height: 1,
          bgcolor: theme.palette.grey[200],
          position: 'fixed',
          width: NAV.W_DASHBOARD_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScrollbarX,
        }}
      >
        <NavSectionMini data={navConfig} sx={{ pt: 12 }} />
      </Stack>
    </Box>
  );
}
