import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface Requisicao {
  id: string;
  datarequisicao: string;
  datadespacho: string;
  descricao: string;
  situacao: string;
  departamento: string;
  status: string;
  tipo: string;
}

interface TabelaSolicitacaoProps {
  requisicao: Requisicao[];
}

const TabelaSolicitacao: React.FC<TabelaSolicitacaoProps> = ({
  requisicao,
}: TabelaSolicitacaoProps) => {
  function renderizarCabecalho() {
    return (
      <TableRow>
        <TableCell className={`text-left text-xs p-2`}>ID</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Data da Requisição</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Data do Despacho</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Descrição</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Situação</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Departamento</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Status</TableCell>
        <TableCell className={`text-center text-xs p-2`}>Tipo</TableCell>
      </TableRow>
    );
  }

  function renderizarDados() {
    return requisicao?.map((req, i) => (
      <TableRow key={req.id} className={`${i % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}`}>
        <TableCell className={`text-left text-xs p-2`}>{req.id}</TableCell>
        <TableCell className={`text-left text-xs p-2`}>{req.datarequisicao}</TableCell>
        <TableCell className={`text-left text-xs p-2`}>{req.datadespacho}</TableCell>
        <TableCell className={`text-left text-xs p-2`}>{req.descricao}</TableCell>
        <TableCell className={`text-left text-xs p-2`}>{req.situacao}</TableCell>
        <TableCell className={`text-left text-xs p-2`}>{req.departamento}</TableCell>
        <TableCell className={`text-left text-xs p-2`}>{req.status}</TableCell>
        <TableCell className={`text-center text-xs p-2`}>{req.tipo}</TableCell>
      </TableRow>
    ));
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>{renderizarCabecalho()}</TableHead>
        <TableBody>{renderizarDados()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaSolicitacao;
