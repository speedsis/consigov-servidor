import {
  Container,
  Grid,
  Stack,
  Button,
  Card,
  Typography,
  CardContent,
  CardHeader,
  CardProps,
} from '@mui/material';
// utils

// components

import { useRouter } from 'next/router';
import { Consignacao, Historico } from 'src/@types/servidor';
import { useSettingsContext } from 'src/components/settings';
import { fCurrencyBr } from 'src/utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  tableData: Consignacao;
}

export default function AppDetailConsignacao({ title, tableData, ...other }: Props) {
  const { push } = useRouter();
  const { themeStretch } = useSettingsContext();

  const {
    contrato,
    servidorId,
    consignatariaId,
    Rublica,
    rublicaId,
    empresaId,
    anoReferencia,
    mesReferencia,
    parcelas,
    parcelaBaixas,
    Historico,
    Comprovante,
    parcelaContrato,
    prazoContrato,
    valorParcela,
    parcelasPagas,
    parcelasPend,
    cdSufixo,
    createdAt,
    updatedAt,
    descricao,
    valtotal,
    dtCadastro,
    dtProcessamento,
    dtCancelamento,
    indice,
    saldoResidual,
    dtInclusao,
    dtFinalizacao,
    renegociada,
    refInicial,
    refFinal,
    origem,
    enviadoFolha,
    suspenso,
    inclusaoAceitaPelaFolha,
    quitacaoAceitaPelaFolha,
    motivoSuspensao,
    motivoInclusaoAceitaPelaFolha,
    motivoQuitacaoAceitaPelaFolha,
    registroAnterior,
    operador,
    status,
  } = tableData;

  // fCurrencyBr(Number(0))

  return (
    <Card {...other}>
      <CardHeader title={title} className="text-gray-400 text-let py-2 " />

      <Container maxWidth={themeStretch ? false : 'xl'} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Card sx={{ mb: 0 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
                      Rublica
                    </Typography>
                    <Typography variant="subtitle2">{`${Rublica.codigo} -  ${Rublica.descricao}`}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Contrato
                    </Typography>
                    <Typography variant="subtitle2">{contrato ?? ' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                      Prazo
                    </Typography>
                    <Typography variant="subtitle2">{prazoContrato ?? ' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                      Prazo restante
                    </Typography>
                    <Typography variant="subtitle2">{Number(prazoContrato) ?? ' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                      Parcelas pagas
                    </Typography>
                    <Typography variant="subtitle2">{' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Valor
                    </Typography>
                    <Typography variant="subtitle2">{fCurrencyBr(Number(valorParcela))}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs>
            <Card sx={{ mb: 0 }}>
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
                      Sequência
                    </Typography>
                    <Typography variant="subtitle2">{parcelaContrato}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Situação
                    </Typography>
                    <Typography variant="subtitle2">{status}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                      Cadastrado em
                    </Typography>
                    <Typography variant="subtitle2">{' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', fontWeight: 'bold' }}
                    >
                      Processado em
                    </Typography>
                    <Typography variant="subtitle2">{' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Cancelado em
                    </Typography>
                    <Typography variant="subtitle2">{' - '}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Origem
                    </Typography>
                    <Typography variant="subtitle2">{'LANÇAMENTO MANUAL'}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
}
