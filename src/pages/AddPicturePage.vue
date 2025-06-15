<template>
  <div id="AddPicturePage">
    <h2 style="margin-bottom: 16px;">添加图片</h2>
    <PictureUpload :picture="picture" :onSuccess="onSuccess" />
    <a-form :model="formData"  @finish="handleSubmit">
      <a-form-item label="图片名称" name="name">
        <a-input v-model:value="formData.name" allow-clear />
      </a-form-item>
      <a-form-item label="图片描述" name="description">
        <a-textarea
        v-model:value="formData.description"
        placeholder="请输入图片描述"
        :auto-size="{ minRows: 2, maxRows: 5 }"
        allow-clear
         />
      </a-form-item>
      <a-form-item label="图片分类" name="category">
        <a-auto-complete
        v-model:value="formData.category"
        placeholder="请输入图片分类"
        allow-clear
         />
      </a-form-item>
      <a-form-item label="图片标签" name="tags">
        <a-select v-model:value="formData.tags"
        placeholder="请输入图片标签"
        allow-clear
        mode="tags"
         />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 100%;">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import PictureUpload from '@/components/PictureUpload.vue';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { editPictureUsingPost } from '@/api/pictureController.ts';
import router from '@/router';

// 定义图片数据
const picture = ref<any>(null);
const formData = ref({
  name: '',
  description: '',
  category: '',
  tags: []
});

// 定义上传成功后的回调函数
const onSuccess = (newPicture: any) => {
  picture.value = newPicture;
  formData.value.name = newPicture.name;
};

// 表单提交处理函数
const handleSubmit = async (values: any) => {
  const pictureId = picture.value.id;
  if(!pictureId) {
    message.error('请先上传图片');
    return;
  }
  const res=await editPictureUsingPost({
    id: pictureId,
    ...values,

  })
  console.log({...values});

  if(res.data.code===0&&res.data.data) {
    message.success('图片创建成功');
    router.push({
      path: `/picture/${pictureId}`,
      query: {
        id: pictureId,
      }
    })
  }else{
    message.error('图片创建失败');
  }
};
</script>

<style scoped>
#AddPicturePage {
  width: 720px;
  margin: 0 auto;
}
</style>
