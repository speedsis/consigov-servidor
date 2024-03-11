export type RetornoBaixa = {
  id: string;
  consignacao_id: string;
  consignataria_id: string;
  orgao_id: string;
  parcela_contrato: string;
  prazo_contrato: string;
  valor_parcela: string;
  secretaria_id: string;
  cpf: string;
  matricula: string;
  nome_servidor: string;
  cd_sufixo?: string;
};

export type RetornoMargem = {
  id: string;
  matricula: string;
  nome_servidor: string;
  cpf: string;
  vinculo_id: string;
  orgao_id: string;
  valor_margem: string;
  valor_desconto: string;
  dt_nascimento: string;
  dt_admissao: string;
  dt_afastamento: string;
  sit_funcional: string;
  nu_identidade: string;
  banco: string;
  agencia: string;
  cta_bancaria: string;
  margem_cartao: string;
  margem_salarial: string;
};
