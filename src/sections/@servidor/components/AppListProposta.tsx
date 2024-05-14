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

// components

import { useRouter } from 'next/router';

import { TableHeadCustom } from 'src/components/table';

import useTable from 'src/hooks/useTable';
import { fDateNow } from 'src/utils/formatTime';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { Proposta } from 'src/@types/servidor';
import { fCurrencyBr } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: Proposta[];
  tableLabels: any;
  onEditRow?: (row: Proposta) => void;
  averbarProposta?: (row: Proposta) => void;
}

export default function AppListProposta({
  title,
  onEditRow,
  averbarProposta,
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
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <AppPropostaRow
                  key={row.id}
                  row={row}
                  onEditRow={onEditRow}
                  averbarProposta={averbarProposta}
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

type AppPropostaRowProps = {
  row: Proposta;
  onEditRow?: (row: Proposta) => void;
  averbarProposta?: (row: Proposta) => void;
};

function AppPropostaRow({ row, onEditRow, averbarProposta }: AppPropostaRowProps) {
  const theme = useTheme();

  const {
    id,
    prazo,
    restante,
    valor,
    valorTotal,
    situacao,
    status,
    dataCadastro,
    dtProposta,
    dtAprovacaoCancelado,
    tipoNegociacao,
    dataProcessamento,
    canceladoEm,
    Rublica,
  } = row;

  return (
    <TableRow
      sx={{
        '&:nth-of-type(odd)': {
          backgroundColor: 'divider',
        },
        '& > .MuiTableCell-root': {
          paddingY: 1, // Diminui a margem vertical
        },
      }}
    >
      <TableCell align="left">{`${Rublica.codigo} | ${Rublica.descricao}`}</TableCell>

      <TableCell align="center"> {prazo ?? ' - '} </TableCell>

      <TableCell align="center"> {restante ?? 0} </TableCell>

      <TableCell align="right"> {fCurrencyBr(Number(valor)) ?? 0} </TableCell>

      <TableCell align="right"> {fCurrencyBr(Number(valorTotal)) ?? 0} </TableCell>

      <TableCell align="left"> {status ?? ' - '} </TableCell>

      <TableCell align="center"> {dataCadastro ? fDateNow(dataCadastro) : ' - '} </TableCell>

      <TableCell align="center">
        {' '}
        {dataProcessamento ? fDateNow(dataProcessamento) : ' - '}{' '}
      </TableCell>

      <TableCell align="center"> {canceladoEm ? fDateNow(canceladoEm) : ' - '} </TableCell>

      <TableCell align="center">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            // className="bg-green-800 bg-houver-green-9"
            startIcon={<Iconify icon={'gg:details-more'} />}
            onClick={() => {}}
            color="info"
          >
            Detalhes
          </Button>
          <Button
            variant="outlined"
            // className="bg-yellow-600"
            startIcon={<Iconify icon={'lets-icons:cancel'} />}
            color="warning"
            onClick={() => {}}
          >
            Cancelar/Suspender
          </Button>
          <Button
            variant="outlined"
            // className="bg-yellow-600"
            startIcon={<Iconify icon={'mdi:contract-sign'} />}
            color="success"
            onClick={averbarProposta ? () => averbarProposta(row) : () => {}}
          >
            Averbar
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
