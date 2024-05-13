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

export function convertDateToISO(dateString: string): string | undefined {
  const day = dateString.substring(0, 2);
  const month = dateString.substring(2, 4);
  const year = dateString.substring(4, 8);

  const isoDate = `${year}-${month}-${day}`;

  if (!isNaN(new Date(isoDate).getTime())) {
    return new Date(isoDate).toISOString();
  }
}

export function formatCPFAsteristico(cpf: string | undefined | null) {
  if (!cpf) return '';

  const digits = cpf.replace(/\D/g, ''); // Remover caracteres não numéricos
  const firstThree = digits.substr(3, 3);
  const lastThree = digits.substr(-5, 3);

  return `***${firstThree}-${lastThree}***`;
}

export function fDateNew(date: InputValue | undefined, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateNowNew(date: InputValue | undefined, newFormat?: string) {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateNowMonthYearExt(date: Date) {
  // Função para formatar a data no formato "Março/2024"
  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]}/${year}`;
}

export function fDateNowMonthYear(date: Date) {
  // Função para formatar a data no formato "Março/2024"
  const monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]}${year}`;
}
