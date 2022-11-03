import React, { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Chart = (props) => {
  const { values, labels, title } = props;
  const darkTheme = useSelector((state) => state.app.darkTheme);
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        fill: true,
        backgroundColor: '#rrr',
        borderColor: '#0065FF'
      }
    ]
  });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true
      },
      filler: {
        propagate: true
      }
    },
    scales: {
      x: {
        ticks: {
          color: darkTheme ? '#fff' : '#111'
        },
        grid: {
          color: '#494949'
        }
      },
      y: {
        ticks: {
          color: darkTheme ? '#fff' : '#111'
        },
        grid: {
          color: '#494949'
        }
      }
    }
  };

  useEffect(() => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(144, 0, 180, 50)');
    gradient.addColorStop(1, 'rgba(100, 10, 165, 0)');
    setData({
      labels: labels,
      datasets: [
        {
          label: title,
          data: values,
          fill: true,
          backgroundColor: gradient,
          pointBackgroundColor: '#DC08FF',
          borderColor: '#9000B4',
          pointBorderColor: '#DC08FF'
        }
      ]
    });
  }, []);

  return <Line id="canvas" options={options} data={data} />;
};
