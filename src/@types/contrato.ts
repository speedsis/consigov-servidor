export type Contrato = {
  id: string;
  contrato: string;
  empresa_id: string;
  cargainicial_id: string;
  servidor_id: string;
  consignacao_id: string;
  consignataria_id: string;
  orgao_id: string;
  secretaria_id: string;
  parcela_contrato: number;
  prazo_contrato: number;
  valor_parcela: number;
  parcelas_pagas: number;
  parcelas_pend: number;
  cd_sufixo: number;
  created_at: string;
  updated_at: string;
  descricao: string;
  valtotal: number;
  val_mensal: number;
  total_parcelas: number;
  indice: number;
  saldo_residual: number;
  dt_inclusao: string;
  dt_finalizacao: string;
  renegociada: boolean;
  ref_inicial: string;
  ref_final: string;
  tiposervico: string;
  origem: string;
  enviado_folha: boolean;
  suspenso: boolean;
  inclusao_aceita_pela_folha: boolean;
  quitacao_aceita_pela_folha: boolean;
  motivo_suspensao: string;
  motivo_inclusao_aceita_pela_folha: string;
  motivo_quitacao_aceita_pela_folha: string;
  registro_anterior: string;
  operador: string;
  status: string;
  Servidor: Servidor;
  Empresa: Empresa;
  Consignataria: Consignataria;
  Consignacao: Consignacao;
  CargaInicial: CargaInicial;
  Orgao: Orgao;
  Secretaria: Secretaria;
};

export type Servidor = {
  name: string;
  matricula: string;
  cpf: string;
  dt_nascimento: string;
  salario_base: number;
};

export type Empresa = {
  id: string;
  nome: string;
  cnpj: string;
  razao_social: string;
};

export type Consignataria = {
  id: string;
  descricao: string;
  cnpj: string;
  sigla: string;
};

export type Consignacao = {
  id: string;
  descricao: string;
};

export type CargaInicial = {
  id: string;
  descricao: string;
};

export type Orgao = {
  id: string;
  descricao: string;
};

export type Secretaria = {
  id: string;
  descricao: string;
};
