import React, { useContext } from 'react';
import { Box, Divider, MenuItem, Select, Typography } from '@mui/material';
import TabelaBoleto from './components/TabelaBoleto';
import TabelaBoletoVencer from './components/TabelaBoletoVencer';
import DashboardLayout from 'src/layouts/dashboard';

import { IconeAjust, IconeBoleto, IconeBoleto_g, IconeInfo } from 'src/components/icons';
import { ServidorContext } from 'src/context/ServidorContext';
import { fCurrencyBrArquivo } from 'src/utils/formatNumber';
import moment from 'moment';

interface Financeiro {
  id: string;
  contrato: string;
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
  const { servidor } = useContext(ServidorContext);

  const consignacao = servidor?.Consignacoes || [];

  const vlrParcela = consignacao[0].valorParcela || 0;
  const parcelaContrato = consignacao[0].prazoContrato || 0;

  return (
    <Box className="flex h-screen">
      <Box className="flex flex-col pt-24 px-4 md:w-3/5 w-full">
        <Box className="md:flex bg-white border gap-2 border-blue-100 px-4">
          {/* Conteúdo do bloco financeiro */}
          <Box className="md:w-3/5 py-2 px-1">
            <Typography className="text-principal font-black text-base">
              MATRÍCULA {servidor?.matricula}
            </Typography>
            <Typography className="text-gray-500 font-semibold text-xs">
              {servidor?.nome}
            </Typography>
          </Box>

          <Box className="md:w-2/5 h-auto py-2 px-1">
            <Box className="  px-2 py-2">
              <Select
                name="selectContrato"
                sx={{ width: '100%' }}
                // InputLabelProps={{ shrink: false }}
                size="small"
                value={''} // Defina o valor selecionado com base nos dados do usuário
                onChange={(event) => {
                  const selectedValue = event.target.value;
                  const selectedOption = servidor?.Consignacoes.find(
                    (option) => option.Consignataria.descricao === selectedValue
                  );
                  if (selectedOption) {
                    // handleSelectionChange(selectedOption);
                  }
                }}
              >
                <MenuItem value=""> -- Nenhuma Seleção -- </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {servidor?.Consignacoes.map((option) => (
                  <MenuItem key={option.id} value={option.Consignataria.descricao}>
                    {option.Consignataria.id} | {option.Consignataria.descricao}
                  </MenuItem>
                ))}
              </Select>

              {/* <Typography className="text-principal font-bold text-xs">
                {servidor?.Consignacoes}
              </Typography>
              <Typography className="text-gray-500 lg:text-justify font-semibold text-xs">
                PARCELAS
              </Typography> */}
            </Box>
          </Box>

          <Box className="md:w-2/5 h-auto py-2 px-1">
            <Box className="bg-gray-100 px-2 py-2">
              <Typography className="text-principal font-bold text-xs">
                R$ {fCurrencyBrArquivo(vlrParcela * parcelaContrato)}
              </Typography>
              <Typography className="text-gray-500 lg:text-justify font-semibold text-xs">
                VALOR DO EMPRÉSTIMO
              </Typography>
            </Box>
          </Box>
          <Box className="md:w-2/5 h-auto  py-2">
            <Box className="bg-gray-100 px-2 py-2">
              <Typography className="text-principal font-bold text-xs">
                {moment(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 1,
                    new Date().getDate()
                  )
                ).format('MM/YYYY')}
              </Typography>
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
            <TabelaBoleto consignacao={consignacao} />
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
            <TabelaBoletoVencer financeiro={[]} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
