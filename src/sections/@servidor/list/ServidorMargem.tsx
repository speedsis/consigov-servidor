import { useContext } from 'react';
import AppListSolicitacaoMargemOnline from '../components/AppListSolicitacaoMargemOnline';
import { ServidorContext } from 'src/context/ServidorContext';

export default function ProfileDependentes() {
  const { servidor } = useContext(ServidorContext);
  const margem = servidor?.SolicitaLiberacaoMargem ?? [];

  return (
    <>
      <AppListSolicitacaoMargemOnline
        title="Solitação para visualização de margem(on-line)"
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
