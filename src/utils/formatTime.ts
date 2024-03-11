import { format, getTime, formatDistanceToNow, parse } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fDateNow(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy');
}

export function fDateImport(date: string | number): string {
  // Converte a data no formato "DDMMYYYY" para "YYYY-MM-DD"
  const formattedDate = date.toString().replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1');

  // Cria um objeto Date
  const dateObject = parse(formattedDate, 'yyyy-MM-dd', new Date());

  // Verifica se o objeto Date é válido
  if (!isNaN(dateObject.getTime())) {
    return format(dateObject, 'dd/MM/yyyy');
  } else {
    // Retornar uma string vazia ou outra representação padrão, dependendo do seu caso
    return 'Data inválida';
  }
}

export function formatCPFAsteristico(cpf: string | undefined | null) {
  if (!cpf) return '';

  const digits = cpf.replace(/\D/g, ''); // Remover caracteres não numéricos
  const firstThree = digits.substr(3, 3);
  const lastThree = digits.substr(-5, 3);

  return `***${firstThree}-${lastThree}***`;
}
