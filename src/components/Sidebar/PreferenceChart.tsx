import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem
} from 'chart.js';
import dragData from 'chartjs-plugin-dragdata';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  dragData
  
);

type PreferenceCategory = 'Formality' | 'Accuracy' | 'Speed' | 'Humour' | 'Memory';
type PreferenceValue = 1 | 2 | 3;

interface PreferenceChartProps {
  onValueChange?: (category: PreferenceCategory, value: PreferenceValue) => void;
}

const PreferenceChart: React.FC<PreferenceChartProps> = ({ onValueChange }) => {
  const [data, setData] = useState({
    labels: ['Formality', 'Accuracy', 'Speed', 'Humour', 'Memory'],
    datasets: [
      {
        label: 'Settings',
        data: [1, 2, 3, 2, 1],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointBorderWidth: 2,
        tension: 0.4,
        pointHitRadius: 15
      },
    ],
  });

  const valueLabels = ['None', 'Moderate', 'Extreme'];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 100
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const
    },
    scales: {
      x: {
        type: 'category' as const,
        display: true
      },
      y: {
        min: 1,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function(value: number) {
            return valueLabels[value - 1];
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context: TooltipItem<'line'>) {
            if (typeof context.raw === 'number') {
              return `${context.dataset.label}: ${valueLabels[context.raw - 1]}`;
            }
            return context.dataset.label || '';
          }
        }
      },
      dragData: {
        round: 1,
        showTooltip: true,
        magnet: {
          to: Math.round
        },
        onDragStart: function(e: DragEvent) {
          console.log("on drag start", e);
          
        },
        onDrag: function(e: DragEvent, datasetIndex: number, index: number, value: number) {
          console.log("event on drag: ", e);
          
          const newValue = Math.min(3, Math.max(1, Math.round(value))) as PreferenceValue;
          const newDatasets = [...data.datasets];
          newDatasets[datasetIndex].data[index] = newValue;
          setData({
            ...data,
            datasets: newDatasets
          });
          
          if (onValueChange) {
            onValueChange(data.labels[index] as PreferenceCategory, newValue);
          }
        },
        onDragEnd: function(e: DragEvent, datasetIndex: number, index: number, value: number) {
          console.log("e:", e);
          
          const finalValue = Math.min(3, Math.max(1, Math.round(value))) as PreferenceValue;
          const newDatasets = [...data.datasets];
          newDatasets[datasetIndex].data[index] = finalValue;
          setData({
            ...data,
            datasets: newDatasets
          });
          
          if (onValueChange) {
            onValueChange(data.labels[index] as PreferenceCategory, finalValue);
          }
        }
      }
    }
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PreferenceChart;
