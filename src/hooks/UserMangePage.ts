import { reactive, ref, onMounted, computed } from 'vue';
import { listUserVoByPageUsingPost } from '@/api/userController';
import { message } from 'ant-design-vue';

export default function () {
  const infoData = reactive({
    columns: [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '账号',
        dataIndex: 'userAccount',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '头像',
        dataIndex: 'userAvatar',
      },
      {
        title: '简介',
        dataIndex: 'userProfile',
      },
      {
        title: '用户角色',
        dataIndex: 'userRole',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
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
    pageSize: 10,
  })

  // 获取数据
  const fetchData = async () => {
    const res = await listUserVoByPageUsingPost({
      ...searchParams
    })
    if (res.data.data) {
      dataList.value = res.data.data.records ?? []
      total.value = Number(res.data.data.total) || 0
    } else {
      message.error('获取数据失败，' + res.data.message)
    }
  }
  //分页
  // 分页参数
  const pagination = computed(() => {
    return {
      current: searchParams.current ?? 1,
      pageSize: searchParams.pageSize ?? 10,
      total: total.value,
      showSizeChanger: true,
      showTotal: (total: any) => `共 ${total} 条`,
    }
  })

  // 获取数据
  const doSearch = () => {
    // 重置页码
    searchParams.current = 1
    fetchData()
  }
  // 重置
  const doReset = () => {
    searchParams.userAccount = ''
    searchParams.userName = ''
    doSearch()
  }
  // 表格变化处理
  const doTableChange = (page: any) => {
    searchParams.current = page.current
    searchParams.pageSize = page.pageSize
    fetchData()
  }

  // 页面加载时请求一次
  onMounted(() => {
    fetchData()
  })

  return { infoData, dataList, total, fetchData, searchParams, doTableChange, pagination, doSearch, doReset }
}
