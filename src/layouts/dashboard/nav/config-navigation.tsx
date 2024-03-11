// routes
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  home: icon('ic_home'),
  consulta: icon('ic_consulta'),
  logout: icon('ic_logout'),
  services: icon('ic_services'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  extract: icon('ic_extract'),
  construction: icon('ic_construction'),
  external: icon('ic_external'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  kanban: icon('ic_kanban'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Consigov v1.0.0',
    items: [
      { title: 'Início', path: PATH_DASHBOARD.home, icon: ICONS.home },

      {
        title: 'Simulação',
        path: PATH_DASHBOARD.simulacao,
        icon: ICONS.banking,
      },

      {
        title: 'Extrato',
        path: PATH_DASHBOARD.search,
        icon: ICONS.analytics,
      },

      {
        title: 'Consulta',
        path: PATH_DASHBOARD.consulta,
        icon: ICONS.consulta,
      },

      {
        title: 'Sair',
        path: PATH_AUTH.logout,
        icon: ICONS.logout,
      },
    ],
  },
];

export default navConfig;
