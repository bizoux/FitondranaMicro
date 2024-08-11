<!-- Composant 2 -->
<template>
    <div>
      <premier :activeMenu="activeMenu" />
    </div>
  </template>
  
  <script>
  import premier from './premier.vue';
  
  export default {
    components:{
      premier
    },
    data() {
      return {
        activeMenu: null
      };
    },
    created() {
      this.activeMenu = this.$route.query.activeMenu;
    }
  };
  </script>
  <style>
.active{
    background: red;
}

</style>
  