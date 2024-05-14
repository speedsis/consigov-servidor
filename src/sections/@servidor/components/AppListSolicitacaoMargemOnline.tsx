// @mui

import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  CardProps,
  CardHeader,
  TableContainer,
  TablePagination,
  TableCell,
  Stack,
} from '@mui/material';
// utils

// components

import { useRouter } from 'next/router';
import { TableHeadCustom } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import { fDateNow, fDateNowNew } from 'src/utils/formatTime';
import Scrollbar from 'src/components/scrollbar';

import { SolicitaLiberacaoMargem, StatusMargem } from 'src/@types/servidor';
import Label from 'src/components/Label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: SolicitaLiberacaoMargem[];
  onEditMargemRow?: (row: SolicitaLiberacaoMargem) => void;
  tableLabels: any;
}

export default function AppListSolicitacaoMargemOnline({
  title,
  subheader,
  tableData,
  onEditMargemRow,
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
                <AppDependentesRow key={row.id} row={row} onEditMargemRow={onEditMargemRow} />
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

      {/* <Box sx={{ p: 2, textAlign: 'center' }}>
        <Button
          onClick={() => {}}
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon={'uil:arrow-up-right'} />}
        >
          Solicitação de visualização de margem
        </Button>
      </Box> */}
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppDependentesRowProps = {
  row: SolicitaLiberacaoMargem;
  onEditMargemRow?: (row: SolicitaLiberacaoMargem) => void;
};

function AppDependentesRow({ row, onEditMargemRow }: AppDependentesRowProps) {
  const { id, valor, dias, prazo, status, dtSolicitacao, Consignataria, Empresa } = row;

  const handleProcessa = (row: SolicitaLiberacaoMargem, status: StatusMargem) => () => {
    const data = { ...row, status: status };

    onEditMargemRow && onEditMargemRow(data);
  };

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
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {Consignataria?.descricao}
      </TableCell>

      <TableCell align="left">{Empresa?.nome}</TableCell>

      <TableCell align="center">
        <Label
          variant="ghost"
          color={
            (status === 'AGUARDANDO_LIBERACAO' && 'primary') ||
            (status === 'BLOQUEADA' && 'warning') ||
            (status === 'LIBERADA' && 'success') ||
            (status === 'SUSPENSA' && 'error') ||
            (status === 'CANCELADA' && 'info') ||
            'secondary'
          }
        >
          {status ?? 'ATIVO'}
        </Label>
      </TableCell>

      <TableCell align="center"> {dias} </TableCell>

      <TableCell align="center"> {prazo} </TableCell>

      <TableCell align="left"> {fDateNowNew(dtSolicitacao)} </TableCell>

      <TableCell align="right">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          {row?.status === 'AGUARDANDO_LIBERACAO' ? (
            <Button
              variant="outlined"
              startIcon={<Iconify icon={'fluent:save-arrow-right-20-filled'} />}
              onClick={handleProcessa(row, 'LIBERADA')}
              color="secondary"
            >
              Aceitar
            </Button>
          ) : null}

          {row?.status === 'AGUARDANDO_LIBERACAO' || row?.status === 'LIBERADA' ? (
            <Button
              variant="outlined"
              startIcon={<Iconify icon={'fluent:save-arrow-right-20-filled'} />}
              onClick={handleProcessa(row, 'CANCELADA')}
              color="error"
            >
              Cancelar
            </Button>
          ) : null}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
