<template>
  <div id="AddPicturePage">
    <h2 style="margin-bottom: 16px;">{{ route.query?.id ? '编辑图片' : '添加图片' }}</h2>
    <PictureUpload :picture="picture" :onSuccess="onSuccess" />
    <a-form v-if="picture" :model="formData"  @finish="handleSubmit">
      <a-form-item label="图片名称" name="name">
        <a-input v-model:value="formData.name" allow-clear />
      </a-form-item>
      <a-form-item label="图片描述" name="introduction">
        <a-textarea
        v-model:value="formData.introduction"
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
        :options="categoryOptions"
         />
      </a-form-item>
      <a-form-item label="图片标签" name="tags">
        <a-select v-model:value="formData.tags"
        placeholder="请输入图片标签"
        allow-clear
        mode="tags"
        :options="tagsOptions"
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
import { ref,onMounted, } from 'vue';
import { message } from 'ant-design-vue';
import { editPictureUsingPost } from '@/api/pictureController.ts';
import router from '@/router';
import { listPictureTagCategoryUsingGet,getPictureVoByIdUsingGet } from '@/api/pictureController.ts';
import { useRoute } from 'vue-router';

// 定义图片数据
const picture = ref<any>(null);
const formData = ref({
  name: '',
  introduction: '',
  category: '',
  tags: [] as string[]
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
// 分类和标签选项
const categoryOptions = ref<any>([]);
const tagsOptions = ref<any>([]);

// 分类选项
const getTagCategoryOptions = async ()=>{
  const res = await listPictureTagCategoryUsingGet();
  if(res.data.code===0&&res.data.data) {
    categoryOptions.value = (res.data.data.categoryList as any[]).map((data: any) => ({
      value:data,
      label:data.name
    }));
    tagsOptions.value = (res.data.data.tagList as any[]).map((data: any) => ({
      value:data,
      label:data.name
    }));
  }
};
//定义老图片
// const oldPicture=ref<any>(null);

const route=useRoute();

const getOldPicture=async ()=>{
  const id = route.query?.id;
  if(id){
    const res=await getPictureVoByIdUsingGet({
      id:id as any,
    })
    if(res.data.code===0&&res.data.data){
      const data=res.data.data
      picture.value=data
      formData.value.name = data.name ?? ''
      formData.value.introduction=data.introduction??''
      formData.value.category=data.category??''
      formData.value.tags=data.tags??[]
    }
  }
}

onMounted(() => {
  getTagCategoryOptions();
  getOldPicture();
});
</script>

<style scoped>
#AddPicturePage {
  width: 720px;
  margin: 0 auto;
}
</style>
