<template>
  <div id="homePage">
    <!-- 搜索 -->
    <!-- 搜索框 -->
    <div class="search-bar">
      <a-input-search placeholder="从海量图片中搜索" v-model:value="searchParams.searchText" enter-button="搜索" size="large"
        @search="doSearch" allow-clear />
    </div>

    <!-- 图片列表 -->
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }" :data-source="dataList"
      :pagination="pagination" :loading="loading">
      <template #renderItem="{ item: picture }">
        <a-list-item style="padding: 0">
          <!-- 单张图片 -->
          <a-card hoverable>
            <template #cover>
              <img style="height: 180px; object-fit: cover" :alt="picture.name" :src="picture.url" />
            </template>
            <a-card-meta :title="picture.name">
              <template #description>
                <a-flex>
                  <a-tag color="green">
                    {{ picture.category ?? '默认' }}
                  </a-tag>
                  <a-tag v-for="tag in picture.tags" :key="tag">
                    {{ tag }}
                  </a-tag>
                </a-flex>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>

      </template>
    </a-list>

  </div>
</template>

<script setup lang="ts">
import HomePage from '@/hooks/HomePage';
const { dataList, pagination, loading, searchParams, doSearch } = HomePage();


</script>

<style scoped>
#homePage .search-bar {
  max-width: 480px;
  margin: 0 auto 16px;
}

</style>
