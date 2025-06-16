<template>
  <div id="homePage">
    <a-form layout="inline" :model="searchParams" @finish="doSearch" style="margin-bottom: 16px;">
      <a-form-item label="名称">
        <a-input v-model:value="searchParams.name" placeholder="输入名称" />
      </a-form-item>
      <a-form-item label="类型">
        <a-input v-model:value="searchParams.category" placeholder="输入类型" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button @click="doReset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table :columns="infoData.columns" :data-source="dataList" :pagination="pagination" @change="doTableChange">

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'pictureAvatar'">
          <a-image :src="record.pictureAvatar" :width="120" />
        </template>
        <template v-else-if="column.dataIndex === 'pictureRole'">
          <div v-if="record.pictureRole === 'admin'">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button type="primary" @click="doEdit(record)" style="margin-right: 16px;">编辑</a-button>
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">

import PictureMangePage from '@/hooks/PictureMangePage'
import dayjs from 'dayjs'

const { infoData, dataList, searchParams, doTableChange, pagination, doSearch, doReset, doDelete, doEdit } = PictureMangePage()

</script>

<style scoped>
#homePage {
  padding: 16px;
}
</style>
