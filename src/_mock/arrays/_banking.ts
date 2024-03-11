import _mock from '../_mock';

// ----------------------------------------------------------------------

export const _bankingContacts = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  avatar: _mock.image.avatar(index),
}));

export const _bankingCreditCard = [
  {
    id: _mock.id(2),
    balance: 23432.03,
    cardType: 'mastercard',
    cardHolder: _mock.name.fullName(2),
    cardNumber: '**** **** **** 3640',
    cardValid: '11/22',
  },
  {
    id: _mock.id(3),
    balance: 18000.23,
    cardType: 'visa',
    cardHolder: _mock.name.fullName(3),
    cardNumber: '**** **** **** 8864',
    cardValid: '11/25',
  },
  {
    id: _mock.id(4),
    balance: 2000.89,
    cardType: 'mastercard',
    cardHolder: _mock.name.fullName(4),
    cardNumber: '**** **** **** 7755',
    cardValid: '11/22',
  },
];

export const _bankingRecentTransitions = [
  {
    id: _mock.id(2),
    name: _mock.name.fullName(2),
    avatar: _mock.image.avatar(8),
    type: 'Income',
    message: 'Iniciou novo contrato',
    category: 'ADRIANO DA SILVA E SILVA',
    date: 1627556358365,
    status: 'Em andamento',
    amount: 811.45,
  },
  {
    id: _mock.id(3),
    name: _mock.name.fullName(3),
    avatar: _mock.image.avatar(9),
    type: 'Expenses',
    message: 'Contrato liquidado',
    category: 'EDINHA DE ALMEIDA DA SILVA',
    date: 1627556329038,
    status: 'Concluído',
    amount: 436.03,
  },
  {
    id: _mock.id(4),
    name: _mock.name.fullName(4),
    avatar: _mock.image.avatar(12),
    type: 'Receive',
    message: 'Contrato suspenso',
    category: 'IZENILSON CARVALHO SILVA',
    date: 1627556339677,
    status: 'Negado',
    amount: 82.26,
  },
  {
    id: _mock.id(5),
    name: null,
    avatar: _mock.image.avatar(5),
    type: 'Expenses',
    message: 'Iniciou novo contrato',
    category: 'JOSE CLAUDIO NUNES CORREA',
    date: 1627547330510,
    status: 'Concluído',
    amount: 480.73,
  },
  {
    id: _mock.id(6),
    name: null,
    avatar: _mock.image.avatar(7),
    type: 'Expenses',
    message: 'Contrato deferido',
    category: 'MARCIA DO SOCORRO QUEIROZ BOGEIA',
    date: 1627556347676,
    status: 'Em andamento',
    amount: 11.45,
  },
];
