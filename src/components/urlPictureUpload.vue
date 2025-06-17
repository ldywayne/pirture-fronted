<template>
  <div class="url-picture-upload">
  <a-input-group compact style="margin-bottom: 16px">
    <a-input v-model:value="fileUrl" style="width: calc(100% - 120px)" placeholder="请输入图片 URL" />
    <a-button type="primary" :loading="loading" @click="handleUpload" style="width: 120px">提交</a-button>
  </a-input-group>
  <img v-if="picture?.url" :src="picture?.url" alt="avatar" />
</div>

</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { uploadPictureByUrlUsingPost } from '@/api/pictureController.ts';

const loading = ref<boolean>(false);
const fileUrl = ref<string>('');

interface Props {
  picture?: any;
  onSuccess?: (newPicture: any) => void;
}
const props = defineProps<Props>();

const handleUpload=async()=>{
  loading.value=true
  try{
    const params:any={fileUrl:fileUrl.value}
  if(props.picture){
    params.id=props.picture.id
  }
  const res=await uploadPictureByUrlUsingPost(params)
  if(res.data.code==0 &&res.data.data){
    message.success('上传成功')
    //回传给父组件
    props.onSuccess?.(res.data.data)
    fileUrl.value=''
    loading.value=false
  }else{
    message.error('上传失败'+res.data.message)
  }
  }catch(error){
    message.error('上传失败'+error)
  }finally{
    loading.value=false
  }
}

</script>
<style scoped>
.picture-upload :deep(.ant-upload) {
  width: 100% !important;
  height: 100% !important;
  min-height: 152px;
  min-width: 152px;
}

.picture-upload img {
  max-width: 100%;
  max-height: 480px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

</style>
