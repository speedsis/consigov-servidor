import { Servidor, ServidorBasic } from './servidor';

export type Rank = 'OWNER' | 'ADMIN' | 'USER';

export const RANK_VALUE: Record<Rank, Rank> = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export enum Permissions {
  Consignataria = 'Consignataria',
  ViewRelatorio = 'VisualizarRelatorio',
  VisualizarMargem = 'VisualizarMargem',
  Averbar = 'Averbar',
  CancelarSuspenderConsig = 'CancelarSuspenderConsig',
  RenegociarConsig = 'RenegociarConsig',
  SolicitarCompraDivida = 'SolicitarCompraDivida',
  CancelarCompraDivida = 'CancelarCompraDivida',
  ConfirmarCompraDivida = 'ConfirmarCompraDivida',
  FazerReservaCartao = 'FazerReservaCartao',
  CancelarSuspenderReservaCartao = 'CancelarSuspenderReservaCartao',
  ImportarArquivoCartao = 'ImportarArquivoCartao',
  ListarUsuario = 'ListarUsuario',
  CadastrarEditarUsuario = 'CadastrarEditarUsuario',
}

type PerfilAcesso = {
  id: string;
  descricao: string;
};

type CustoRoleUser = {
  id: string;
  name: string;
  permissions: string[];
};

type Note = {
  id: string;
  text: string;
  empresaId?: string;
  createdAt: string;
};

type Notification = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: 'READ' | 'PENDING' | 'EXCLUDED';
  userId: string;
  empresaId: string;
  servidorId: string;
};

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailAlternativo?: string;
  cpf: string;
  dtNascimento: string;
  password?: string;
  rank: Rank;
  banned?: boolean;
  banReason?: string;
  cargo?: string;
  usuarioConsignataria?: boolean;
  consignatariaId?: string;
  empresas: string[];
  // whitelistStatus?: WhitelistStatus;
  fone?: string;
  ramal?: string;
  fone2?: string;
  ramal2?: string;
  celular?: string;
  ipfixo?: string;
  perfilAcesso: PerfilAcesso[];
  permissions: string[];
  acessoAtivo: boolean;
  avatarUrl?: string;
  // apiToken?: ApiToken;
  // apiTokenId?: string;
  roles?: CustoRoleUser[];
  //   sessions?: UserSession[];
  isDarkTheme?: boolean;
  Note?: Note[];
  AuditLog?: AuditLog[];
  notifications?: Notification[];
};

export type UserData = {
  user: string;
  email: string;
  consignataria: {
    id: string;
    descricao: string;
  };
  unidade: {
    value: string;
    label: string;
  };
  servidor?: string;
};

export type AuditLog = {
  id?: string;
  userCpf?: string;
  servidorCpf?: string;
  matricula?: string;
  orgaoId?: string;
  empresaID: string;
  consignacaoId?: string;
  portal?: string;
  tela?: string;
  addressIP?: string;
  action: any;
  translationKey: string;
};
