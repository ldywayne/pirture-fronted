<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh;">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />

      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.codefather.cn" target="_blank">
          ldywayne
        </a>
      </a-layout-footer>

    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue';

// 如果需要引入其他组件或代码

</script>

<style scoped>
#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}


#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1000
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 28px;
  padding: 30px;

}
</style>
