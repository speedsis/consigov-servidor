import numeral from 'numeral';

export function fCurrency(number: string | number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function currencyFormatter(value: any) {
  if (!Number(value)) return '';

  const amount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value / 100);

  return `${amount}`;
}

export function currencyFormatterRetorno(value: any) {
  const numericValue = Number(value);

  // Verifica se o valor é zero
  if (numericValue === 0) {
    return 'R$ 0,00';
  }

  // Restante da lógica para valores diferentes de zero
  if (!isNaN(numericValue)) {
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(numericValue / 100);

    return `${amount}`;
  }

  // Se não for um número válido, retorna uma string vazia
  return '';
}

export function fCurrencyBr(number: string | number) {
  return number?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function fCurrencyBrCupom(number: string | number) {
  const formattedNumber = numeral(number).format(`R$ 0,0.00`);
  return formattedNumber;
}

export function fCurrencyBr2(number: string | number) {
  const formattedNumber = numeral(number).format(`R$ 0,0.00`);
  return formattedNumber;
}

//  {(valprecovarejo * quantity)?.toLocaleString('pt-br', {
//           style: 'currency',
//           currency: 'BRL',
//         })}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}
