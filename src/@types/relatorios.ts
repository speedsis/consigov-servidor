export type Consignacao = {
  id: string;
  descricao: string;
};

type Servidor = {
  name: string;
  matricula: string;
  cpf: string;
};

export type RelAnalitico = {
  id: string;
  contrato: string;
  valor_parcela: number;
  Servidor: Servidor;
  Consignacao: Consignacao;
};
