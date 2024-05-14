import { Consignataria } from './atividade';
import { AuditLog } from './user';

export type StatusMargem =
  | 'AGUARDANDO_LIBERACAO'
  | 'BLOQUEADA'
  | 'LIBERADA'
  | 'SUSPENSA'
  | 'CANCELADA';

export type StatusContrato =
  | 'ATIVO'
  | 'INATIVO'
  | 'PENDENTE'
  | 'APROVADO'
  | 'REJEITADO'
  | 'SUSPENSO'
  | 'VENCIDO'
  | 'CANCELADO'
  | 'QUITADO'
  | 'NOVA_CONSIGNACAO';

export const STATUS_CONTRATO_VALUE: Record<StatusContrato, StatusContrato> = {
  ATIVO: 'ATIVO',
  INATIVO: 'INATIVO',
  PENDENTE: 'PENDENTE',
  APROVADO: 'APROVADO',
  REJEITADO: 'REJEITADO',
  SUSPENSO: 'SUSPENSO',
  VENCIDO: 'VENCIDO',
  CANCELADO: 'CANCELADO',
  QUITADO: 'QUITADO',
  NOVA_CONSIGNACAO: 'NOVA_CONSIGNACAO',
};

export type StatusOperacao =
  | 'AGUARDANDO_CONFIRMACAO'
  | 'CONFIRMADO'
  | 'CANCELADO'
  | 'LIBERADA'
  | 'UTILIZADO'
  | 'ENVIADA_SERVIDOR'
  | 'ENVIADA_CONSIGNATARIA'
  | 'CANCELADA_SERVIDOR'
  | 'CANCELADA_CONSIGNATARIA'
  | 'APROVADA_SERVIDOR'
  | 'APROVADA_CONSIGNATARIA';

export const STATUS_OPERACAO: Record<StatusOperacao, StatusOperacao> = {
  AGUARDANDO_CONFIRMACAO: 'AGUARDANDO_CONFIRMACAO',
  CONFIRMADO: 'CONFIRMADO',
  CANCELADO: 'CANCELADO',
  LIBERADA: 'LIBERADA',
  UTILIZADO: 'UTILIZADO',
  ENVIADA_SERVIDOR: 'ENVIADA_SERVIDOR',
  ENVIADA_CONSIGNATARIA: 'ENVIADA_CONSIGNATARIA',
  CANCELADA_SERVIDOR: 'CANCELADA_SERVIDOR',
  CANCELADA_CONSIGNATARIA: 'CANCELADA_CONSIGNATARIA',
  APROVADA_SERVIDOR: 'APROVADA_SERVIDOR',
  APROVADA_CONSIGNATARIA: 'APROVADA_CONSIGNATARIA',
};

type ADE = {
  id: string;
  ade: string;
  consignacaoId: string;
  renegociacao: boolean;
  dtProposta: string;
  dtDeferimento: string;
  dtCarencia: string;
  valContrato: number;
  valPrestacao: number;
  portabilidade: boolean;
  dtAceite: string;
  dataIndeferimento: string;
  valLiberado: number;
  numParcelas: number;
  createdAt: string;
  updatedAt: string;
};

type Parcela = {
  id: string;
  consignacaoId: string;
  servidorId: string;
  empresaId: string;
  origemmovimento: string;
  valtitulo: number;
  dtmovimento: string;
  dtvencimento: string;
  mesReferencia: number;
  anoReferencia: number;
  obstitulo: string;
  perjurosmora: number;
  flagbaixada: boolean;
  status: string;
  numparcelasadministradora: number;
  dtultimopagamento: string;
  sumvaldescconcedidotitulo: number;
  sumvalpagamentotitulo: number;
  sumvaljuroscobrado: number;
  sumvaljurosisentado: number;
  sumvaljurospostergado: number;
  sumvaljurospostergadospagos: number;
  tipocartao: string;
  nossonumero: string;
  flagativo: boolean;
  idautorizado: number;
  diasparaprotesto: number;
  dtagendacobranca: string;
  dtenviocobrancabanco: string;
  dtprocdoccobranca: string;
  flagagrupado: boolean;
  flagenviocobrancabanco: boolean;
  flagprotestado: boolean;
  idbancoenviocobranca: number;
  idcobradoratual: number;
  idctabancariarecebccobranca: number;
  idportador: number;
  idusuarioprotesto: number;
  perdescbaixaduplantecip: number;
  tipoliberadoenvio: string;
  idtitulo: string;
  digitotitulo: number;
};

type ParcelaBaixas = {
  id: string;
  consignacaoId: string;
  origemmovimento: string;
  servidorId: string;
  empresaId: string;
  usuarioId: number;
  dtpagamento: string;
  valpagamentotitulo: number;
  valdescontoconcedidotitulo: number;
  valjuroscobrado: number;
  valjurosisentado: number;
  valjurospostergado: number;
  valjurospostergadopago: number;
  flagativo: boolean;
  idcobradoratual: number;
  idtitulo: string;
  digitotitulo: number;
  situacaobaixa: string;
  createdAt: string;
  updatedAt: string;
};

export type Comprovante = {
  id: string;
  consignacaoId: string;
  tipo: string;
  serial: string;
  dataDocumento: string;
};

export type Historico = {
  id: string;
  consignacaoId: string;
  tipo: string;
  motivo: string;
  dataDocumento: string;
  numeroOficio: string;
  numeroProcesso: string;
  juizado: string;
  juiz: string;
  observacao: string;
  cadastradoPor: string;
  dataCadastro: string;
};

