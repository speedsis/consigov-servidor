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

import Scrollbar from 'src/components/scrollbar';

import { Historico } from 'src/@types/servidor';
import Iconify from 'src/components/iconify';
import { fDateNow } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  tableData: Historico[];
  tableLabels: any;
  onClickPrint?: (id: string) => void;
}

export default function AppListHistorico({
  title,
  onClickPrint,
  tableData,
  tableLabels,

  ...other
}: Props) {
  const { push } = useRouter();

  const { dense, page, order, orderBy, rowsPerPage, onChangePage, onChangeRowsPerPage, selected } =
    useTable({ defaultOrderBy: 'createDate' });

  return (
    <Card {...other}>
      <CardHeader title={title} className="text-gray-400 text-let py-2 " />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table size={'small'}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <AppComprovanteRow key={row.id} row={row} onClickPrint={onClickPrint} />
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

type AppComprovanteRowProps = {
  row: Historico;
  onClickPrint?: (id: string) => void;
};

function AppComprovanteRow({ row, onClickPrint }: AppComprovanteRowProps) {
  const theme = useTheme();

  const {
    id,
    tipo,
    motivo,
    dataDocumento,
    numeroOficio,
    numeroProcesso,
    juizado,
    juiz,
    observacao,
    cadastradoPor,
    dataCadastro,
  } = row;

  return (
    <TableRow>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {tipo}
      </TableCell>

      <TableCell align="left">{motivo}</TableCell>

      <TableCell align="left"> {fDateNow(dataDocumento) ?? ' - '} </TableCell>

      <TableCell align="center"> {numeroOficio ?? ' - '} </TableCell>

      <TableCell align="center"> {numeroProcesso ?? ' - '} </TableCell>

      <TableCell align="left"> {juizado ?? ' - '} </TableCell>

      <TableCell align="left"> {juiz ?? ' - '} </TableCell>

      <TableCell align="left"> {observacao ?? ' - '} </TableCell>

      <TableCell align="left"> {fDateNow(dataCadastro) ?? ' - '} </TableCell>

      <TableCell align="left"> {cadastradoPor ?? ' - '} </TableCell>
    </TableRow>
  );
}
