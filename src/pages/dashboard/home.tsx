import Link from 'next/link';
import {
  IconeAjust,
  IconeCash,
  IconeExtract,
  IconeLance,
  IconeUserGroup,
} from 'src/components/icons';
//
import { useContext } from 'react';

// @mui
import { Button, Container, Grid, useTheme, Box, Typography } from '@mui/material';

// hooks
import useResponsive from 'src/hooks/useResponsive';

// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import { useSettingsContext } from 'src/components/settings';

import Page from 'src/components/Page';

import { _bankingRecentTransitions } from 'src/_mock/arrays';

import { useRouter } from 'next/router';
import { PrivateRoute } from 'src/auth/PrivateRoute';
import { AuthContext } from 'src/auth/AuthProvider';

// ----------------------------------------------------------------------

PageThree.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function PageThree() {
  const { auth } = useContext(AuthContext);

  const router = useRouter();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const isDesktop = useResponsive('up', 'sm');

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
                    OLÁ, JOSE MAXWELL TAVARES
                  </Typography>

                  <Box className="bg-gray-200 mx-2 py-1">
                    <Typography className="pl-4 text-principal text-sm font-semibold">
                      Contrato: 000103
                    </Typography>
                  </Box>

                  <Box className="divide-y-2 divide-gray-200 divide-dotted">
                    <Box className="mx-2 py-1 flex flex-row justify-center text-center text-4xl mt-4">
                      <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                        Valor empréstimo
                      </Typography>
                      <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                        R$ 50.000,00
                      </Typography>
                    </Box>

                    <Box className="mx-2 py-0.5 flex flex-row justify-center text-4xl text-center">
                      <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                        Saldo devedor
                      </Typography>
                      <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                        R$ 40.000,00
                      </Typography>
                    </Box>

                    {/* Adicione mais blocos conforme necessário para as outras informações */}

                    <Box className="mx-2 py-0.5 flex flex-row justify-center text-4xl text-center">
                      <Typography className="flex-1 pl-2 text-principal text-xs text-left">
                        Previsão encerramento
                      </Typography>
                      <Typography className="flex-1 text-principal text-right pr-2 text-sm font-bold">
                        18/01/2022
                      </Typography>
                    </Box>

                    <Box />
                  </Box>
                </Box>

                <Box className="mx-2 flex flex-2 justify-end text-right my-4">
                  <Link href="/billings" passHref>
                    Ver detalhes
                  </Link>
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
                      <Button>Fazer simulação</Button>
                    </Link>
                  </Box>
                </Box>

                {/* Extrato */}
                <Box className="flex flex-col bg-transparent border-blue-100 border row-span-2 px-2 divide-y-2 divide-gray-100 divide-solid place-content-start bg-gray-50">
                  <Box className="mx-2 py-2 flex flex-row justify-start text-left items-center">
                    {/* Substituir pelo ícone desejado */}
                    <i>{IconeExtract}</i>
                    <Typography className="px-4 font-bold text-principal text-sm">
                      Extrato
                    </Typography>
                  </Box>

                  <Box className="flex items-center justify-center h-44 w-48">
                    {/* <DonusChart /> */}
                  </Box>

                  {/* Adicionar mais blocos conforme necessário para as outras informações */}
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => router.push('/billings')}
                    >
                      Listagem de boletos
                    </Button>
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
                      Saldo atual
                    </Typography>
                    <Typography className="text-left text-3xl font-bold text-principal">
                      R$ 50.000,00
                    </Typography>

                    <Box className="grid grid-cols-2">
                      <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-light text-principal pt-1">
                          Entradas
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-light text-principal pt-1">
                          90%
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="px-4 h-2 bg-green-600" />

                    <Box className="grid grid-cols-2">
                      <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-light text-principal pt-1">
                          Saídas
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-light text-principal pt-1">
                          10%
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
                        Últimas movimentações
                      </Typography>
                    </Box>

                    <Box className="grid grid-cols-2 px-4">
                      <Box className="text-left justify-start col-span-1">
                        <Typography className="text-left text-xs font-bold text-principal pt-1">
                          Descrição
                        </Typography>
                      </Box>
                      <Box className="text-right justify-end col-span-1">
                        <Typography className="text-right text-xs font-bold text-principal pt-1">
                          Valor
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="mx-2 flex flex-2 justify-end text-right my-4">
                    <Link href="/timeline" passHref>
                      Saiba mais
                    </Link>
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
                      onClick={() => router.push('/service')}
                    >
                      <img src="images/convenios.png" alt="" className="h-14" />
                      <Link
                        className={`
                hidden md:block lg:text-xs md:text-justify 
                focus:bg-blue-600 font-mono text-xs text-principal hover:text-blue-300 hover:underline
              `}
                        href="/service"
                      >
                        Contra-cheque
                      </Link>
                    </Box>

                    {/* Fardaceso */}
                    <Box
                      className={`
              cursor-pointer
              items-center justify-center text-center bg-gray-100 p-4 hover:bg-gray-200
            `}
                      onClick={() => router.push('/service')}
                    >
                      <img src="images/fardaceso.png" alt="" className="h-14" />
                      <Link
                        className={`
                hidden md:block lg:text-xs md:text-justify 
                focus:bg-blue-600 font-mono text-xs text-principal hover:text-blue-300 hover:underline
              `}
                        href="/service"
                      >
                        Empréstimo
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Page>
    </PrivateRoute>
  );
}
