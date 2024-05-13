import { Box, Divider, Tabs, Tab, TableContainer, Card } from '@mui/material';
// type FormValuesProps = ClienteDependente;

import { Modal } from 'src/components/modal/Modal';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { useState } from 'react';
import { useModal } from 'src/state/modalState';
import { ModalIds } from 'src/@types/modal-ids';
import { capitalCase } from 'change-case';
import Scrollbar from 'src/components/scrollbar';
import useTabs from 'src/hooks/useTabs';
import { Consignacao, ServidorBasic } from 'src/@types/servidor';
import { TabContext } from '@mui/lab';

import AppDetailConsignacao from './components/AppDetailConsignacao';
import AppListComprovante from './components/AppListComprovante';
import AppListHistorico from './components/AppListHistorico';
import PDFDialog from '../relatorio/PDFDialog';

interface Props {
  currentData?: Consignacao | null;
  servidorBasic: ServidorBasic;
  onClose?(): void;
}

export default function DetalheConsignacaoModal(props: Props) {
  const { onClose, currentData, servidorBasic } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const { Comprovante, Historico } = currentData || {};

  const isEdit = Boolean(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const modalState = useModal();

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('Consignacao');

  function handleClose() {
    modalState.closeModal(ModalIds.DetalheConsignacao);
    onClose;
  }

  const handleClickPrint = (id: string) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // const methods = useForm();

  const PROFILE_TABS = [
    {
      value: 'Consignacao',
      icon: <Iconify icon={'fluent-emoji:credit-card'} width={20} height={20} />,
      component: <AppDetailConsignacao title="Consignação" tableData={currentData!} />,
    },
    {
      value: 'Comprovantes',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: (
        <AppListComprovante
          title="Comprovante"
          onClickPrint={handleClickPrint}
          tableData={Comprovante || []}
          tableLabels={[
            { id: 'Tipo', align: 'left', label: 'Tipo' },
            { id: 'rublica', align: 'left', label: 'Serial' },
            { id: 'prazo', align: 'center', label: 'Data' },
            { id: '', align: 'center', label: 'Ações' },
          ]}
        />
      ),
    },
    {
      value: 'Historico',
      icon: <Iconify icon={'material-symbols:manage-history'} width={20} height={20} />,
      component: (
        <AppListHistorico
          title="Histórico"
          tableData={Historico || []}
          tableLabels={[
            { id: 'tipo', align: 'left', label: 'Tipo' },
            { id: 'motivo', align: 'left', label: 'Motivo' },
            { id: 'dtdocumento', align: 'center', label: 'Data documento' },
            { id: 'oficio', align: 'center', label: 'Número do ofício' },
            { id: 'processo', align: 'center', label: 'Número do processo' },
            { id: 'juizado', align: 'left', label: 'Juizado' },
            { id: 'juiz', align: 'left', label: 'Juiz' },
            { id: 'obs', align: 'left', label: 'Observação' },
            { id: 'cadastradopor', align: 'center', label: 'Cadastrado em' },
            { id: 'cadastradoem', align: 'center', label: 'Cadastrado por' },
          ]}
        />
      ),
    },
  ];

  return (
    <Modal
      title={isEdit ? 'Editar averbação' : 'Consignação detalhe'}
      onClose={handleClose}
      isOpen={modalState.isOpen(ModalIds.DetalheConsignacao)}
      className="w-[1200px]"
    >
      <Card>
        <Box sx={{ px: 3 }}>
          <TabContext value={filterStatus}>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatus}
              onChange={onFilterStatus}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>

            {/* </TabsWrapperStyle> */}
            {/* </Card> */}

            <Box sx={{ mb: 1 }} />

            <Divider />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, minHeight: 380, position: 'relative', mt: 2 }}>
                {PROFILE_TABS.map((tab) => {
                  const isMatched = tab.value === filterStatus;
                  return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
              </TableContainer>
            </Scrollbar>
          </TabContext>
        </Box>
      </Card>

      <PDFDialog
        open={openDialog}
        onClose={handleCloseDialog}
        dataFiltered={currentData!}
        dataServidor={servidorBasic}
      />
    </Modal>
  );
}
