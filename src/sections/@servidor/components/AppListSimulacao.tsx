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

import { TableHeadCustom } from 'src/components/table';

import useTable from 'src/hooks/useTable';

import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import { STATUS_OPERACAO, Simulacao, StatusOperacao } from 'src/@types/servidor';
import { fCurrencyBr } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: Simulacao[];
  tableLabels: any;
  onEditPropostaRow?: (row: Simulacao) => void;
}

export default function AppListSimulacao({
  title,
  onEditPropostaRow,
  subheader,
  tableData,
  tableLabels,

  ...other
}: Props) {
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
                <AppSimulacaoRow key={row.id} row={row} onEditPropostaRow={onEditPropostaRow} />
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

      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Button
          // onClick={onClickProposta}
          onClick={() => {}}
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon={'uil:arrow-up-right'} />}
        >
          Fazer proposta
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppSimulacaoRowProps = {
  row: Simulacao;
  onDeleteRow?: (id: number) => void;
  onEditPropostaRow?: (row: Simulacao) => void;
};

function AppSimulacaoRow({ row, onEditPropostaRow }: AppSimulacaoRowProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleProcessa = (row: Simulacao, status: StatusOperacao) => () => {
    const data = { ...row, status: status };

    onEditPropostaRow && onEditPropostaRow(data);
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
      <TableCell align="right" sx={{ textTransform: 'capitalize' }}>
        {fCurrencyBr(Number(row?.valorParcelas))}
      </TableCell>

      <TableCell align="right"> {fCurrencyBr(Number(row?.valorReceber))}</TableCell>

      <TableCell align="center"> {row?.prazo} </TableCell>

      <TableCell align="center">
        <Label
          variant="ghost"
          color={
            (row?.status === STATUS_OPERACAO.APROVADA_CONSIGNATARIA && 'success') ||
            (row?.status === STATUS_OPERACAO.ENVIADA_SERVIDOR && 'warning') ||
            (row?.status === STATUS_OPERACAO.CANCELADA_CONSIGNATARIA && 'error') ||
            (row?.status === STATUS_OPERACAO.CANCELADA_SERVIDOR && 'error') ||
            (row?.status === STATUS_OPERACAO.AGUARDANDO_CONFIRMACAO && 'info') ||
            'secondary'
          }
        >
          {row?.status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          {row?.status !== STATUS_OPERACAO.APROVADA_CONSIGNATARIA ? null : (
            <Button
              variant="outlined"
              startIcon={<Iconify icon={'fluent:save-arrow-right-20-filled'} />}
              onClick={handleProcessa(row, STATUS_OPERACAO.APROVADA_SERVIDOR)}
              color="secondary"
            >
              Aceitar
            </Button>
          )}

          {row?.status === STATUS_OPERACAO.CANCELADA_CONSIGNATARIA ||
          row?.status === STATUS_OPERACAO.CANCELADA_SERVIDOR ? null : (
            <Button
              variant="outlined"
              startIcon={<Iconify icon={'fluent:save-arrow-right-20-filled'} />}
              onClick={handleProcessa(row, STATUS_OPERACAO.CANCELADA_SERVIDOR)}
              color="secondary"
            >
              Cancelar
            </Button>
          )}

          <Button
            disabled={row?.status !== STATUS_OPERACAO.ENVIADA_CONSIGNATARIA}
            variant="outlined"
            startIcon={<Iconify icon={'flets-icons:view-light'} />}
            onClick={() => {}}
            color="secondary"
          >
            Visualizar propostas
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
