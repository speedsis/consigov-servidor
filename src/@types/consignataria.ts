export type Empresa = {
  id: string;
  empresa_id: string;
  consignataria_id: string;
  created_at: string;
  updated_at: string;
};

export type Consignataria = {
  id: string;
  descricao: string;
  cnpj: string;
  sigla: string;
  email: string;
  banco: string;
  agencia: string;
  dv_agencia: string;
  conta: string;
  dv_conta: string;
  favorecido: string;
  instrucao: string;
  created_at: string;
  updated_at: string;
  empresa: Empresa[];
};
