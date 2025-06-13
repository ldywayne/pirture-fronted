<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>


<script setup lang="ts">
// import { healthUsingGet } from '@/api/mainController.ts'
import BasicLayout from './layouts/BasicLayout.vue';
import { useLoginUserStore } from '@/stores/userLoginUserStore.ts'
// healthUsingGet().then(()=>{
//   console.log(data);
// })
const loginUserLogin = useLoginUserStore()
loginUserLogin.fetchLoginUser()
</script>
<style scoped></style>
