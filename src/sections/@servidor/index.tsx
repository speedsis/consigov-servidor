import React, { useContext } from 'react';
import DashboardLayout from 'src/layouts/dashboard';
import { ServidorContext } from 'src/context/ServidorContext';
import { PrivateRoute } from 'src/auth/PrivateRoute';
import TabContext from '@mui/lab/TabContext';
import { Box, Container, Tabs, Tab, Card, Divider, TableContainer } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import { capitalCase } from 'change-case';

import useTabs from 'src/hooks/useTabs';

import Scrollbar from 'src/components/scrollbar';
import ServidorDadosForm from './list/ServidorDadosForm';
import ServidorMargem from './list/ServidorMargem';
import ServidorConsignacao from './list/ServidorConsignacao';
import ServidorProposta from './list/ServidorProposta';
import ServidorReservaCartao from './list/ServidorReservaCartao';
import ServidorSimulacao from './list/ServidorSimulacao';

ServidorDetalheForm.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function ServidorDetalheForm() {
  const [openModal, setOpenModal] = React.useState(false);
  const { servidor } = useContext(ServidorContext);
  const { themeStretch } = useSettingsContext();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('Servidor');

  const PROFILE_TABS = [
    {
      value: 'Servidor',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <ServidorDadosForm />,
    },
    {
      value: 'Margem',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ServidorMargem />,
    },
    {
      value: 'Consignacoes',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <ServidorConsignacao />,
    },
    {
      value: 'Propostas',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <ServidorProposta />,
    },
    {
      value: 'Reserva de cartao',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ServidorReservaCartao />,
    },
    {
      value: `SIMULACOES`,
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ServidorSimulacao />,
    },
  ];

  return (
    <PrivateRoute>
      <Box sx={{ mt: 10 }}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <Card>
            <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
              <TabContext value={filterStatus}>
                <Tabs
                  allowScrollButtonsMobile
                  variant="scrollable"
                  scrollButtons="auto"
                  value={filterStatus}
                  onChange={onFilterStatus}
                >
                  {PROFILE_TABS.map((tab) => (
                    <Tab
                      disableRipple
                      key={tab.value}
                      value={tab.value}
                      icon={tab.icon}
                      label={capitalCase(tab.value)}
                    />
                  ))}
                </Tabs>

                <Box sx={{ mb: 1 }} />

                <Divider />

                <Scrollbar>
                  <TableContainer
                    sx={{ minWidth: 800, minHeight: 380, position: 'relative', mt: 2 }}
                  >
                    {PROFILE_TABS.map((tab) => {
                      const isMatched = tab.value === filterStatus;
                      return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                    })}
                  </TableContainer>
                </Scrollbar>
              </TabContext>
            </Box>

            <Divider />
          </Card>
        </Container>
      </Box>
    </PrivateRoute>
  );
}
