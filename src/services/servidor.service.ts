import { EmpresaOnServidor, Servidor, ServidorMargem } from 'src/@types/servidor';

import makeHttp from 'src/utils/http';

export class ServidorService {
  async getServidor(empresaId: string, filter: string, filterTipo: string): Promise<Servidor> {
    const varUrlName = process.env.NEXT_PUBLIC_API_DEVELOPER_URL;

    const url =
      filterTipo === 'matricula' || filterTipo === ''
        ? `${varUrlName}/servidor/${empresaId}?matricula=${filter}`
        : `${varUrlName}/servidor/${empresaId}?cpf=${filter}`;

    try {
      const config: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['servidor-query'],
          revalidate: 1,
        },

        // Aqui você pode adicionar outras configurações, como body para POST, PUT, etc.
      };
      const response = await makeHttp(url, config);

      if (!response.ok) {
        throw new Error('Erro ao fazer a solicitação');
      }
      const data = await response.json();

      const servidor = data.data;

      const empresasFiltradas = servidor.Empresas.filter(
        (empresa: EmpresaOnServidor) => empresa.empresaId === empresaId
      );

      if (empresasFiltradas.length > 0) {
        // A empresa está presente, então mantenha o servidor
        return servidor;
      } else {
        // A empresa não está presente, então descarte o servidor
        return {} as Servidor;
      }

      // return servidor;
    } catch (error) {
      return error;
    }
  }

  async getServidorOne(servidorId: string): Promise<ServidorMargem> {
    const varUrlName = process.env.NEXT_PUBLIC_API_DEVELOPER_URL;

    // console.log('servidorId ', servidorId);

    const url = `${varUrlName}/servidor/one/${servidorId}`;

    try {
      const config: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['servidor-query'],
          // revalidate: 1,
        },
        // Aqui você pode adicionar outras configurações, como body para POST, PUT, etc.
      };
      const response = await makeHttp(url, config);

      // console.log('response margem ', response);

      if (!response.ok) {
        throw new Error('Erro ao fazer a solicitação');
      }
      const data = await response.json();

      const margem = data.data;

      return margem;
    } catch (error) {
      return error;
    }
  }
}
