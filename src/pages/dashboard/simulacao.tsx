import { useContext, useState } from 'react';
// next

import { useTheme } from '@mui/material/styles';
// @mui
import {
  Container,
  Typography,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  TextField,
  Checkbox,
} from '@mui/material';

import useTable from 'src/hooks/useTable';
// @types

// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Page from 'src/components/Page';

// components
import { useSettingsContext } from 'src/components/settings';
import { AuthContext } from 'src/auth/AuthProvider';
import { PrivateRoute } from 'src/auth/PrivateRoute';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';

// ----------------------------------------------------------------------

Simulacao.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

export default function Simulacao() {
  const { dense } = useTable();
  const { auth } = useContext(AuthContext);
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const [openModal, SetOpenModal] = useState<boolean>(true);

  return (
    <PrivateRoute>
      <Page title="Servidor: Dados">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <div className="flex h-screen">
            <Box className="w-1/4 hidden lg:block bg-grey-light">
              <Box className="pt-32">
                <Typography className="text-left text-principal font-semibold text-2xl pb-4">
                  Dados da Simulação
                </Typography>

                <Typography className="text-left text-principal font-semibold text-sm">
                  Valor total:
                </Typography>
                <Typography className="text-left text-principal font-normal text-sm mb-4">
                  R$ 50.000,00
                </Typography>

                <Box className="divide-y-2 divide-gray-200 h-1 divide-dotted" />

                <Typography className="text-left text-principal font-semibold text-sm">
                  Parcelas:
                </Typography>
                <Typography className="text-left text-principal font-normal text-sm mb-4">
                  48
                </Typography>

                <Typography className="text-left text-principal font-semibold text-sm">
                  Valor parcelas:
                </Typography>
                <Typography className="text-left text-principal font-normal text-sm mb-4">
                  R$ 1.200,00
                </Typography>

                <Box className="mx-2 flex flex-2 justify-center my-4 mt-20 text-center">
                  <LoadingButton
                    className="inline focus:bg-blue-600 font-semibold text-md text-bg-blue pr-4 hover:text-blue-300 hover:underline cursor-pointer"
                    variant="outlined"
                    color="primary"
                    onClick={() => SetOpenModal(!openModal)}
                  >
                    Simular
                  </LoadingButton>

                  {/* <Link
                        component="a"
                        className="inline focus:bg-red-600 font-semibold text-md text-red-600 pr-4 hover:text-red-300 hover:underline cursor-pointer"
                        onClick={() => SetOpenModal(!openModal)} // Certifique-se de utilizar o estado correto
                      >
                        Simular
                      </Link> */}
                </Box>
              </Box>
            </Box>

            <Box className="w-3/4 bg-white  static">
              {/* Modal de Simulação */}
              <Box
                className={`
                z-50 absolute w-10/12 md:w-1/3 h-1/2 md:h-3/4 justify-center items-center top-28
                      bg-gray-100 rounded shadow-lg transition-opacity transition-transform duration-300
                      ${openModal ? 'block opacity-0 -translate-y-full scale-150' : ''}
                    `}
              >
                <button
                  onClick={() => SetOpenModal(!openModal)} // Certifique-se de utilizar o estado correto
                  className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                >
                  X
                </button>

                {/* Conteúdo do Modal */}
                <Box className="px-4 py-3 border-b border-gray-200">
                  <Typography className="text-xl font-semibold text-gray-600">
                    Para simular forneça os dados abaixo.
                  </Typography>
                </Box>

                <Box className="w-full p-3">
                  <form className="w-full pt-4">
                    <Box className="flex flex-col ml-2 items-start justify-items-start border-b-2 pb-10 border-teal py-2">
                      <FormControl className="py-1">
                        <Typography className="text-gray-700 text-sm font-semibold">
                          Informe o valor pretendido
                        </Typography>
                        <TextField
                          className="appearance-none bg-transparent border-none w-full text-grey-darker leading-tight focus:outline-none"
                          type="text"
                          size="small"
                          placeholder="R$ 0,00"
                          aria-label="Full name"
                        />
                      </FormControl>

                      <FormControl className="py-1">
                        <Typography className="text-gray-700 text-sm font-semibold">
                          Formas de Pagamento
                        </Typography>
                        <RadioGroup row className="px-1 pt-0">
                          <FormControlLabel
                            value="consignado"
                            control={<Radio color="primary" />}
                            label="Consignado"
                          />
                          <FormControlLabel
                            value="boleto"
                            control={<Radio color="primary" />}
                            label="Boleto Bancário"
                          />
                        </RadioGroup>
                      </FormControl>

                      <FormControl className="py-1">
                        <Typography className="text-gray-700 text-sm font-semibold">
                          Informe a quantidade de Parcelas
                        </Typography>
                        <Select
                          className={`
                                   flex-1 appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline
                              `}
                          defaultValue="24X"
                          size="small"
                        >
                          <MenuItem value="24X">24X</MenuItem>
                          <MenuItem value="12X">12X</MenuItem>
                          <MenuItem value="6X">6X</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box className="flex items-start mt-20 px-4">
                      <Checkbox
                        id="comments"
                        name="comments"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <Box className="ml-3 text-sm text-left pr-10">
                        <Typography className="font-mediuregular text-gray-400 text-xs">
                          Declaro que li e estou de acordo com os
                          <Link
                            href="#"
                            className="text-blue-600 hover:text-blue-500 cursor-pointer hover:underline"
                          >
                            Termos de uso
                          </Link>{' '}
                          e
                          <Link
                            href="#"
                            className="text-blue-600 hover:text-blue-500 cursor-pointer hover:underline"
                          >
                            {' '}
                            Política de Privacidade
                          </Link>{' '}
                          da CONSIGOV.
                        </Typography>
                      </Box>
                    </Box>
                  </form>
                </Box>

                <Box className="absolute bottom-0 left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
                  <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">
                    Ver parcelas
                  </button>
                  <button
                    onClick={() => SetOpenModal(!openModal)} // Certifique-se de utilizar o estado correto
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none"
                  >
                    Cancelar
                  </button>
                </Box>
              </Box>

              {/* Resultado da Simulação */}
              <Box className="pt-28">
                <Typography className="text-center text-principal font-bold text-4xl pb-2">
                  Resultado da sua simulação
                </Typography>

                <Box className="flex mt-6 p-6">
                  <Box className="flex-1 pr-10 border-gray-100 border-r-2">
                    <form className="w-full pt-4">
                      <Box className="flex ml-2 items-center justify-center border-b-2 border-teal py-2">
                        <FormControl className="block mr-3 py-1 px-2">
                          <Typography className="text-gray-700">Valor entrada</Typography>
                          <TextField
                            className={`
                    flex-1 appearance-none bg-transparent border-none w-full text-grey-darker  leading-tight focus:outline-none
                  `}
                            type="text"
                            size="small"
                            placeholder="R$ 0,00"
                            aria-label="Valor entrada"
                          />
                        </FormControl>

                        <FormControl className="block mr-3 py-1 px-2">
                          <Typography className="text-gray-700">Valor Solicitado</Typography>
                          <TextField
                            className={`
                    flex-1 appearance-none bg-transparent border-none w-full text-grey-darker  leading-tight focus:outline-none
                  `}
                            type="text"
                            size="small"
                            placeholder="R$ 50.000,00"
                            aria-label="Valor liberado"
                          />
                        </FormControl>

                        <FormControl className="block mr-2 py-1 px-2">
                          <Typography className="text-gray-700">Parcelas</Typography>
                          <Select
                            className={`
                    flex-1 appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline
                  `}
                            defaultValue="24X"
                            size="small"
                          >
                            <MenuItem value="24X">24X</MenuItem>
                            <MenuItem value="12X">12X</MenuItem>
                            <MenuItem value="6X">6X</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </form>

                    <Typography className="text-left text-principal font-semibold text-sm pt-10 px-4">
                      Formas de Pagamento
                    </Typography>

                    <Box className="flex px-4 pt-4">
                      <FormControlLabel
                        className="flex-1 inline-flex items-center"
                        control={<Radio className="text-red-500" checked />}
                        label="Débito em consignado"
                      />
                      <FormControlLabel
                        className="flex-1 inline-flex items-center"
                        control={<Radio className="form-radio" />}
                        label="Boleto Bancário"
                      />
                    </Box>

                    <Typography className="text-sm font-normal text-principal py-4 px-4 border-b-2 border-gray-100 mb-4">
                      Se programe: a data de vencimento da primeira parcela será 30 dias após a
                      liberação do crédito.
                    </Typography>

                    <Typography className="text-left text-principal font-semibold text-sm px-4">
                      Benefícios
                    </Typography>
                    <Typography className="text-left text-principal font-semibold text-sm pt-2 px-4">
                      Servidor usando CONSIGOV tem mais vantagens.
                    </Typography>
                    <Typography className="text-left text-principal font-semibold text-sm px-4">
                      Confira:
                    </Typography>
                    <Typography className="text-sm font-normal text-principal py-4 px-4 border-b-2 border-gray-100 mb-4">
                      • Bônus de até 0,8% no valor de cada parcela do auxílio financeiro.
                    </Typography>
                  </Box>

                  <Box className="flex-1 bg-grey h-12 mt-6 p-6">
                    <Box className="px-4 pl-10">
                      <Typography className="text-left text-gray-400 font-bold text-xl mb-2">
                        Valor das parcelas de
                      </Typography>

                      <Typography className="text-left mb-10">
                        <span className="text-green-500 font-black text-4xl">48</span>

                        <span className="text-principal justify-center text-center font-black px-1 text-lg">
                          x
                        </span>

                        <span className="text-green-500 font-black text-4xl">R$ 1.000,00</span>
                      </Typography>

                      <Box
                        className="bg-blue-3  bg-gray-200 border-l-4 border-green-500 text-principal p-2  rounded-md"
                        role="alert"
                      >
                        <Typography className="font-bold">CONSIGOV DIGITAL</Typography>
                        <Typography className="font-normal text-sm">
                          Você sabia? O servidor tem inúmeras vantagens ao fazer pagamentos com
                          cartão de crédito VENCARD, ganha pontos e concorre a prêmios além de
                          desconto nas lojas parceiras. Para mais informações,{' '}
                          <Link href="#">clique aqui</Link>.
                        </Typography>
                      </Box>

                      <Box
                        className="bg-blue-3 mt-4  bg-gray-200 border-l-4 border-yellow-400 text-principal p-2 rounded-md"
                        role="alert"
                      >
                        {/* <Typography className="font-bold">CONSIGOV DIGITAL</Typography> */}
                        <Typography className="font-normal text-sm">
                          Após a simulação, sua solicitação será enviada a todos nossos parceiros,
                          em breve você receberá uma mensagem de resposta sobre a liberação do
                          crédito, e em até 24 horas estará disponivel em sua conta. Para mais
                          informações, <Link href="#">clique aqui</Link>.
                        </Typography>
                      </Box>

                      <Box className="flex w-full mt-10 justify-center text-center">
                        <button className="bg-red-600 px-6 py-2 text-white hover:bg-red-300 hover:text-principal rounded-xl">
                          QUERO VALIDAR MEU CRÉDITO
                        </button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
        </Container>
      </Page>
    </PrivateRoute>
  );
}
