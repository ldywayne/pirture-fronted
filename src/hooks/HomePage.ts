import { reactive, ref, computed,onMounted } from 'vue'
import { useRouter } from 'vue-router'

// import { getPictureListByPageUsingPost } from '@/api/pictureController'
import { listPictureVoByPageUsingPost,listPictureTagCategoryUsingGet } from '@/api/pictureController'
import { message } from 'ant-design-vue'


export default function(){
  const dataList = ref<any>([])
  const total=ref(0)
  const loading=ref(true)
  //搜索条件
  const searchParams=reactive({
    searchText:'',
    current:1,
    size:12,
    sortField:'createTime',
    sortOrder:'descend',
    category:'',
    tags:[],


  })
  //分页参数
  const pagination=computed(()=>{
  return{
    current:searchParams.current,
    size:String(searchParams.size),
    total:total.value,
    //切换页号时会切换搜索参数，并获取数据
    onChange:(page:number,pageSize:number)=>{
      searchParams.current=page
      searchParams.size=pageSize
      fetchData()
    }
  }
  })
  //获取数据
  const fetchData = async () => {
    loading.value = true
    // 转换搜索参数
    const params = {
      ...searchParams,
      tags: [],
    }
    if (selectedCategory.value !== 'all') {
      params.category = selectedCategory.value
    }
    selectedTagList.value.forEach((useTag, index) => {
      if (useTag) {
        (params.tags as string[]).push(tagList.value[index])
      }
    })
    const res = await listPictureVoByPageUsingPost(params)
    if (res.data.data) {
      dataList.value = res.data.data.records ?? []
      total.value = res.data.data.total ?? 0
    } else {
      message.error('获取数据失败，' + res.data.message)
    }
    loading.value = false
  }


  //搜索
  const doSearch=()=>{
    // 搜索时，重置分页参数
    searchParams.current=1
    fetchData()
  }

  const categoryList = ref<string[]>([])
  const selectedCategory = ref<string>('all')
  const tagList = ref<string[]>([])
  const selectedTagList = ref<string[]>([])

  // 获取标签和分类选项
  const getTagCategoryOptions = async () => {
    const res = await listPictureTagCategoryUsingGet()
    if (res.data.code === 0 && res.data.data) {
      // 转换成下拉选项组件接受的格式
      categoryList.value = res.data.data.categoryList ?? []
      tagList.value = res.data.data.tagList ?? []
    } else {
      message.error('加载分类标签失败，' + res.data.message)
    }
  }
  // 点击图片
  const router = useRouter()
  // 跳转至图片详情
  const doClickPicture = (picture:any) => {
    router.push({
      path: `/picture/${picture.id}`,
    })
  }
  onMounted(() => {
    getTagCategoryOptions()
  })
  //初始化数据
  onMounted(()=>{
    fetchData()
  })
  return {
    dataList,
    pagination,
    loading,
    searchParams,
    doSearch,
    categoryList,
    selectedCategory,
    tagList,
    selectedTagList,
    doClickPicture,
  }
}

