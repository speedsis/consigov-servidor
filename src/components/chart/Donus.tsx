'use client';

import { Doughnut } from 'react-chartjs-2';

interface DonusChartProps {
  width?: number;
  height?: number;
}

export default function DonusChart({}: DonusChartProps) {
  const data = {
    labels: ['Saidas', 'Entrada'],
    datasets: [
      {
        data: [10000, 40000],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return <Doughnut data={data} width={400} height={400} />;
}
