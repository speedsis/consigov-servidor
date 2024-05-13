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

import { Comprovante } from 'src/@types/servidor';
import Iconify from 'src/components/iconify';
import { fDateNow } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  tableData: Comprovante[];
  tableLabels: any;
  onClickPrint?: (id: string) => void;
}

export default function AppListComprovante({
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
  row: Comprovante;
  onClickPrint?: (id: string) => void;
};

function AppComprovanteRow({ row, onClickPrint }: AppComprovanteRowProps) {
  const theme = useTheme();

  const { id, tipo, serial, dataDocumento, consignacaoId } = row;

  return (
    <TableRow>
      <TableCell align="left">{tipo}</TableCell>

      <TableCell align="left"> {serial} </TableCell>

      <TableCell align="center"> {fDateNow(dataDocumento)} </TableCell>

      <TableCell align="center">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="contained"
            className="bg-green-800 bg-houver-green-9"
            onClick={() => onClickPrint!(consignacaoId)}
            startIcon={<Iconify icon={'uil:print'} width={20} height={20} />}
            color="primary"
          >
            Imprimir
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
