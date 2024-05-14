import Link from 'next/link';
import {
  IconeAjust,
  IconeCash,
  IconeExtract,
  IconeLance,
  IconeUserGroup,
} from 'src/components/icons';
//
import { useContext, useEffect, useState } from 'react';

// @mui
import { Button, Container, Grid, useTheme, Box, Typography, Card } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components

import { useSnackbar } from 'src/components/snackbar';

import { useSettingsContext } from 'src/components/settings';

import Page from 'src/components/Page';

import { _bankingRecentTransitions } from 'src/_mock/arrays';

import { useRouter } from 'next/router';
import { PrivateRoute } from 'src/auth/PrivateRoute';
import { AuthContext } from 'src/auth/AuthProvider';
import { ServidorContext } from 'src/context/ServidorContext';
import { fCurrencyBrArquivo } from 'src/utils/formatNumber';

import moment from 'moment';
import BookingRoomAvailable from './components/BookingRoomAvailable';
import TabelaBoletoHome from './components/TabelaBoletoHome';
import EcommerceCurrentBalance from './components/EcommerceCurrentBalance';
import PDFDialogHolerite from 'src/sections/@servidor/relatorio/PDFDialogHolerite';

// ----------------------------------------------------------------------

PageThree.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageThree() {
  const { auth } = useContext(AuthContext);
  const { servidor, setServidor } = useContext(ServidorContext);
  const consignacao = servidor?.Consignacoes || [];

  const [openDialog, setOpenDialog] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  if (!servidor) return null;

  const salarioLiquido = servidor?.salarioLiquido || 0;
  const descontoObrigatorio = servidor?.descontoObrigatorio || 0; // Se for undefined, assume 0
  const margemReservada = servidor?.margemReservada || 0;

  // Calculando o percentual de desconto obrigatório
  const percentualDescontoObrigatorio = Math.round((descontoObrigatorio / salarioLiquido) * 100);

  // Calculando o percentual de margem reservada
  const percentualMargemReservada = Math.round((margemReservada / salarioLiquido) * 100);

  const handleClickPrint = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <PrivateRoute>
      <Page title="General: App">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container spacing={3}>
            <Box className="grid grid-cols-1  md:grid-cols-4 md:w-full md:h-580px gap-4 pt-28 px-5 md:-left-10">
              {/* GRID PARCELAMENTO */}
              <Box
                className={`bg-gray-50 flex flex-col col-span-1 order-1 bg-transparent flex-wrap border-blue-100 border`}
              >
                <Box className="flex-1">
                  <Typography className="px-4 mt-4 font-bold text-principal">
                    OLÁ, {servidor?.nome}
                  </Typography>

                  {servidor?.Consignacoes.map((item, index) => (
                    <ul key={index} className="divide-y-2 divide-gray-200 divide-solid">
                      <Box className="bg-gray-200 mx-2 py-1">
                        <Typography className="pl-4 text-principal text-sm font-semibold">
                          {item.Consignataria.id} | {item.Consignataria?.descricao}
                        </Typography>
                      </Box>
                      <Box className="divide-y-2 divide-gray-200 divide-dotted">
                        <Box className="mx-2 py-1 flex flex-row justify-center text-center text-4xl mt-4">
                          <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                            Valor empréstimo
                          </Typography>
                          <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                            R$ {fCurrencyBrArquivo(item.prazoContrato * item.valorParcela)}
                          </Typography>
                        </Box>
                        <Box className="mx-2 py-0.5 flex flex-row justify-center text-4xl text-center">
                          <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                            Saldo devedor
                          </Typography>
                          <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                            R$
                            {fCurrencyBrArquivo(
                              (item.prazoContrato - item.parcelaContrato) * item.valorParcela
                            )}
                          </Typography>
                        </Box>

                        <Box className="mx-2 py-0.5 flex flex-row justify-center text-4xl text-center">
                          <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                            Valor parcela
                          </Typography>
                          <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                            R$ {fCurrencyBrArquivo(item.valorParcela)}
                          </Typography>
                        </Box>

                        <Box className="mx-2 py-0.5 flex flex-row justify-center text-4xl text-center">
                          <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                            Previsão encerramento
                          </Typography>
                          <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                            {moment(
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth() + item.prazoContrato,
                                new Date().getDate()
                              )
                            ).format('DD/MM/YYYY')}
                          </Typography>
                        </Box>

                        <Box className="mx-2 flex flex-2 justify-end text-right my-4">
                          <Typography className="flex-1 p-2 text-principal text-sm  text-right">
                            mais detalhes
                          </Typography>
                        </Box>
                      </Box>
                    </ul>
                  ))}

                  {/* Adicione mais blocos conforme necessário para as outras informações */}
                </Box>
              </Box>

              {/* GRID SIMULA EMPRESTIMMO */}
              <Box className="grid grid-rows-5 gap-4 col-span-1 order-2">
                {/* Simular empréstimo */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-2 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    {/* Substituir pelo ícone desejado */}
                    <i>{IconeLance}</i>
                    <Typography className="px-4 font-bold text-principal text-sm">
                      Simular empréstimo
                    </Typography>
                  </Box>

                  <Box className="text-left justify-start py-2">
                    <Typography className="text-sm font-bold text-principal">
                      Precisa aliviar suas contas?
                    </Typography>
                    <Typography className="text-xs font-normal pt-2 text-justify mb-4">
                      Empréstimo financeiro, totalmente digital, com condições personalizadas e
                      taxas diferenciadas, utiliza o botão abaixo para fazer uma simulação.
                    </Typography>
                  </Box>

                  <Box className="mx-2 flex flex-2 justify-end text-right py-4">
                    <Link href="/dashboard/simulacao" passHref>
                      <Button variant="outlined">Fazer simulação</Button>
                    </Link>
                  </Box>
                </Box>

                {/* Extrato */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-3 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    {/* Substituir pelo ícone desejado */}
                    <i>{IconeExtract}</i>
                    <Typography className="px-4 font-bold text-principal text-sm">
                      Extrato
                    </Typography>
                  </Box>

                  <Box py-2>
                    {/* Substitua pelo componente real TabelaBoletoVencer */}
                    <TabelaBoletoHome consignacao={consignacao} />
                  </Box>

                  <Box className="mx-2 flex flex-2 justify-end text-right py-4">
                    <Link href="/dashboard/search" passHref>
                      <Button> Extrato completo</Button>
                    </Link>
                  </Box>

                  <Box />
                </Box>

                {/* 2ª Via de Boletos */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-1 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="flex-1">
                    <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                      {/* Substituir pelo ícone desejado */}
                      <i>{IconeExtract}</i>
                      <Typography className="px-4 font-bold text-principal text-sm">
                        2ª Via de Boletos
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="mx-2 flex flex-2 justify-end text-right py-4">
                    <Button variant="outlined"> Listagem de boletos</Button>
                  </Box>
                </Box>
              </Box>

              {/* GRID CARTEIRA */}
              <Box className="grid grid-rows-3 gap-4 col-span-1 order-3">
                {/* Carteira */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-1 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    {IconeCash && <i>{IconeCash}</i>}
                    <Typography className="px-4 font-bold text-principal text-sm">
                      Carteira
                    </Typography>
                  </Box>

                  <Box className="text-left justify-start py-2 px-4">
                    <Typography className="text-left text-sm font-semibold text-principal">
                      Margem consignado
                    </Typography>
                    <Typography className="text-left text-3xl font-bold text-principal">
                      R$ {fCurrencyBrArquivo(servidor?.margem30 || 0)}
                    </Typography>

                    <Box className="grid grid-cols-2">
                      <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-light text-principal pt-1">
                          Salário Líquido
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-light text-principal pt-1">
                          50%
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="px-4 h-2 bg-green-600" />

                    <Box className="grid grid-cols-2">
                      <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-light text-principal pt-1">
                          empréstimos
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-light text-principal pt-1">
                          {percentualMargemReservada} %
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="px-4 h-2 w-2 bg-red-400" />

                    <Box className="grid grid-cols-2">
                      <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-light text-principal pt-1">
                          descontos
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-light text-principal pt-1">
                          {percentualDescontoObrigatorio} %
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="px-4 h-2 w-2 bg-red-400" />
                  </Box>
                </Box>

                {/* Últimas movimentações */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-2 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="flex-1">
                    <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                      {IconeAjust && <i>{IconeAjust}</i>}
                      <Typography className="px-4 font-bold text-principal text-sm">
                        Movimentações
                      </Typography>
                    </Box>

                    <BookingRoomAvailable
                      chart={{
                        series: [
                          { label: 'Cartão benefício', value: servidor?.margemReservada || 0 },
                          { label: 'Empréstimo consignado', value: 0 },
                        ],
                      }}
                    />

                    {/* <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-bold text-principal pt-1">
                          Descrição
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-bold text-principal pt-1">
                          Valor
                        </Typography>
                      </Box> */}
                  </Box>

                  <Box className="mx-2 flex flex-2 justify-end text-right my-4">
                    <Typography className="flex-1 p-2 text-principal text-sm  text-right">
                      Saiba mais
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* GRID SERVICOS */}
              <Box className="grid grid-rows-1 gap-4 col-span-1 order-4">
                {/* Serviços */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-1 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    {IconeUserGroup && <i>{IconeUserGroup}</i>}
                    <Typography className="px-4 font-bold text-principal text-sm">
                      Serviços
                    </Typography>
                  </Box>

                  <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-wrap gap-2 pt-2">
                    {/* Convênios */}
                    <Box
                      className={`
              cursor-pointer
              items-center justify-center text-center bg-gray-100 p-4 hover:bg-gray-200
            `}
                    >
                      <img
                        src="/assets/images/home/contracheque.png"
                        onClick={() => handleClickPrint()}
                        alt=""
                        className="h-22"
                      />
                    </Box>
                  </Box>
                </Box>

                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-1 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    {IconeUserGroup && <i>{IconeUserGroup}</i>}
                    <Typography className="px-4 font-bold text-principal text-sm">
                      Margem
                    </Typography>
                  </Box>

                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    <Box className="flex flex-col w-full max-w-600">
                      <Box>
                        <EcommerceCurrentBalance
                          title="Saldo Margem cartão"
                          row={servidor}
                          currentBalance={
                            Number(servidor?.margem10) - Number(servidor?.margemReservada) || 0
                          }
                          // handleDetalhesConsignacao={handleDetalhesConsignacao}
                          sentAmount={0}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <PDFDialogHolerite open={openDialog} onClose={handleCloseDialog} />
        </Container>
      </Page>
    </PrivateRoute>
  );
}
