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
import { ReservaCartao } from 'src/@types/servidor';
import { fCurrencyBr } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: ReservaCartao[];
  tableLabels: any;
  onEditRow?: (row: ReservaCartao) => void;
}

export default function AppListReservaCartao({
  title,
  onEditRow,
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
                <AppReservaRow key={row.id} row={row} onEditRow={onEditRow} />
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

type AppReservaRowProps = {
  row: ReservaCartao;
  onEditRow?: (row: ReservaCartao) => void;
};

function AppReservaRow({ row, onEditRow }: AppReservaRowProps) {
  const theme = useTheme();

  const { id, valor, status, criadoPor, criadoEm, dtReserva } = row;

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
      <TableCell align="left">{'Consignataria'}</TableCell>

      <TableCell align="right"> {fCurrencyBr(Number(valor)) ?? 0} </TableCell>

      <TableCell align="center"> {status ?? ' -- '} </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {criadoPor ?? ' -- '}
      </TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {fDateNow(criadoEm) ?? ' - '}
      </TableCell>

      <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
        {fDateNow(dtReserva) ?? ' - '}
      </TableCell>

      <TableCell align="center">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            // className="bg-yellow-600"
            startIcon={<Iconify icon={'lets-icons:cancel'} />}
            color="warning"
            onClick={() => {}}
          >
            Cancelar
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
