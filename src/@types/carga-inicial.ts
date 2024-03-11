export type ICargaInicialBase = {
  id?: string;
  consignacao_id: string;
  consignataria_id: string;
  orgao_id: string;
  parcela_contrato: number;
  prazo_contrato: number;
  valor_parcela: number;
  secretaria_id: string;
  cpf: string;
  matricula: string;
  nome_servidor: string;
  // cd_departamento?: string;
  cd_sufixo?: number;
};

export type ICargaInicial = {
  id?: string;
  descricao: string;
  total_linhas: number;
  nome_arquivo: string;
  empresa_id: string;
  CargaInicialBase: ICargaInicialBase[];
};
