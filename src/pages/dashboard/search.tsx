import React from 'react';
import { Box, Typography } from '@mui/material';
import TabelaBoleto from './components/TabelaBoleto';
import TabelaBoletoVencer from './components/TabelaBoletoVencer';
import DashboardLayout from 'src/layouts/dashboard';

import { IconeAjust, IconeBoleto, IconeBoleto_g, IconeInfo } from 'src/components/icons';

interface Financeiro {
  id: string;
  parcela: number;
  vencimento: string;
  valor: number;
  juros: number;
  devido: number;
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function Search() {
  const [openModal, setOpenModal] = React.useState(false);

  const financeiro: Financeiro[] = [
    {
      id: '1',
      parcela: 1,
      vencimento: '20/11/2014',
      valor: 5000,
      juros: 0,
      devido: 5000,
    },
    {
      id: '2',
      parcela: 2,
      vencimento: '20/11/2014',
      valor: 5000,
      juros: 0,
      devido: 5000,
    },
    {
      id: '3',
      parcela: 3,
      vencimento: '20/11/2014',
      valor: 5000,
      juros: 0,
      devido: 5000,
    },
    {
      id: '4',
      parcela: 4,
      vencimento: '20/11/2014',
      valor: 5000,
      juros: 0,
      devido: 5000,
    },
    {
      id: '5',
      parcela: 5,
      vencimento: '20/11/2014',
      valor: 5000,
      juros: 0,
      devido: 5000,
    },
    {
      id: '6',
      parcela: 6,
      vencimento: '20/11/2014',
      valor: 5000,
      juros: 0,
      devido: 5000,
    },
  ];

  return (
    <Box className="flex h-screen">
      <Box className="flex flex-col pt-24 px-4 md:w-3/5 w-full">
        <Box className="md:flex bg-white border gap-2 border-blue-100 px-4">
          {/* Conteúdo do bloco financeiro */}
          <Box className="md:w-3/5 py-2 px-1">
            <Typography className="text-principal font-black text-base">
              CONTRATO 5038900
            </Typography>
            <Typography className="text-gray-500 font-semibold text-xs">
              JOSE MAXWELL TAVARES
            </Typography>
          </Box>
          <Box className="md:w-1/5 h-auto py-2 px-1">
            <Box className="bg-gray-100 px-2 py-2">
              <Typography className="text-principal font-bold text-xs">R$ 50.0000,00</Typography>
              <Typography className="text-gray-500 lg:text-justify font-semibold text-xs">
                VALOR DO EMPRÉSTIMO
              </Typography>
            </Box>
          </Box>
          <Box className="md:w-1/5 h-auto  py-2">
            <Box className="bg-gray-100 px-2 py-2">
              <Typography className="text-principal font-bold text-xs">20/11/2014</Typography>
              <Typography className="text-gray-500 lg:text-justify  font-semibold text-xs">
                PRÓXIMA FATURA
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Informações sobre 2ª Via de Boletos */}
        <Box className="flex flex-row justify-start py-2">
          <Box className="text-center py-2 px-2">{IconeBoleto_g}</Box>
          <Box className="text-principal font-black text-2xl text-center px-4 py-2">
            <Typography variant="h4">Extrato</Typography>
          </Box>
        </Box>

        {/* Bloco de Boletos em Atraso */}
        <Box className="flex flex-col bg-white border gap-2 pb-10 border-b-2 border-gray-100">
          <Box className="flex flex-row justify-start py-2 px-1">
            <Box className="text-center py-2 pr-2">{IconeInfo}</Box>
            <Typography className="text-green-700 font-semibold py-2 text-base">
              Parcelas pagas
            </Typography>
          </Box>
          <Box py-2>
            {/* Substitua pelo componente real TabelaBoleto */}
            <TabelaBoleto financeiro={financeiro} />
          </Box>
        </Box>

        {/* Bloco de Boletos a Vencer */}
        <Box className="flex flex-col bg-white border gap-2 border-blue-100">
          <Box className="flex flex-row justify-start py-2 px-1">
            <Box className="text-center py-2 pr-2">{IconeAjust}</Box>
            <Typography className="text-principal text-yellow-500 font-semibold py-2 text-base">
              Parcelas a vencer
            </Typography>
          </Box>
          <Box py-2>
            {/* Substitua pelo componente real TabelaBoletoVencer */}
            <TabelaBoletoVencer financeiro={financeiro} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
