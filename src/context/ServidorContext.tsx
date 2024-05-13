import React, { createContext, useState, useEffect, PropsWithChildren, useContext } from 'react';
import { Servidor } from 'src/@types/servidor';
import * as utils from 'src/auth/utils';

export const revalidate = 36; // revalidate at most every hour

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
  // Estado para armazenar os dados do servidor
  const [servidor, setServidor] = useState<Servidor | null>(null);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(true);

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

  console.log('servidor servidor : ', servidor);

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
