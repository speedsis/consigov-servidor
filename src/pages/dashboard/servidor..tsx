// @mui
import { Container } from '@mui/material';
// routes

// components
import Page from 'src/components/Page';

import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import ServidorDetalheForm from 'src/sections/@servidor';

ServidoDetalhe.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function ServidoDetalhe() {
  const { themeStretch } = useSettingsContext();

  return (
    <Page title="User: Servidor">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <ServidorDetalheForm />
      </Container>
    </Page>
  );
}
