// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton, Box } from '@mui/material';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
import useResponsive from 'src/hooks/useResponsive';
// config
import { HEADER, NAV } from 'src/config-global';
// components

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
//

import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';

import { useContext } from 'react';
import { ServidorContext } from 'src/context/ServidorContext';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const { themeLayout } = useSettingsContext();
  const isNavHorizontal = themeLayout === 'horizontal';
  const isNavMini = themeLayout === 'mini';
  const isDesktop = useResponsive('up', 'lg');
  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP) && !isNavHorizontal;

  const { servidor } = useContext(ServidorContext);

  const renderContent = (
    <>
      <Box
        component="div"
        sx={{
          pl: 4,
          width: 280,
          height: 160,
          display: 'inline-flex',
        }}
      >
        <img src="/logo/logo1.png" height="120px" alt="Consigov" />
      </Box>

      <Box className="itens-right bg-gray-200 p-1  border rounded-lg">
        <span
          className="font-extrabold text-secondary"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          MATRÍCULA {servidor?.matricula} - JUL/2020
          <Iconify icon="eva:diagonal-arrow-right-up-fill" width={16} />
        </span>
      </Box>

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        {/* <LanguagePopover /> */}

        <NotificationsPopover />

        {/* <ContactsPopover /> */}

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.info.dark,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
          ...(isNavHorizontal && {
            width: 1,
            bgcolor: 'background.default',
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            borderBottom: `dashed 1px ${theme.palette.divider}`,
          }),
          ...(isNavMini && {
            width: `calc(100% )`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          bgcolor: theme.palette.info.darker,
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
