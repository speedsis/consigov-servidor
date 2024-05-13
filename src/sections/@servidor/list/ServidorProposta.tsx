import AppListProposta from '../components/AppListProposta';
import { useContext } from 'react';
import { ServidorContext } from 'src/context/ServidorContext';

export default function ServidorProposta() {
  const { servidor } = useContext(ServidorContext);
  const proposta = servidor?.Proposta ?? [];

  return (
    <>
      <AppListProposta
        title="Propostas (Consignatária/Servidor)"
        tableData={proposta!}
        tableLabels={[
          { id: 'rublica', align: 'left', label: 'Rublica' },
          { id: 'prazo', align: 'center', label: 'Prazo' },
          { id: 'restante', align: 'center', label: 'Restante' },
          { id: 'valor', align: 'right', label: 'Valor' },
          { id: 'total', align: 'right', label: 'Vlr. total' },
          { id: 'situacao', align: 'left', label: 'Situação' },
          { id: 'dtutilizacao', align: 'center', label: 'Cadastrado em' },
          { id: 'dtcancelamento', align: 'center', label: 'Processado em' },
          { id: 'dtcancelamento', align: 'center', label: 'Cancelado em' },
          { id: '', align: 'center', label: 'Ação' },
        ]}
      />
    </>
  );
}
