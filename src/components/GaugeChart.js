// Components/GaugeChart.js
import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GaugeChart = ({ value }) => {
  const needleRef = useRef(null); // Reference for the needle canvas

  // Data for the semi-circle gauge
  const data = {
    datasets: [
      {
        data: [50, 50], // Keep data static for a consistent semi-circle
        backgroundColor: (ctx) => {
          const { chartArea, ctx: chartCtx } = ctx.chart;
          if (!chartArea) return; // Ensure chart area is available

          const gradient = chartCtx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );

          // Gradient from green to yellow to red
          gradient.addColorStop(1, 'rgba(0, 255, 0, 1)'); // Green
          gradient.addColorStop(0.5, 'rgba(255, 255, 0, 1)'); // Yellow
          gradient.addColorStop(0, 'rgba(255, 0, 0, 1)'); // Red

          return gradient;
        },
        borderWidth: 0,
        cutout: '80%', // Hollow center
        rotation: -90, // Start at the top
        circumference: 180, // Half-circle
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  useEffect(() => {
    const canvas = needleRef.current;
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 60; // Align with semi-circle arc
    const radius = 120; // Arc radius for needle positioning

    // Calculate the correct angle based on the value (0-100%)
    const angle = (Math.PI * value) / 100 - Math.PI;

    // Determine the needle's tip position along the arc
    const needleX = centerX + radius * Math.cos(angle);
    const needleY = centerY + radius * Math.sin(angle);

    // Clear the canvas before drawing the needle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save the current canvas state
    ctx.save();

    // Move the origin to the needle's tip to rotate correctly
    ctx.translate(needleX, needleY);

    // Rotate the needle to point along the arc
    ctx.rotate(angle + Math.PI / 2); // Adjust by 90 degrees to align

    // Draw the needle as a small black triangle
    ctx.beginPath();
    ctx.moveTo(0, -10); // Top of the needle
    ctx.lineTo(-10, 20); // Left side of the base
    ctx.lineTo(10, 20); // Right side of the base
    ctx.closePath();

    // Style the needle
    ctx.fillStyle = '#000'; // Black needle color
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'; // Shadow effect
    ctx.shadowBlur = 8;
    ctx.fill(); // Fill the needle

    // Restore the canvas state
    ctx.restore();
  }, [value]);

  return (
    <div className="relative w-[300px] h-[300px]">
      {/* Needle Canvas */}
      <canvas ref={needleRef} className="absolute inset-0" width="300" height="300" />

      {/* Doughnut Gauge */}
      <Doughnut data={data} options={options} />      
    </div>
  );
};

export default GaugeChart;
