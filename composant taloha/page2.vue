
<template>
  <h1>Page 2 : Bar chart</h1>
    <div>
      <canvas ref="barChart" class="text-center"></canvas>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'page2',
    setup() {
      const barChart = ref(null);
  
      onMounted(() => {
        axios.get("http://localhost:3000/listeDeclaration/5869164309").then(response=>{
            
          new Chart(barChart.value, {
          type: 'bar',
          data: {
            labels: response.data.map(item => item.idDeclaration),
            datasets: [
              {
                label: 'BaseImposable',
                data: response.data.map(item => item.BaseImposable),
                backgroundColor:'lightblue',
                borderColor: 'lightblue',
                borderWidth: 1,
              },

              {
                label: 'Impôt du',
                data: response.data.map(item => item.MontantDu),
                backgroundColor:'rgba(50, 50, 132, 0.2)',
                borderColor: 'rgba(100, 20, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        });
        
      });
  
      return {
        barChart,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Ajoutez du style si nécessaire */
  </style>
  