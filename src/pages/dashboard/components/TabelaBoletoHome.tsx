import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { Consignacao } from 'src/@types/servidor';
import { fCurrencyBrArquivo } from 'src/utils/formatNumber';

interface TabelaBoletoHomeProps {
  consignacao: Consignacao[];
}

export default function TabelaBoletoHome(props: TabelaBoletoHomeProps) {
  function rendereizarCabecalho() {
    return (
      <TableRow>
        <TableCell className={`text-left text-xs p-2`}>Contrato</TableCell>
        <TableCell className={`text-center text-xs p-2`}>Parcela</TableCell>
        <TableCell className={`text-left text-xs p-2`}>Ref.</TableCell>
        <TableCell className={`text-right text-xs p-2`}>Vlr parcela</TableCell>
        <TableCell className={`text-right text-xs p-2`}>Vlr pago</TableCell>
      </TableRow>
    );
  }

  function renderizarDados() {
    return props.consignacao?.map((finan, i) => (
      <TableRow key={finan.id} className={`${i % 2 === 0 ? 'bg-blue-100' : 'bg-blue-50'}`}>
        <TableCell className={`text-left text-principal text-xs p-2`}>{finan.contrato}</TableCell>

        <TableCell className={`text-center text-principal text-xs p-2`}>
          {' '}
          {finan.parcelaContrato}{' '}
        </TableCell>
        <TableCell className={`text-left text-principal text-xs p-2`}>{'04/2024'}</TableCell>
        <TableCell className={`text-right text-principal text-xs p-2`}>
          <Typography className="text-principal pr-2 text-xs font-bold">
            R$ {fCurrencyBrArquivo(finan.valorParcela)}
          </Typography>
        </TableCell>

        <TableCell className={`text-right text-xs p-2`}>
          <Typography className=" text-principal   pr-2 text-xs font-bold">
            R$ {fCurrencyBrArquivo(finan.valorParcela)}
          </Typography>
        </TableCell>
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
