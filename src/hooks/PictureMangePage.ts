import { reactive, ref, onMounted, computed } from 'vue';
import { listPictureVoByPageUsingPost, listPictureByPageUsingPost, deletePictureUsingPost, doPictureReviewUsingPost } from '@/api/pictureController';
import { message } from 'ant-design-vue';
import { PIC_REVIEW_STATUS_ENUM } from '@/constants/picture';

export default function () {
  const infoData = reactive({
     columns : [
      {
        title: 'ID',
        dataIndex: 'id',
        width: 60,
      },
      {
        title: '图片',
        dataIndex: 'url',
        width: 140,
      },
      {
        title: '名称',
        dataIndex: 'name',
        width: 120,
        ellipsis: true,
      },
      {
        title: '简介',
        dataIndex: 'introduction',
        width: 150,
        ellipsis: true,
      },
      {
        title: '类型',
        dataIndex: 'category',
        width: 80,
      },
      {
        title: '标签',
        dataIndex: 'tags',
        width: 120,
        ellipsis: true,
      },
      {
        title: '图片信息',
        dataIndex: 'picInfo',
        width: 180,
      },
      {
        title: '用户ID',
        dataIndex: 'userId',
        width: 70,
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: 120,
      },
      {
        title: '编辑时间',
        dataIndex: 'editTime',
        width: 120,
      },
      {
        title: '审核信息',
        dataIndex: 'reviewMessage',
        width: 120,
      },
      {
        title: '操作',
        key: 'action',
        width: 120,
        // margin: '0 auto',
        fixed: 'right',
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
    total.value = Number(res.data.data.total) || 0
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
  const handleReview = async (record: API.Picture, reviewStatus: number) => {
    const reviewMessage = reviewStatus === PIC_REVIEW_STATUS_ENUM.PASS ? '管理员操作通过' : '管理员操作拒绝'
    const res = await doPictureReviewUsingPost({
      id: record.id,
      reviewStatus,
      reviewMessage,
    })
    if (res.data.code === 0) {
      message.success('审核操作成功')
      // 重新获取列表
      fetchData()
    } else {
      message.error('审核操作失败，' + res.data.message)
    }
  }



  // 页面加载时请求一次
  onMounted(() => {
    fetchData()
  })

  return { infoData, dataList, total, fetchData, searchParams, doTableChange, pagination, doSearch, doReset, doDelete, doEdit,handleReview  }
}
