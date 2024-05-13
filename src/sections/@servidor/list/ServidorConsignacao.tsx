import { useSnackbar } from 'notistack';
import { useModal } from 'src/state/modalState';
import { ModalIds } from 'src/@types/modal-ids';

// import DetalheConsignacaoModal from 'src/sections/@consignacao/modal/DetalheConsignacaoModal';
import { Consignacao, ServidorBasic } from 'src/@types/servidor';

import { useTemporaryItem } from 'src/state/useTemporaryItem';
import AppListConsignacao from '../components/AppListConsignacao';
import { useContext } from 'react';
import { ServidorContext } from 'src/context/ServidorContext';
import DetalheConsignacaoModal from '../modal/DetalheConsignacaoModal';
// import SuspenderConsignacaoModal from 'src/sections/@consignacao/modal/SuspenderConsignacaoModal';
// import { useContext } from 'react';
// import { AuthContext } from 'src/auth/AuthProvider';
// import { useUserData } from 'src/context/userDataContext';

export default function ServidorConsignacao() {
  //   const { currentServidor, setCurrentServidor } = useServidorState();
  const { servidor } = useContext(ServidorContext);
  const consignacao = servidor?.Consignacoes ?? [];

  // const consignatariaId = auth ? (auth as any)?.consignataria[0]?.id : null;
  const consignatariaId = '0999'; //userData?.consignataria.id as string;

  // Aplicando o filtro
  const consignacoesFiltradas = consignacao.filter(
    (consignacao) => consignacao.consignatariaId === consignatariaId
  );

  const [tempRecord, recordState] = useTemporaryItem(consignacoesFiltradas);

  const row = servidor;
  const servidorBasic: ServidorBasic = {
    id: row?.id || '',
    nome: row?.nome || '',
    matricula: row?.matricula || '',
    cargo: row?.Cargo[0]?.Cargo?.descricao || '',
    dtAdmissao: row?.dtAdmissao ? new Date(row.dtAdmissao) : null,
    regime: row?.Regime?.descricao || '',
    cpf: row?.cpf || '',
    rg: row?.rg || '',
    margem30: row?.margem30 || 0,
    margem10: row?.margem10 || 0,
    margemReservada: row?.margemReservada || 0,
    salarioBase: row?.salarioBase || 0,
    salarioMinimo: row?.salarioMinimo || 0,
    salarioBruto: row?.salarioBruto || 0,
    salarioLiquido: row?.salarioLiquido || 0,
    descontoObrigatorio: row?.descontoObrigatorio || 0,
  };

  // const [currentSelected, setCurrentSelected] = useState<Consignacao | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const modalState = useModal();

  const handleClickSuspender = (row: Consignacao) => {
    recordState.setTempId(row.id);
    modalState.openModal(ModalIds.SuspenderConsignacao);
  };

  const onClickDetalhes = (row: Consignacao) => {
    recordState.setTempId(row.id);
    modalState.openModal(ModalIds.DetalheConsignacao);
  };

  if (!servidor) {
    return null;
  }

  return (
    <>
      <AppListConsignacao
        title="Consignações"
        onClickDetalhes={onClickDetalhes}
        onClickCancelaSuspender={handleClickSuspender}
        tableData={consignacoesFiltradas!}
        tableLabels={[
          { id: 'id', align: 'left', label: 'Codigo' },
          { id: 'rublica', align: 'left', label: 'Rublica' },
          { id: 'prazo', align: 'center', label: 'Prazo' },
          { id: 'restante', align: 'center', label: 'Parcela' },
          { id: 'valor', align: 'right', label: 'Valor' },
          { id: 'status', align: 'center', label: 'Situação' },
          { id: 'dtcadastro', align: 'left', label: 'Cadastrado em' },
          { id: 'dtconfirmacao', align: 'left', label: 'Processado em' },
          { id: 'dtutilizacao', align: 'left', label: 'Cancelado em' },
          { id: '', align: 'center', label: 'Ações' },
        ]}
      />

      <DetalheConsignacaoModal
        currentData={tempRecord!}
        servidorBasic={servidorBasic}
        onClose={() => {}}
      />

      {/* <PDFDialog open={openDialog} onClose={handleCloseDialog} dataFiltered={[]} /> */}
    </>
  );
}
