<template>
    <div>
      <h1>Page 4 : Pie chart</h1>
      <canvas id="bar-chart" style="background: rgb(250, 250, 250)"></canvas>
    </div>
  </template>
  
  <script>
import Chart from 'chart.js/auto';
  export default {
    data() {
      return {
        chartData: {
          labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
          datasets: [
            {
              label: 'Ventes mensuelles',
              backgroundColor: 'lightblue',
              data: [2, 5, 7, 10, 12],
            },
          ],
        },
      };
    },
    mounted() {
      this.createBarChart();
    },
    methods: {
      createBarChart() {
        const ctx = document.getElementById('bar-chart').getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: this.chartData,
          options: {
            responsive: false,
            maintainAspectRatio: false,
          },
        });
      },
    },
  };
  </script>
  
  <style>
  /* Ajoutez des styles CSS personnalisés ici si nécessaire */
  </style>
  