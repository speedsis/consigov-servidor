import { useSnackbar } from 'notistack';
import AppListSimulacao from '../components/AppListSimulacao';
import { useContext, useState, cache } from 'react';
import { ServidorContext } from 'src/context/ServidorContext';
import { Servidor, Simulacao } from 'src/@types/servidor';

export const revalidate = 10; // revalidate the data at most every hour

export default function ServidorSimulacao() {
  const { servidor, setServidor } = useContext(ServidorContext);
  const simulacao = servidor?.Simulacao ?? [];

  const { enqueueSnackbar } = useSnackbar();
  const [loadingSend, setLoadingSend] = useState(false);

  const handleEdit = (row: Simulacao) => {
    ProcessaSubmit(row);
  };

  const ProcessaSubmit = async (data: Simulacao) => {
    const varUrlName = process.env.NEXT_PUBLIC_API_DEVELOPER_URL;

    // setLoadingSend(true);
    console.log(data);

    const newData = {
      id: data.id,
      status: data.status,
    };

    console.log(newData);

    const url = `${varUrlName}/simulacao/status/${data.id}`;

    console.log(url);

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

        const newServidor = {
          ...servidor,
          Simulacao: servidor?.Simulacao
            ? servidor.Simulacao.map((v) => (v.id === data.id ? { ...v, status: data.status } : v))
            : [data],
        };

        setServidor(newServidor as Servidor);

        console.log(updatedData);

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
      <AppListSimulacao
        title="Simulações de empréstimos"
        onEditPropostaRow={handleEdit}
        tableData={simulacao}
        tableLabels={[
          { id: 'parcela', align: 'right', label: 'Parcela' },
          { id: 'valor', align: 'right', label: 'Valor a receber' },
          { id: 'prazo', align: 'center', label: 'Prazo' },
          { id: 'status', align: 'center', label: 'Status' },

          { id: '', align: 'center', label: 'Ação' },
        ]}
      />
    </>
  );
}
