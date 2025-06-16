import { reactive, ref, onMounted, computed } from 'vue';
import { listPictureVoByPageUsingPost, listPictureByPageUsingPost, deletePictureUsingPost } from '@/api/pictureController';
import { message } from 'ant-design-vue';

export default function () {
  const infoData = reactive({
     columns : [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80,
      },
      {
        title: '图片',
        dataIndex: 'url',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '简介',
        dataIndex: 'introduction',
        ellipsis: true,
      },
      {
        title: '类型',
        dataIndex: 'category',
      },
      {
        title: '标签',
        dataIndex: 'tags',
      },
      {
        title: '图片信息',
        dataIndex: 'picInfo',
      },
      {
        title: '用户 id',
        dataIndex: 'pictureId',
        width: 80,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '编辑时间',
        dataIndex: 'editTime',
      },
      {
        title: '操作',
        key: 'action',
      },
    ]


  })

// 数据
const dataList = ref<any>([])
const total = ref(0)

// 搜索条件
const searchParams = reactive<any>({
  current: 1,
  pageSize: 4,
  sortField: 'createTime',
  sortOrder: 'descend',
})

// 分页参数
const pagination = computed(() => {
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 4,
    total: total.value,
    showSizeChanger: true,
    pageSizeOptions: ['4', '10', '20', '50', '100'],
    showTotal: (total:any) => `共 ${total} 条`,
  }
})

// 获取数据
const fetchData = async () => {
  const res = await listPictureByPageUsingPost({
    ...searchParams,
  })
  if (res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  } else {
    message.error('获取数据失败，' + res.data.message)
  }
}

// 页面加载时请求一次
onMounted(() => {
  fetchData()
})

// 获取数据
const doSearch = () => {
  // 重置搜索条件
  searchParams.current = 1
  fetchData()
}

// 表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}

  // 重置
  const doReset = () => {
    searchParams.name = ''
    searchParams.category = ''
    doSearch()
  }

  // 编辑
  const doEdit = async (record: any) => {
    if (!record) {
      return
    }
    message.info('编辑用户：' + record.pictureName)
  }

  // 删除数据
  const doDelete = async (id: string) => {
    if (!id) {
      return
    }
    const res = await deletePictureUsingPost({ id: Number(id) })
    if (res.data.code === 0) {
      message.success('删除成功')
      // 刷新数据
      fetchData()
    } else {
      message.error('删除失败')
    }
  }


  // 页面加载时请求一次
  onMounted(() => {
    fetchData()
  })

  return { infoData, dataList, total, fetchData, searchParams, doTableChange, pagination, doSearch, doReset, doDelete, doEdit }
}
