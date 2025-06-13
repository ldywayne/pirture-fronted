<template>
  <div id="homePage">
    <template>
      <a-table :columns="infoData.columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              <smile-outlined />
              Name
            </span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag v-for="tag in record.tags" :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>Invite 一 {{ record.name }}</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
                <down-outlined />
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserMangePage from '@/hooks/UserMangePage'
const { infoData, doTableChange, fetchData, searchParams, pagination, dataList, total } = UserMangePage()
const data = ref(infoData.columns)
</script>

<style scoped>
#homePage {}
</style>
