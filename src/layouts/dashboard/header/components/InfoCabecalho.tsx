'use client';

import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function InfoCabecalho() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setCurrentDate(`Portal Consignatária - BANCO DO ESTADO DO PARA S A - ${formattedDate}`);
  }, []);

  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {currentDate}
    </Typography>
  );
}
