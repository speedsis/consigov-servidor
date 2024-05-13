import Infofield from 'src/components/infofield';
import { PersonFill } from 'react-bootstrap-icons';

import { fDateNew, formatCPFAsteristico } from 'src/utils/formatTime';
import { useContext } from 'react';
import { ServidorContext } from 'src/context/ServidorContext';

// ----------------------------------------------------------------------

// type Props = {
//   currentServidor: Servidor;
// };

export default function ServidorDados() {
  const { servidor } = useContext(ServidorContext);

  return (
    <div className="flex flex-col sm:flex-row items-start  p-4 card">
      <PersonFill className="text-gray-500/60 w-[150px] h-[150px] sm:mr-8" />

      <div className="flex flex-col mt-2 sm:mt-0">
        <Infofield label="Nome do servidor">{servidor?.nome ?? ' - '}</Infofield>
        <Infofield label="CPF">{formatCPFAsteristico(servidor?.cpf) ?? ' - '}</Infofield>
        <Infofield label="Matrícula">{servidor?.matricula ?? ' - '}</Infofield>
        <Infofield label="Dt. nascimento">{fDateNew(servidor?.dtNascimento) ?? ' - '}</Infofield>
        <Infofield label="Banco">{servidor?.banco ?? ' - '}</Infofield>
        <Infofield label="Agência">{servidor?.agencia ?? ' - '}</Infofield>
        <Infofield label="Conta">{servidor?.conta ?? ' - '}</Infofield>
      </div>

      <div className="flex flex-col mt-2 sm:mt-0 sm:ml-8">
        <Infofield label="Regime de trabalho">{servidor?.Regime?.descricao ?? ' - '}</Infofield>
        <Infofield label="Data de Admissão">{fDateNew(servidor?.dtAdmissao) ?? ' - '}</Infofield>
        <Infofield label="Orgão">{servidor?.Orgao?.descricao ?? ' - '}</Infofield>
        <Infofield label="Ano/Mês da Última Atualização">{' MAR/2024 '}</Infofield>
        <Infofield label="Cadastro ativo">{'Sim'}</Infofield>

        {servidor?.Cargo && servidor.Cargo.length > 0 ? (
          <Infofield label="Cargo">{servidor.Cargo[0].Cargo.descricao}</Infofield>
        ) : (
          <Infofield label="Cargo">Não informado</Infofield>
        )}

        {/* <Infofield label="Unidade">{servidor?.unidade?.label}</Infofield> */}
      </div>

      <div className="flex flex-col mt-2 sm:mt-0 sm:ml-8">
        {/* <Infofield label="Relação de Trabaho">
          {currentServidor?.Regime?.descricao ?? ' - '}
        </Infofield>
        <Infofield label="Prazo Final do Vínculo">{' - '}</Infofield>
        
        <Infofield label="Categoria">{' - '}</Infofield>
        <Infofield label="Competência das férias">{' - '}</Infofield>
        */}
      </div>
    </div>
  );
}
