<template>
    <div>
      <h1>Génération de fichier Excel depuis Vue.js</h1>
      <button @click="generateExcel">Générer Excel</button>
    </div>
  </template>
  
  <script>
  import * as XLSX from 'xlsx';
  
  export default {
    methods: {
      generateExcel() {
        const data = [['Nom', 'Âge'], ['Alice', 25], ['Bob', 30], ['Charlie', 28]];
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Feuille 2');
        XLSX.writeFile(wb, 'exemple.xlsx');
      },
    },
  };
  </script>
  