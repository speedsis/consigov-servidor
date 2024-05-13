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

export function fCurrencyBrArquivo(number: string | number) {
  // Verificar se o número é válido
  if (typeof number !== 'string' && typeof number !== 'number') {
    return '0,00'; // Retornar um valor padrão se o número não for válido
  }

  // Converter o número para um valor numérico
  const num = typeof number === 'string' ? parseFloat(number) : number;

  // Verificar se o número possui casas decimais
  const hasDecimal = num % 1 !== 0;

  // Formatando o número de acordo com as regras
  if (hasDecimal) {
    // Se o número tiver casas decimais, formatar com duas casas decimais e vírgula como separador decimal
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    // Se o número for um inteiro (sem casas decimais), formatar sem separador de milhares e sem casas decimais
    return num.toLocaleString('pt-BR', { useGrouping: false }) + ',00';
  }
}

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

export function fCurrencyBrRetorno(number: string | number) {
  return number?.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatCurrencyInput(number: string | number) {
  // Converta o valor para string se já não for
  const stringValue = typeof number === 'string' ? number : number.toString();

  // Remove todos os caracteres que não sejam dígitos ou ponto
  let numericValue = stringValue.replace(/[^\d.]/g, '');

  // Se houver mais de um ponto decimal, mantenha apenas o primeiro
  const decimalIndex = numericValue.indexOf('.');
  if (decimalIndex !== -1) {
    numericValue =
      numericValue.slice(0, decimalIndex + 1) +
      numericValue.slice(decimalIndex + 1).replace(/\./g, '');
  }

  // Converta o valor para número e formate para o formato de moeda com duas casas decimais
  const formattedValue = parseFloat(numericValue).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue;
}
