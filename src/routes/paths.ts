// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_AUTH = '/auth';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  logout: path(ROOTS_AUTH, '/logout'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  home: path(ROOTS_DASHBOARD, '/home'),
  simulacao: path(ROOTS_DASHBOARD, '/simulacao'),
  consulta: path(ROOTS_DASHBOARD, '/consulta'),
  search: path(ROOTS_DASHBOARD, '/search'),
  servidor: path(ROOTS_DASHBOARD, '/servidor'),
};
