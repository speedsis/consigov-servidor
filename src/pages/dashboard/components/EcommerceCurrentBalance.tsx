// @mui
import { Button, Card, Typography, Stack, CardProps } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { Servidor } from 'src/@types/servidor';
import { fCurrencyBr } from 'src/utils/formatNumber';

// utils

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  sentAmount: number;
  row: Servidor;
  currentBalance: number;
  handleDetalhesConsignacao?: VoidFunction;
}

export default function EcommerceCurrentBalance({
  title,
  sentAmount,
  currentBalance,
  row,
  handleDetalhesConsignacao,
  sx,
  ...other
}: Props) {
  // const { auth } = useContext(AuthContext);

  const totalAmount = currentBalance - sentAmount;
  const [role, setRole] = useState('user');

  // useEffect(() => {
  //   if (auth?.role) {
  //     const res = (auth as any)?.role;
  //     setRole(res);
  //   }
  // }, [auth]);

  return (
    <Card sx={{ p: 3, ...sx, minHeight: 296 }} {...other}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>

      <Stack spacing={2}>
        <Typography variant="h3">{fCurrencyBr(totalAmount)}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Margem Reservada
          </Typography>
          <Typography variant="body2">{fCurrencyBr(0)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Margem Cartão
          </Typography>
          <Typography variant="body2">
            {fCurrencyBr(Number(row?.margem10) - Number(row?.margemReservada)) ||
              fCurrencyBr(Number(0))}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Margem Consignado
          </Typography>
          <Typography variant="subtitle1">
            {fCurrencyBr(Number(row?.margem30)) || fCurrencyBr(Number(0))}
          </Typography>
        </Stack>
        {role === 'ADMIN' && (
          <Stack direction="row" spacing={1.5}>
            <Button fullWidth variant="outlined" color="warning">
              Extrato financeiro
            </Button>
            <Button fullWidth variant="outlined" onClick={handleDetalhesConsignacao}>
              Detalhes consignação
            </Button>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
