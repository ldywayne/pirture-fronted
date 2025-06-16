<template>
<a-row :gutter="[16, 16]">
  <!-- 图片展示区 -->
  <a-col :sm="24" :md="16" :xl="18">
    <a-card title="图片预览">
      <a-image
        style="max-height: 600px; object-fit: contain"
        :src="picture.url"
      />
    </a-card>
  </a-col>
  <!-- 图片信息区 -->
  <a-col :sm="24" :md="8" :xl="6">
    <a-card title="图片信息">
      <a-descriptions :column="1">
        <a-descriptions-item label="作者">
          <a-space>
            <a-avatar :size="24" :src="picture.user?.userAvatar" />
            <div>{{ picture.user?.userName }}</div>
          </a-space>
        </a-descriptions-item>
        <a-descriptions-item label="名称">
          {{ picture.name ?? '未命名' }}
        </a-descriptions-item>
        <a-descriptions-item label="简介">
          {{ picture.introduction ?? '-' }}
        </a-descriptions-item>
        <a-descriptions-item label="分类">
          {{ picture.category ?? '默认' }}
        </a-descriptions-item>
        <a-descriptions-item label="标签">
          <a-tag v-for="tag in picture.tags" :key="tag">
            {{ tag }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="格式">
          {{ picture.picFormat ?? '-' }}
        </a-descriptions-item>
        <a-descriptions-item label="宽度">
          {{ picture.picWidth ?? '-' }}
        </a-descriptions-item>
        <a-descriptions-item label="高度">
          {{ picture.picHeight ?? '-' }}
        </a-descriptions-item>
        <a-descriptions-item label="宽高比">
          {{ picture.picScale ?? '-' }}
        </a-descriptions-item>
        <a-descriptions-item label="大小">
          {{ formatSize(picture.picSize) }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-col>
</a-row>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPictureVoByIdUsingGet } from '@/api/pictureController'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'
// 格式化文件大小的工具函数
const formatSize = (bytes: number) => {
  if (!bytes) return '-'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}
//定义常量
const props = defineProps<{
  id: string | number
}>()

//定义图片详情
const picture = ref<any>({})

  // 获取图片详情
  const fetchPictureDetail = async () => {
    try {
      const res = await getPictureVoByIdUsingGet({
        id:props.id
      })
      if (res.data.code === 0 && res.data.data) {
        picture.value = res.data.data
      } else {
        message.error('获取图片详情失败，' + res.data.message)
      }
    } catch (e: any) {
      message.error('获取图片详情失败：' + e.message)
    }
  }

  onMounted(() => {
    fetchPictureDetail()
  })

</script>

<style scoped>


</style>
