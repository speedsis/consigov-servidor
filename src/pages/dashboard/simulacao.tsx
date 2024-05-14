import { useContext, useEffect, useState } from 'react';
// next

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

// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import Page from 'src/components/Page';

// components
import { useSettingsContext } from 'src/components/settings';

import { PrivateRoute } from 'src/auth/PrivateRoute';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import EmptyContent from 'src/components/empty-content';
import { fCurrencyBr, fCurrencyBrRetorno, formatCurrencyInput } from 'src/utils/formatNumber';
import { useSnackbar } from 'notistack';
import { ServidorContext } from 'src/context/ServidorContext';

import { Servidor } from 'src/@types/servidor';

// ----------------------------------------------------------------------

Simulacao.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

// ----------------------------------------------------------------------

interface SimulationData {
  loanAmount: number;
  numberOfInstallments: number;
  consignee: string;
  totalLoanWithInterest: number;
  monthlyPayment: number;
}

export default function Simulacao() {
  const { servidor, setServidor } = useContext(ServidorContext);

  const { enqueueSnackbar } = useSnackbar();
  const [loadingSend, setLoadingSend] = useState(false);

  const { themeStretch } = useSettingsContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(true);

  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [numberOfInstallments, setNumberOfInstallments] = useState<number>(24);
  const [consignee, setConsignee] = useState<string>('');
  const [simulations, setSimulations] = useState<SimulationData>({
    loanAmount: 0,
    numberOfInstallments: 0,
    consignee: '',
    totalLoanWithInterest: 0,
    monthlyPayment: 0,
  });

  const interestRate = 0.26; // Taxa de juros de 5% ao mês (exemplo)

  const handleClear = () => {
    setLoanAmount(0);
    setNumberOfInstallments(24);
    setConsignee('');
    setSimulations({
      loanAmount: 0,
      numberOfInstallments: 0,
      consignee: '',
      totalLoanWithInterest: 0,
      monthlyPayment: 0,
    });
  };

  const handleSimulation = () => {
    if (loanAmount && numberOfInstallments) {
      const rate = interestRate / 12; // Taxa de juros mensal (exemplo)
      const numberOfPayments = numberOfInstallments;

      // Calcula o valor da parcela mensal (método PRICE)
      const annuityFactor =
        (rate * Math.pow(1 + rate, numberOfPayments)) / (Math.pow(1 + rate, numberOfPayments) - 1);
      const monthlyPayment = loanAmount * annuityFactor;

      // Calcula o valor total do empréstimo com juros
      const totalLoanWithInterest = monthlyPayment * numberOfPayments;

      const loanAmountFloat = Number(loanAmount);

      const simulationData: SimulationData = {
        loanAmount: loanAmountFloat,
        numberOfInstallments: numberOfInstallments,
        consignee,
        totalLoanWithInterest,
        monthlyPayment,
      };

      // Utilize o callback de atualização do estado para garantir que está acessando o valor mais recente
      setSimulations((prevState) => ({ ...prevState, ...simulationData }));

      setOpenModal(!openModal);
    } else {
      enqueueSnackbar('Por favor, preencha todos os campos!', { variant: 'error' });
    }
  };

  useEffect(() => {
    setIsNotFound(false);
  }, []);

  const handleSubmitSimulacao = async (data: SimulationData) => {
    if (!servidor) return;

    try {
      const dataProcess = {
        valorParcelas: Number(data.monthlyPayment.toFixed(2)),
        parcelas: data.numberOfInstallments,
        valorReceber: data.loanAmount,
        empresaId: servidor?.Empresas[0].empresaId,
        servidorId: servidor?.id,
        prazo: data.numberOfInstallments,
        consignatarias: ['0999'],
      };

      await ProcessaSubmit(dataProcess);
    } catch (error) {
      console.error(error);
    }
  };

  //ProcessaSubmit
  const ProcessaSubmit = async (data: any) => {
    const varUrlName = process.env.NEXT_PUBLIC_API_DEVELOPER_URL;

    setLoadingSend(true);
    console.log(data);

    const url = `${varUrlName}/simulacao/${data.empresaId}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        next: {
          tags: [`servidor-query`],
          revalidate: 1,
        },
      });

      if (response.ok) {
        const ret = await response.json();

        if (ret.success === false) {
          throw new Error(ret.error);
        }

        const data = ret.data;

        const newServidor = {
          ...servidor,
          Simulacao: servidor?.Simulacao ? [...servidor.Simulacao, data] : [data],
        };

        // console.log('newServidor', newServidor);
        // console.log('data', data);

        setServidor(newServidor as Servidor);

        enqueueSnackbar('Simulação enviada com sucesso!', { variant: 'success' });
      } else {
        enqueueSnackbar('Erro ao enviar a simulação!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoadingSend(false);
      handleClear();
    }
  };

  return (
    <PrivateRoute>
      <Page title="Servidor: Dados">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <div className="flex h-screen">
            {isNotFound ? (
              <Box className="w-1/4 hidden lg:block bg-grey-light">aguardando ...</Box>
            ) : (
              <Box className="w-1/4 hidden lg:block bg-grey-light">
                <Box className="pt-32">
                  <Typography className="text-left text-principal font-semibold text-2xl pb-4">
                    Dados da Simulação
                  </Typography>

                  <Typography className="text-left text-principal font-semibold text-sm">
                    Valor total:
                  </Typography>
                  <Typography className="text-left text-principal font-normal text-sm mb-4">
                    {fCurrencyBr(simulations?.loanAmount) || 0}
                  </Typography>

                  <Box className="divide-y-2 divide-gray-200 h-1 divide-dotted" />

                  <Typography className="text-left text-principal font-semibold text-sm">
                    Parcelas:
                  </Typography>
                  <Typography className="text-left text-principal font-normal text-sm mb-4">
                    {simulations?.numberOfInstallments || 0}
                  </Typography>

                  <Typography className="text-left text-principal font-semibold text-sm">
                    Valor parcelas:
                  </Typography>
                  <Typography className="text-left text-principal font-normal text-sm mb-4">
                    {fCurrencyBr(simulations?.monthlyPayment || 0)}
                  </Typography>

                  <Typography className="text-left text-principal font-semibold text-sm">
                    Taxas anual:
                  </Typography>
                  <Typography className="text-left text-principal font-normal text-sm mb-4">
                    26% Método PRICE:
                  </Typography>

                  <Box className="mx-2 flex flex-2 justify-center my-4 mt-20 text-center">
                    <LoadingButton
                      // className="inline focus:bg-blue-600 font-semibold text-md text-bg-blue pr-4 hover:text-blue-300 hover:underline cursor-pointer"
                      variant="outlined"
                      color="primary"
                      onClick={() => setOpenModal(!openModal)}
                    >
                      Criar Simulação
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            )}

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
                  onClick={() => setOpenModal(!openModal)} // Certifique-se de utilizar o estado correto
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
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value))}
                          type="number"
                          size="small"
                          placeholder="R$ 0,00"
                          aria-label="Full name"
                        />
                      </FormControl>

                      <FormControl className="py-1">
                        <Typography className="text-gray-700 text-sm font-semibold">
                          Formas de Pagamento
                        </Typography>
                        <RadioGroup row className="px-1 pt-0" defaultValue="consignado">
                          <FormControlLabel
                            value="consignado"
                            control={<Radio color="primary" />}
                            label="Consignado"
                          />
                          <FormControlLabel
                            value="boleto"
                            disabled
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
                          fullWidth
                          label="Número de Parcelas"
                          value={numberOfInstallments}
                          onChange={(e) => setNumberOfInstallments(Number(e.target.value))}
                          variant="outlined"
                          className={`
            flex-1 appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none focus:shadow-outline
       `}
                          size="small"
                        >
                          <MenuItem value={80}>80X</MenuItem>
                          <MenuItem value={60}>60X</MenuItem>
                          <MenuItem value={48}>48X</MenuItem>
                          <MenuItem value={24}>24X</MenuItem>
                          <MenuItem value={12}>12X</MenuItem>
                          <MenuItem value={6}>6X</MenuItem>
                          <MenuItem value={1}>1X</MenuItem>
                        </Select>
                      </FormControl>

                      <Box className="flex items-start mt-5 px-2">
                        <Checkbox
                          id="comments"
                          name="comments"
                          checked
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <Box className="ml-3 text-sm text-left pr-10">
                          <Typography className="font-mediuregular text-gray-400 text-xs">
                            0999 | VENCARD-SAQUE
                          </Typography>
                        </Box>
                      </Box>
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
                            Política de Privacidade
                          </Link>{' '}
                          da CONSIGOV.
                        </Typography>
                      </Box>
                    </Box>
                  </form>
                </Box>

                <Box className="absolute bottom-0 left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
                  <button
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none"
                    onClick={handleSimulation}
                  >
                    Ver parcelas
                  </button>
                  <button
                    onClick={() => setOpenModal(!openModal)} // Certifique-se de utilizar o estado correto
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none"
                  >
                    Cancelar
                  </button>
                </Box>
              </Box>

              {/* Resultado da Simulação */}
              {isNotFound ? (
                <Box className="pt-28">
                  {/* <Typography className="text-center text-principal font-bold text-4xl pb-2">
                    Nenhuma simulação encontrada
                  </Typography> */}

                  <EmptyContent
                    title="Nenhuma simulação encontrada"
                    sx={{
                      '& span.MuiBox-root': { height: 200 },
                    }}
                  />

                  <Box className="mx-2 flex flex-2 justify-center my-4 mt-0 text-center">
                    <LoadingButton
                      // className="inline focus:bg-blue-600 font-semibold text-md text-bg-blue pr-4 hover:text-blue-300 hover:underline cursor-pointer"
                      variant="outlined"
                      color="primary"
                      onClick={() => setOpenModal(!openModal)}
                    >
                      Simular
                    </LoadingButton>
                  </Box>
                </Box>
              ) : (
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
                              disabled
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
                              disabled
                              type="text"
                              size="small"
                              value={fCurrencyBrRetorno(simulations?.loanAmount || 0)}
                              aria-label="Valor liberado"
                            />
                          </FormControl>

                          <FormControl className="block mr-2 py-1 px-2">
                            <Typography className="text-gray-700">Parcelas</Typography>

                            <TextField
                              className={`
                  flex-1 appearance-none bg-transparent border-none w-full text-grey-darker  leading-tight focus:outline-none
                `}
                              disabled
                              type="text"
                              size="small"
                              value={(simulations?.numberOfInstallments || 0) + 'X'}
                              aria-label="Valor liberado"
                            />
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
                          disabled
                          className="flex-1 inline-flex items-center"
                          control={<Radio className="form-radio" />}
                          label="Boleto Bancário"
                        />
                      </Box>

                      <Typography className="text-sm font-normal text-principal py-4 px-4 border-b-2 border-gray-100 mb-4">
                        Se programe: a data de vencimento da primeira parcela será no mês
                        consecutivo ao fechamento da folha de pagamento após a liberação do crédito.
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
                        •A taxa de juros anual efetiva (TAE) para empréstimos consignados pode
                        variar entre 18% e 30%, dependendo das condições do mercado e das políticas
                        da instituição financeira.
                      </Typography>
                    </Box>

                    <Box className="flex-1 bg-grey h-12 mt-6 p-6">
                      <Box className="px-4 pl-10">
                        <Typography className="text-left text-gray-400 font-bold text-xl mb-2">
                          Valor das parcelas de
                        </Typography>

                        <Typography className="text-left mb-10">
                          <span className="text-green-500 font-black text-4xl">
                            {simulations?.numberOfInstallments || 0}
                          </span>

                          <span className="text-principal justify-center text-center font-black px-1 text-lg">
                            x
                          </span>

                          <span className="text-green-500 font-black text-4xl">
                            {fCurrencyBr(simulations?.monthlyPayment || 0)}
                          </span>
                        </Typography>

                        <Box
                          className="bg-blue-3  bg-gray-200 border-l-4 border-green-500 text-principal p-2  rounded-md"
                          role="alert"
                        >
                          <Typography className="font-bold">CONSIGOV DIGITAL</Typography>
                          <Typography className="font-normal text-sm">
                            Você sabia? O servidor tem inúmeras vantagens ao fazer pagamentos com
                            cartão de crédito, ganha pontos e concorre a prêmios além de desconto
                            nas lojas parceiras. Para mais informações,
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
                            crédito, Para mais informações, <Link href="#">clique aqui</Link>.
                          </Typography>
                        </Box>

                        <Box className="flex w-full mt-10 justify-center text-center">
                          <button
                            className="bg-red-600 px-6 py-2 text-white hover:bg-red-300 hover:text-principal rounded-xl"
                            onClick={() => handleSubmitSimulacao(simulations)}
                          >
                            QUERO VALIDAR MEU CRÉDITO
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </div>
        </Container>
      </Page>
    </PrivateRoute>
  );
}
