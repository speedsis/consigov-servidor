/* eslint-disable jsx-a11y/alt-text */
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
// utils

import styles from './RelatorioComprovanteStyle';

import { fCurrencyBr } from 'src/utils/formatNumber';
import _uniqBy from 'lodash/uniqBy';
import { fDateNow, fDateNowNew } from 'src/utils/formatTime';

import { Consignacao, ServidorBasic } from 'src/@types/servidor';
import { Divider } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  relConsignacao: Consignacao;
  relServidor: ServidorBasic;
};

const today = new Date();
const todayFormatted = today.toLocaleDateString('pt-BR');

export default function RelatorioComprovantePDF({ relConsignacao, relServidor }: Props) {
  // const sortedRel130 = relAnalitico.sort((a, b) => a.Servidor.nome.localeCompare(b.Servidor.nome));

  const { id, nome, matricula, cpf, cargo, regime, rg, dtAdmissao, margem10, margemReservada } =
    relServidor;

  const {
    contrato,
    servidorId,
    consignatariaId,
    Rublica,
    rublicaId,
    empresaId,
    anoReferencia,
    mesReferencia,
    Historico,
    Comprovante,
    parcelaContrato,
    Empresa,
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
  } = relConsignacao;

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} orientation="portrait">
          <View style={{ alignItems: 'center', flexDirection: 'column' }}>
            <Text style={styles.title}>
              {`Comprovante de Autorização de Desconto em Folha de Pagamento`}{' '}
            </Text>
          </View>

          <View>
            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={[styles.tableCell_6, styles.alignLeft]}>
                <Text>
                  <Text style={styles.titleSub}>Serial Nº: {id} </Text>
                </Text>
              </View>

              <View style={[styles.tableCell_5, styles.alignRight]}>
                <Text style={styles.titleSub}>Data: {todayFormatted}</Text>
              </View>
            </View>
          </View>

          {/* <View style={[styles.gridContainer, styles.mb8]}>
            <Text>
              <Text style={styles.overline}>Dados do Colaborador:</Text>
            </Text>
          </View> */}

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={[styles.gridContainer]}>
                  <Text>
                    <Text style={styles.overline}>Dados do Colaborador:</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.tableRow]}>
              <View style={[styles.tableCell_6, styles.alignLeft]}>
                <Text>
                  <Text style={styles.subtitle5}>Colaborador: {nome}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Estabelecimento: {Empresa?.nome}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Matrícula: {matricula}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Vínculo: {regime}</Text>
                </Text>
              </View>

              <View style={[styles.tableCell_6, styles.alignRight]}>
                <Text>
                  <Text style={styles.subtitle5}> Data de admissão: {fDateNowNew(dtAdmissao)}</Text>
                </Text>
                <Text>
                  {' '}
                  <Text style={styles.subtitle5}>CPF: {cpf}</Text>
                </Text>
                <Text>
                  {' '}
                  <Text style={styles.subtitle5}>
                    Situação funcional no aceite: TRABALHANDO
                  </Text>{' '}
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.tableRow, styles.mb20]}>
              <View style={[styles.tableCell_6, styles.alignLeft]}>
                <Text>
                  <Text style={styles.subtitle5}>
                    Instituição consignatária: VEMCARD PARTICIPACOES LTDA{' '}
                  </Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Representante: VEMCARD PARTICIPACOES LTDA</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>
                    Código financeiro: {Rublica?.codigo} | {Rublica?.descricao}{' '}
                  </Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Usuário última alteração: CONSIGOV</Text>
                </Text>
              </View>

              <View style={[styles.tableCell_6, styles.alignRight]}>
                <Text>
                  <Text style={styles.subtitle5}> CNPJ: 44.100.799/0001-63 </Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}> CNPJ: 44.100.799/0001-63</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}> Operação: {'NOVA_CONSIGNACAO'}</Text>
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={[styles.gridContainer]}>
                  <Text>
                    <Text style={styles.overline}>Dados da Autorizaçao de desconto em folha:</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <View style={[styles.tableRow, styles.mb40]}>
              <View style={[styles.tableCell_6, styles.alignLeft]}>
                <Text>
                  <Text style={styles.subtitle5}>ADF: {id}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>N Contrato no convênio: {contrato}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Valor líquido liberado: {' - '}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Quantidade de parcelas: {prazoContrato}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>
                    Total à pagar: {fCurrencyBr(Number(valorParcela * prazoContrato))}
                  </Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>Data venc 1 parcela: {' - '}</Text>
                </Text>
              </View>

              <View style={[styles.tableCell_6, styles.alignRight]}>
                <Text>
                  <Text style={styles.subtitle5}> Data do contrato: {fDateNowNew(dtCadastro)}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}> Data lib. recurso Financ.: {' - '}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}> Folha primeniro desconto: {'abril/2024'}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}> Data do contrato: {fDateNowNew(createdAt)}</Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>
                    Valor parcela mensal: {fCurrencyBr(Number(valorParcela))}
                  </Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>
                    Margem antes do contrato: {fCurrencyBr(Number(margem10))}
                  </Text>
                </Text>
                <Text>
                  <Text style={styles.subtitle5}>
                    Margem após contrato:{' '}
                    {fCurrencyBr(Number(margem10) - Number(valorParcela)) || fCurrencyBr(Number(0))}
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* <View style={[styles.gridContainer, styles.mb20]}>
            <View style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
              <Text style={styles.textSignMsg}>
                Assinado eletronicamente através de senha individual:
              </Text>
            </View>
          </View> */}

          <View style={[styles.gridContainer, styles.mb40]}>
            <View style={{ alignItems: 'flex-start', flexDirection: 'column' }}>
              <View style={[styles.borderTop]}>
                <Text style={styles.textSign}> {nome} </Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
              <View style={[styles.borderTop]}>
                <Text style={styles.textSign}> VEMCARD PARTICIPAÇÕES LTDA </Text>
              </View>
            </View>
          </View>

          <View style={[styles.table, styles.mb8]}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell_8, styles.alignCenter]} />
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCell_8, styles.alignCenter]}>
                  <Text style={styles.subtitle2}>
                    Emitido em : {todayFormatted} - Faça o seu papel, imprima apenas o necessário!
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
