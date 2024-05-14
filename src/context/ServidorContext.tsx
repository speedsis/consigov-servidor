import React, { createContext, useState, useEffect, PropsWithChildren, useContext } from 'react';
import { Servidor } from 'src/@types/servidor';
import * as utils from 'src/auth/utils';
import { useAuthSwr } from 'src/hooks/useAuthSwr';

// Defina o tipo para o contexto
type ServidorContextProps = {
  servidor: Servidor | null;
  loading: boolean;
  setServidor: (novoServidor: Servidor | null) => void;
};

const initContextData: ServidorContextProps = {
  servidor: null,
  loading: true,
  setServidor: () => {}, // Inicialmente uma função vazia
};

export const ServidorContext = createContext(initContextData);

// Crie o provedor de contexto
const ServidorProvider = (props: PropsWithChildren) => {
  const [servidor, setServidor] = useState<Servidor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const servidorCpf = '01936830248';

  // Efeito para carregar o servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await utils.getServidor();
        setServidor(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao obter servidor:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Use o hook useAuthSwr para buscar os dados do servidor
  const { data, error } = useAuthSwr(`servidor/clukjlqxp0000ik9inf67gl1f?cpf=${servidorCpf}`, {
    refreshInterval: 20000,
    fallbackData: servidor,
  });

  // Atualize o estado do servidor com os dados recebidos
  useEffect(() => {
    if (data) {
      setServidor(data);
      setLoading(false);
    }

    if (error) {
      console.error('Erro ao obter servidor:', error);
      setLoading(false);
    }
  }, [data, error]);

  // Função para atualizar o servidor
  const handleSetServidor = (novoServidor: Servidor | null) => {
    setServidor(novoServidor);
  };

  // Retorne o provedor de contexto, envolvendo os componentes filhos
  return (
    <ServidorContext.Provider value={{ servidor, loading, setServidor: handleSetServidor }}>
      {props.children}
    </ServidorContext.Provider>
  );
};

export default ServidorProvider;
