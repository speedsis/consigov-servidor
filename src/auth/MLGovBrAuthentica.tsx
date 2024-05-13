import { useEffect, useState } from 'react';

const MLGovBrAuthentica = (props: any) => {
  const [data, setData] = useState({
    auth: null,
    handleGovBrAuthResponse: () => {},
  });

  useEffect(() => {
    const handleNavigation = (event: MessageEvent) => {
      if (event.origin !== 'https://www.cesodigital.com.br') {
        return;
      }

      const responseUrl = new URL(event.data);
      console.log(`Response URL: gov.br ${responseUrl}`);

      readResponse(responseUrl);
    };

    window.addEventListener('message', handleNavigation);

    const webView = document.createElement('iframe');
    webView.src = 'https://cesodigital.com.br/login';
    document.body.appendChild(webView);

    return () => {
      window.removeEventListener('message', handleNavigation);
      document.body.removeChild(webView);
    };
  }, []);

  const readResponse = async (retorno: URL) => {
    try {
      const response = await fetchDataFromUrl(retorno);

      console.log(`Response: gov.br ${response.status}`);

      if (response.status === 200) {
        const data = await response.json();
        // Atualize o estado de autenticação conforme necessário
        setData((oldData) => ({
          // ... (outras propriedades existentes)
          auth: data,
          handleGovBrAuthResponse: oldData.handleGovBrAuthResponse,
        }));
        await processaResposta();
      } else {
        console.log(`Response: gov.br ${response.status}`);
        // Trate o erro de autenticação conforme necessário
      }
    } catch (error) {
      console.error('Erro ao processar a resposta:', error);
    }
  };

  const fetchDataFromUrl = async (url: URL): Promise<Response> => {
    try {
      const response = await fetch(url.href);
      if (response.status !== 200) {
        console.error('Erro ao buscar dados:', response.status);
      }

      return response;
    } catch (error) {
      console.error('Erro de rede:', error);
      throw error;
    }
  };

  // ... (seu código existente)
  const processaResposta = async () => {};
};

export default MLGovBrAuthentica;
