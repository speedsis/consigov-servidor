import { useContext, useState } from 'react';
import { useSnackbar } from 'notistack';
import AppListSolicitacaoMargemOnline from '../components/AppListSolicitacaoMargemOnline';
import { ServidorContext } from 'src/context/ServidorContext';
import { SolicitaLiberacaoMargem } from 'src/@types/servidor';

export default function ProfileDependentes() {
  const { servidor } = useContext(ServidorContext);
  const margem = servidor?.SolicitaLiberacaoMargem ?? [];

  const { enqueueSnackbar } = useSnackbar();
  const [loadingSend, setLoadingSend] = useState(false);

  const handleEdit = (row: SolicitaLiberacaoMargem) => {
    ProcessaSubmit(row);
  };

  const ProcessaSubmit = async (data: SolicitaLiberacaoMargem) => {
    const varUrlName = process.env.NEXT_PUBLIC_API_DEVELOPER_URL;

    const newData = {
      id: data.id,
      status: data.status,
    };
    const url = `${varUrlName}/solicita-liberacao/status/${data.id}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
        next: {
          tags: [`servidor-query`],
          revalidate: 1,
        },
      });

      if (response.ok) {
        const updatedData = await response.json();

        if (updatedData.success === false) {
          throw new Error(updatedData.error);
        }

        enqueueSnackbar('Status alterado com sucesso!', { variant: 'success' });
      } else {
        enqueueSnackbar('Erro ao alterar status!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoadingSend(false);
    }
  };

  return (
    <>
      <AppListSolicitacaoMargemOnline
        title="Solitação para visualização de margem(on-line)"
        onEditMargemRow={handleEdit}
        tableData={margem!}
        tableLabels={[
          { id: 'consignataria', align: 'left', label: 'Consignatária' },
          { id: 'entidade', align: 'left', label: 'Entidade' },
          { id: 'status', align: 'left', label: 'Status' },
          { id: 'dias', align: 'right', label: 'dias' },
          { id: 'prazo', align: 'right', label: 'Prazo liberação' },
          { id: 'dtcadastro', align: 'right', label: 'Cadastrado em' },
          { id: '', align: 'right', label: 'Ação' },
        ]}
      />
    </>
  );
}
