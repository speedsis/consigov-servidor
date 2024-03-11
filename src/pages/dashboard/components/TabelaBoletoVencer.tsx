interface Financeiro {
  id: string;
  parcela: number;
  vencimento: string;
  valor: number;
  juros: number;
  devido: number;
}

interface TabelaBoletoVencerProps {
  financeiro: Financeiro[];
}

export default function TabelaBoletoVencer(props: TabelaBoletoVencerProps) {
  function rendereizarCabecalho() {
    return (
      <tr>
        <th className={` text-right text-xs p-2`}>Parcela</th>
        <th className={` text-right text-xs p-2`}>Vencimento</th>
        <th className={` text-right text-xs p-2`}>Valor</th>
        <th className={` text-right text-xs p-2`}>Juros</th>
        <th className={` text-right text-xs p-2`}>Valor Devido</th>
        {/* {exibirAcoes ?  <th className={` text-center p-2`}>Ações</th> : false} */}
      </tr>
    );
  }

  function renderizarDados() {
    return (
      <div className="justify-center text-center items-center w-full">
        <p className={` text-center p-2 text-gray-400`}> Não há dados </p>
      </div>
    );
  }

  return (
    <table
      className={`
              w-full    overflow-hidden
        `}
    >
      <thead
        className={`
                 border-t-2 border-b-2 border-gray-300
            `}
      >
        {rendereizarCabecalho()}
      </thead>
      <tbody>{renderizarDados()}</tbody>
    </table>
  );
}