export type Rublica = {
  id: string;
  codigo: string;
  descricao: string;
  consignatariaId: string;
};

export type CancelarSuspenderConsignacao = {
  consignacaoId: string;
  motivo: string;
  tipo: StatusContrato;
  dataDocumento: Date;
  numeroOficio: string;
  numeroProcesso: string;
  juizado: string;
  juiz: string;
  observacao: string;
  canceladoPor: string;
  usuarioId: string;
};

type Empresa = {
  id: string;
  nome: string;
  cnpj: string;
};

export type Consignacao = {
  id: string;
  contrato: string;
  servidorId: string;
  consignatariaId: string;
  Consignataria: Consignataria;
  Rublica: Rublica;
  rublicaId: string;
  empresaId: string;
  Empresa: Empresa;
  anoReferencia: string;
  mesReferencia: string;
  parcelas: Parcela[];
  parcelaBaixas: ParcelaBaixas[];
  CancelarSuspender: CancelarSuspenderConsignacao;
  Historico: Historico[];
  Comprovante: Comprovante[];
  parcelaContrato: number;
  prazoContrato: number;
  valorParcela: number;
  parcelasPagas: number;
  parcelasPend: number;
  cdSufixo: number;
  createdAt: string;
  updatedAt: string;
  descricao: string;
  valtotal: number;
  dtCadastro: string;
  dtProcessamento: string;
  dtCancelamento: string;
  indice: number;
  saldoResidual: number;
  dtInclusao: string;
  dtFinalizacao: string;
  renegociada: boolean;
  refInicial: string;
  refFinal: string;
  origem: string;
  enviadoFolha: boolean;
  suspenso: boolean;
  inclusaoAceitaPelaFolha: boolean;
  quitacaoAceitaPelaFolha: boolean;
  motivoSuspensao: string;
  motivoInclusaoAceitaPelaFolha: string;
  motivoQuitacaoAceitaPelaFolha: string;
  registroAnterior: string;
  operador: string;
  status: StatusContrato;
  ADE: ADE[];
  AuditLog?: AuditLog;
};

export type ServidorBasic = {
  id: string;
  nome: string;
  matricula: string;
  cargo: string;
  regime: string;
  dtAdmissao?: Date | null;
  cpf: string;
  rg: string;
  margem30: number;
  margem10: number;
  margemReservada: number;
  salarioBase: number;
  salarioMinimo: number;
  salarioBruto: number;
  salarioLiquido: number;
  descontoObrigatorio: number;
};

export type Regime = {
  id: string;
  descricao: string;
};

export type Orgao = {
  id: string;
  descricao: string;
};

export type Cargo = {
  id: string;
  codigo: string;
  descricao: string;
};

export type CargoWrapper = {
  Cargo: Cargo; // Mudamos de tipo diretamente para Cargo
};

export type EmpresaOnServidor = {
  empresaId: string;
};

export type Simulacao = {
  id: string;
  valorParcelas: number;
  empresaId?: string;
  parcelas?: number;
  valorReceber: number;
  prazo: number;
  status: StatusOperacao;
  dataCadastro?: string;
  Consignatarias: Consignataria[];
};

export type SolicitaLiberacaoMargem = {
  id: string;
  valor: number;
  dias: number;
  prazo: number;
  status: StatusMargem;
  dtSolicitacao: string;
  Consignataria: Consignataria;
  Empresa: Empresa;
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

export type Servidor = {
  id?: string;
  nome?: string;
  matricula?: string;
  cpf: string;
  rg: string;
  emissorRg: string;
  dtemissaoRg: string;
  ufRg: string;
  dtNascimento: string;
  banco: string;
  agencia: string;
  conta: string;
  Regime: Regime;
  Empresas: EmpresaOnServidor[];
  dtAdmissao: string;
  Orgao: Orgao;
  Cargo: CargoWrapper[];
  regimeId: string;
  orgaoId: string;
  cargoEstavel: boolean;
  carteiraTrabalho: string;
  pis: string;
  estadoCivil: string;
  sexo: string;
  nomePai: string;
  nomeMae: string;
  nacionalidade: string;
  escolaridade: string;
  email: string;
  celular: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  margem30: number;
  margem10: number;
  salarioBase: number;
  salarioMinimo: number;
  salarioBruto: number;
  salarioLiquido: number;
  descontoObrigatorio: number;
  margemReservada: number;
  uf: string;
  cep: string;
  Consignacoes: Consignacao[];
  Proposta: Proposta[];
  ReservaCartao: ReservaCartao[];
  Simulacao: Simulacao[];
  SolicitaLiberacaoMargem: SolicitaLiberacaoMargem[];
  Notification: Notification[];
};

export type Proposta = {
  id: string;
  prazo: number;
  restante: number;
  valor: number;
  valorTotal: number;
  situacao: string;
  status: StatusOperacao;
  dataCadastro: string;
  dtProposta: string;
  dtAprovacaoCancelado: string;
  tipoNegociacao: string;
  dataProcessamento: string;
  canceladoEm: string;
  Rublica: Rublica;
};

export type MargemReservada = {
  margemReservada: number;
};

export type ReservaCartao = {
  id: string;
  valor: number;
  status: StatusOperacao;
  criadoPor: string;
  criadoEm: string;
  dtReserva: string;
};

export type ServidorMargem = {
  margem30: number;
  margem10: number;
  salarioBase: number;
  salarioMinimo: number;
  salarioBruto: number;
  salarioLiquido: number;
  descontoObrigatorio: number;
  margemReservada: number;
};
