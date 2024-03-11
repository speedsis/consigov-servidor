export type ICargaMargemBase = {
  id?: string;
  matricula: string;
  nome_servidor: string;
  cpf: string;
  vinculo_id: string;
  orgao_id: string;
  valor_margem: number;
  valor_desconto: number;
  dt_nascimento: string;
  dt_admissao: string;
  dt_afastamento: string;
  sit_funcional: string;
  nu_identidade: string;
  banco: string;
  agencia: string;
  cta_bancaria: string;
  margem_cartao: number;
  margem_salarial: number;
};

export type ICargaMargem = {
  id?: string;
  descricao: string;
  total_linhas: number;
  nome_arquivo: string;
  empresa_id: string;
  CargaMargemBase: ICargaMargemBase[];
};
