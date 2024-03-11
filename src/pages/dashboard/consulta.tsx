import { useState } from 'react';

import { IconeBook, IconeChevronLeft, IconePrinter } from 'src/components/icons';

import Page from 'src/components/Page';

// components
import { useSettingsContext } from 'src/components/settings';

import { Container } from '@mui/material';

import { useSnackbar } from 'notistack';
import DashboardLayout from 'src/layouts/dashboard';
import { PrivateRoute } from 'src/auth/PrivateRoute';

import { Requisicao } from 'src/core/Requisicao';
import ListaRequisicoes from './components/TabelaSolicitacao';

// ----------------------------------------------------------------------

const requisicao: Requisicao[] = [
  {
    id: '1',
    datarequisicao: '2021-10-01',
    datadespacho: '2021-10-01',
    descricao: 'Requisição de empréstimo',
    situacao: 'Aguardando',
    departamento: 'RH',
    status: 'Aguardando',
    tipo: 'Empréstimo',
  },
  {
    id: '2',
    datarequisicao: '2021-10-01',
    datadespacho: '2021-10-01',
    descricao: 'Requisição de empréstimo',
    situacao: 'Aguardando',
    departamento: 'RH',
    status: 'Aguardando',
    tipo: 'Empréstimo',
  },
  {
    id: '3',
    datarequisicao: '2021-10-01',
    datadespacho: '2021-10-01',
    descricao: 'Requisição de empréstimo',
    situacao: 'Aguardando',
    departamento: 'RH',
    status: 'Aguardando',
    tipo: 'Empréstimo',
  },
  {
    id: '4',
    datarequisicao: '2021-10-01',
    datadespacho: '2021-10-01',
    descricao: 'Requisição de empréstimo',
    situacao: 'Aguardando',
    departamento: 'RH',
    status: 'Aguardando',
    tipo: 'Empréstimo',
  },
  {
    id: '5',
    datarequisicao: '2021-10-01',
    datadespacho: '2021-10-01',
    descricao: 'Requisição de empréstimo',
    situacao: 'Aguardando',
    departamento: 'RH',
    status: 'Aguardando',
    tipo: 'Empréstimo',
  },
  {
    id: '6',
    datarequisicao: '2021-10-01',
    datadespacho: '2021-10-01',
    descricao: 'Requisição de empréstimo',
    situacao: 'Aguardando',
    departamento: 'RH',
    status: 'Aguardando',
    tipo: 'Empréstimo',
  },
];

// ----------------------------------------------------------------------

ConsultaList.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ConsultaList() {
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();
  const [filterName, setFilterName] = useState('');

  return (
    <PrivateRoute>
      <Page title="Consignaçao: Base de consignações">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <div className="flex h-screen ">
            <div className="flex flex-col pt-24 md:w-3/5 w-full min-h-full">
              <div className="flex flex-row justify-start py-2">
                <div className="text-center py-2 px-2   ">
                  <i>{IconeBook} </i>
                </div>

                <div className=" text-principal font-black text-2xl text-center px-4 py-2">
                  <p>Demonstrativo de solicitações</p>
                </div>
              </div>

              <div className="flex flex-col bg-white border gap-2  pb-10 border-b-2 border-gray-100">
                <div className="flex flex-row justify-start px-1">
                  <p className="text-principal  p-2 font-semibold  text-base ">
                    LISTAGEM DE SOLICITAÇÕES E SITUAÇÃO
                  </p>
                </div>

                <div className="py-2">
                  <ListaRequisicoes requisicao={requisicao} />
                </div>
              </div>

              <div className="flex flex-col bg-white border gap-2 border-blue-100 ">
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => {}}
                    className={`
                                              bg-green-500 text-white w-full p-2 flex flex-row justify-center 
                                              gap-2 items-center rounded-sm hover:bg-green-600 duration-100 ease-in-out
                                        `}
                  >
                    <i>{IconeChevronLeft}</i>
                    Voltar
                  </button>
                  <button className="bg-gray-700 text-white w-full p-2 flex flex-row justify-center gap-2 items-center rounded-sm hover:bg-gray-800 duration-100 ease-in-out">
                    <i>{IconePrinter} </i>
                    Imprimir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Page>
    </PrivateRoute>
  );
}
