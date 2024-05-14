'use client';

import { Typography } from '@mui/material';
import { useState } from 'react';

export default function InfoCabecalho() {
  const [currentDate, setCurrentDate] = useState<string>('');

  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {currentDate}
    </Typography>
  );
}
