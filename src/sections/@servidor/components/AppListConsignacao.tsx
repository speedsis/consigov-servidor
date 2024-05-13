// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  CardProps,
  CardHeader,
  TableContainer,
  TablePagination,
  Stack,
} from '@mui/material';
// utils
import Label from 'src/components/Label';

// components

import { useRouter } from 'next/router';
import { TableHeadCustom } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { Consignacao, STATUS_CONTRATO_VALUE } from 'src/@types/servidor';
import { fCurrencyBr } from 'src/utils/formatNumber';

import { fDateNowNew } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: Consignacao[];
  tableLabels: any;
  onClickDetalhes: (row: Consignacao) => void;
  onClickCancelaSuspender: (row: Consignacao) => void;
}

export default function AppListConsignacao({
  title,
  onClickDetalhes,
  onClickCancelaSuspender,
  subheader,
  tableData,
  tableLabels,

  ...other
}: Props) {
  const { push } = useRouter();

  const { dense, page, order, orderBy, rowsPerPage, onChangePage, onChangeRowsPerPage, selected } =
    useTable({ defaultOrderBy: 'createDate' });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} className="text-gray-400 text-let py-2 " />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table size={'small'}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <AppDependentesRow
                    key={index + 1}
                    row={row}
                    onClickDetalhes={onClickDetalhes}
                    onClickCancelaSuspender={onClickCancelaSuspender}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>

      <Divider />
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppDependentesRowProps = {
  row: Consignacao;
  onClickDetalhes?: (row: Consignacao) => void;
  onClickCancelaSuspender?: (row: Consignacao) => void;
};

function AppDependentesRow({
  row,
  onClickDetalhes,
  onClickCancelaSuspender,
}: AppDependentesRowProps) {
  const theme = useTheme();

  const {
    contrato,
    rublicaId,
    Rublica,
    parcelaContrato,
    prazoContrato,
    parcelasPagas,
    valorParcela,
    status,
    dtCadastro,
    dtProcessamento,
    dtCancelamento,
    origem,
  } = row;

  return (
    <TableRow>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {Rublica?.codigo}
      </TableCell>

      <TableCell align="left">{Rublica?.descricao}</TableCell>

      <TableCell align="center"> {prazoContrato} </TableCell>

      <TableCell align="center"> {parcelaContrato} </TableCell>

      <TableCell align="right"> {fCurrencyBr(Number(valorParcela))} </TableCell>

      <TableCell align="center">
        <Label
          variant="ghost"
          color={
            (status === STATUS_CONTRATO_VALUE.ATIVO && 'success') ||
            (status === STATUS_CONTRATO_VALUE.PENDENTE && 'warning') ||
            (status === STATUS_CONTRATO_VALUE.CANCELADO && 'error') ||
            (status === STATUS_CONTRATO_VALUE.SUSPENSO && 'info') ||
            (status === STATUS_CONTRATO_VALUE.QUITADO && 'success') ||
            'secondary'
          }
        >
          {status ?? 'ATIVO'}
        </Label>
      </TableCell>

      <TableCell align="left"> {fDateNowNew(dtCadastro)} </TableCell>

      <TableCell align="left"> {fDateNowNew(dtProcessamento)} </TableCell>

      <TableCell align="left"> {fDateNowNew(dtCancelamento)} </TableCell>

      <TableCell align="center">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<Iconify icon={'gg:details-more'} />}
            onClick={() => {
              if (onClickDetalhes) {
                onClickDetalhes(row);
              }
            }}
            color="primary"
          >
            Detalhes
          </Button>

          <Button
            variant="outlined"
            startIcon={<Iconify icon={'mdi:sign'} />}
            onClick={() => {}}
            color="secondary"
          >
            Assinar gov.br
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
