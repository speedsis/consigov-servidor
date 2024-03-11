import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface Financeiro {
  id: string;
  parcela: number;
  vencimento: string;
  valor: number;
  juros: number;
  devido: number;
}

interface TabelaBoletoProps {
  financeiro: Financeiro[];
}

export default function TabelaBoleto(props: TabelaBoletoProps) {
  function rendereizarCabecalho() {
    return (
      <TableRow>
        <TableCell className={`text-left text-xs p-2`}>Parcela</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Vencimento</TableCell>
        <TableCell className={`text-right text-xs p-2`}>Valor</TableCell>
        <TableCell className={`text-right text-xs p-2`}>Juros</TableCell>
        <TableCell className={`text-right text-xs p-2`}>Valor Devido</TableCell>
        {/* {exibirAcoes ?  <TableCell className={`text-center p-2`}>Ações</TableCell> : false} */}
      </TableRow>
    );
  }

  function renderizarDados() {
    return props.financeiro?.map((finan, i) => (
      <TableRow key={finan.id} className={`${i % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}`}>
        <TableCell className={`text-left text-xs p-2`}> {finan.id} </TableCell>
        <TableCell className={`text-left text-xs p-2`}> {finan.vencimento} </TableCell>
        <TableCell className={`text-right text-xs p-2`}> {finan.valor} </TableCell>
        <TableCell className={`text-right text-xs p-2`}> {finan.juros} </TableCell>
        <TableCell className={`text-right text-xs p-2`}> {finan.devido} </TableCell>
        {/* {  exibirAcoes ? renderizarAcoes(finan) : false} */}
      </TableRow>
    ));
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>{rendereizarCabecalho()}</TableHead>
        <TableBody>{renderizarDados()}</TableBody>
      </Table>
    </TableContainer>
  );
}
