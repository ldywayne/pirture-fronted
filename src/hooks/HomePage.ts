import { reactive, ref, computed,onMounted } from 'vue'

// import { getPictureListByPageUsingPost } from '@/api/pictureController'
import { listPictureVoByPageUsingPost } from '@/api/pictureController'
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
  const fetchData=async()=>{
    loading.value=true
    const res=await listPictureVoByPageUsingPost(searchParams)
    if(res.data.code===0&&res.data.data){
      dataList.value=res.data.data.records??[]
      total.value=Number(res.data.data.total)??0
      // message.success(res.data.msg)
    }else{
      message.error(res.data.message??'获取数据失败')
    }
    loading.value=false
  }

  //搜索
  const doSearch=()=>{
    // 搜索时，重置分页参数
    searchParams.current=1
    fetchData()
  }
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
  }
}

