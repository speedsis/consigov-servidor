import useSWR, { SWRConfiguration } from 'swr';
import makeHttp from 'src/utils/http';

export function useAuthSwr(url: string, config?: SWRConfiguration) {
  const varUrlName = process.env.NEXT_PUBLIC_API_DEVELOPER_URL;
  const newUrl = `${varUrlName}/${url}`;

  const { data, error } = useSWR(newUrl, fetcher, {
    refreshInterval: 3000,
  });

  async function fetcher(newUrl: string) {
    try {
      const response = await makeHttp(newUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer a solicitação');
      }

      const responseData = await response.json();

      // Verifique se responseData é válido antes de retorná-lo
      if (!responseData) {
        throw new Error('Resposta inválida');
      }

      return responseData.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      throw error;
    }
  }

  return { data, error };
}
