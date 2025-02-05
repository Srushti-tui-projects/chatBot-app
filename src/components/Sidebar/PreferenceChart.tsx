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
  TooltipItem,
  ChartData,
  ChartOptions,
  Plugin
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Type definitions
type PreferenceCategory = 'Formality' | 'Accuracy' | 'Speed' | 'Humour' | 'Memory';
type PreferenceValue = 1 | 2 | 3;

interface PreferenceChartProps {
  onValueChange?: (category: PreferenceCategory, value: PreferenceValue) => void;
}

// Chart type definitions
type Data = ChartData<'line', number[], string>;
type Options = ChartOptions<'line'>;

const PreferenceChart: React.FC<PreferenceChartProps> = ({ onValueChange }) => {
  const valueLabels = ['None', 'Moderate', 'Extreme'];

  // Create custom drag plugin
  const dragPlugin: Plugin<'line'> = {
    id: 'dragPlugin',
    
    beforeDraw: (chart) => {
      const canvas = chart.canvas;
      if (!canvas) return;
  
      let isDragging = false;
      let selectedPoint: { datasetIndex: number; index: number } | null = null;
  
      canvas.addEventListener('mousedown', (e) => {
        const points = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
        if (points.length) {
          isDragging = true;
          selectedPoint = {
            datasetIndex: points[0].datasetIndex,
            index: points[0].index
          };
        }
      });
  
      canvas.addEventListener('mousemove', (e) => {
        if (isDragging && selectedPoint) {
          const rect = canvas.getBoundingClientRect();
          const y = e.clientY - rect.top;
          // const chartArea = chart.chartArea;
          const scales = chart.scales;
          const newValue = scales.y.getValueForPixel(y);
          
          if (newValue) {
            const roundedValue = Math.min(3, Math.max(1, Math.round(newValue))) as PreferenceValue;
            
            // Update state using setData
            setData(prevData => {
              const newDatasets = [...prevData.datasets];
              newDatasets[selectedPoint!.datasetIndex].data[selectedPoint!.index] = roundedValue;
              return {
                ...prevData,
                datasets: newDatasets
              };
            });
            
            if (onValueChange && chart.data.labels) {
              onValueChange(
                chart.data.labels[selectedPoint.index] as PreferenceCategory,
                roundedValue
              );
            }
          }
        }
      });
  
      canvas.addEventListener('mouseup', () => {
        isDragging = false;
        selectedPoint = null;
      });
  
      canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        selectedPoint = null;
      });
    }
  };
  

  const [data, setData] = useState<Data>({
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

  const options: Options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 100
    },
    interaction: {
      intersect: false,
      mode: 'nearest'
    },
    scales: {
      x: {
        type: 'category',
        display: true
      },
      y: {
        min: 1,
        max: 3,
        ticks: {
          stepSize: 1,
          callback: function(tickValue: number | string) {
            const value = Number(tickValue);
            if (!isNaN(value)) {
              return valueLabels[value - 1];
            }
            return tickValue;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
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
      }
    }
  };

  // Register the plugin
  ChartJS.register(dragPlugin);

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PreferenceChart;
