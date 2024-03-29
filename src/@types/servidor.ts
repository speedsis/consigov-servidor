type Contrato = {
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
  valtotal: string;
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
};

export type Servidor = {
  id: string;
  name: string;
  matricula: string;
  cpf: string;
  rg: string;
  dtemissao_rg: string;
  empresa_id: string;
  dt_nascimento: string;
  banco: string;
  agencia: string;
  conta: string;
  created_at: string;
  updated_at: string;
  orgao_id: string;
  regime_id: string;
  dt_admissao: string;
  dt_demissao: string;
  dt_aposent: string;
  ano_mes_incluso: string;
  relacao_trabalho: string;
  pazo_final_vinculo: string;
  ano_mes_atualizacao: string;
  dt_atualizacao: string;
  dt_ultima_atualizacao: string;
  dt_ultima_consulta: string;
  dt_ultima_consulta_siape: string;
  categoria: string;
  cadastro_validado: boolean;
  cadastro_ativo: boolean;
  dt_cadastro_validado: string;
  senha_servidor: string;
  dt_horo_expiracao_senha: string;
  competencia_ferias: string;
  dt_ultima_atualizacao_ferias: string;
  orgao_matricula: string;
  orgao_nome: string;
  isento_restricao_portabilidade: boolean;
  imagem: string;
  margem_consignavel_atual: number;
  margem_consignavel_anterior: number;
  margem_cartao_consignado: number;
  margem_reservada: number;
  margem_cartao_beneficio: number;
  salario_base: number;
  media_ultimos_meses: number;
  situacao_servidor_id: string;
  departamento_id: string;
  secretaria_id: string;
  vinculo_id: string;
  tipo_servico_id: string;
  classific_vinculo_funcional_id: string;
  Contrato: Contrato[];
};
