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
  CardProps,
  CardHeader,
  TableContainer,
  TablePagination,
  TableCell,
} from '@mui/material';
// utils

// components

import { useRouter } from 'next/router';
import { TableHeadCustom } from 'src/components/table';
import useTable from 'src/hooks/useTable';
import { fDateNow, fDateNowNew } from 'src/utils/formatTime';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import { STATUS_OPERACAO, SolicitaLiberacaoMargem } from 'src/@types/servidor';
import Label from 'src/components/Label';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: SolicitaLiberacaoMargem[];
  tableLabels: any;
}

export default function AppListSolicitacaoMargemOnline({
  title,
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
                <AppDependentesRow key={row.id} row={row} />
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
          onClick={() => {}}
          size="small"
          variant="outlined"
          color="inherit"
          startIcon={<Iconify icon={'uil:arrow-up-right'} />}
        >
          Solicitação de visualização de margem
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppDependentesRowProps = {
  row: SolicitaLiberacaoMargem;
};

function AppDependentesRow({ row }: AppDependentesRowProps) {
  const theme = useTheme();

  const { id, valor, dias, prazo, status, dtSolicitacao, Consignataria, Empresa } = row;

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {Consignataria?.descricao}
      </TableCell>

      <TableCell align="left">{Empresa?.nome}</TableCell>

      <TableCell align="center">
        <Label
          variant="ghost"
          color={
            (status === STATUS_OPERACAO.ENVIADA_SERVIDOR && 'success') ||
            (status === STATUS_OPERACAO.ENVIADA_CONSIGNATARIA && 'warning') ||
            (status === STATUS_OPERACAO.CANCELADA_SERVIDOR && 'error') ||
            (status === STATUS_OPERACAO.CANCELADA_CONSIGNATARIA && 'error') ||
            (status === STATUS_OPERACAO.APROVADA_CONSIGNATARIA && 'info') ||
            (status === STATUS_OPERACAO.APROVADA_SERVIDOR && 'success') ||
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
        <Button variant="contained" size="small" color="primary" onClick={() => {}}>
          Aceitar
        </Button>

        <Button variant="contained" size="small" color="inherit" onClick={() => {}}>
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
