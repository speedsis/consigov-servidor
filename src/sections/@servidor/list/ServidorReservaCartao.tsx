import AppListReservaCartao from '../components/AppListReservaCartao';
import { useContext } from 'react';
import { ServidorContext } from 'src/context/ServidorContext';

export default function ServidorReservaCartao() {
  const { servidor } = useContext(ServidorContext);
  const reserva = servidor?.ReservaCartao ?? [];

  const handleEdit = (reserva: any) => {};

  return (
    <>
      <AppListReservaCartao
        title="Reserva de cartão"
        onEditRow={handleEdit}
        tableData={reserva!}
        tableLabels={[
          { id: 'consignataria', align: 'left', label: 'Consignatária' },
          { id: 'valor', align: 'right', label: 'Valor' },
          { id: 'status', align: 'center', label: 'Status' },
          { id: 'criadoport', align: 'left', label: 'Criado por' },
          { id: 'criadoem', align: 'center', label: 'Criado em' },
          { id: 'criadoem', align: 'center', label: 'Dt. reserva' },
          { id: '', align: 'center', label: 'Ação' },
        ]}
      />
    </>
  );
}
