<template>
  <div id="globalHeader">
    <a-row :wrap="false">
      <a-col flex="200px">
        <Router-Link to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.svg" alt="logo" />
            <div class="title">云图库</div>
          </div>
        </Router-Link>
      </a-col>

      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="loginUserLogin.loginUser.id">
            <a-dropdown>
              <ASpace>
                <a-avatar :src="loginUserLogin.loginUser.userAvatar" />
                {{ loginUserLogin.loginUser.userAccount ?? '无名' }}
              </ASpace>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                  <a-menu-item @click="">
                    <!-- <LogoutOutlined /> -->
                    个人信息
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref, computed } from 'vue'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/userLoginUserStore.ts'
import { message } from 'ant-design-vue'
import { userLogoutUsingPost } from '@/api/userController.ts'
const loginUserLogin = useLoginUserStore()
// 菜单列表
const originItems = [
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/add_picture',
    label: '添加图片',
    title: '添加图片',
  },
  {
    key: '/admin/pictureManage',
    label: '图片管理',
    title: '图片管理',
  },
  {
    key: 'others',
    label: h('a', { href: 'https://www.codefather.cn', target: '_blank' }, '开发中'),
    title: '开发中',
  },
]

// 过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menu) => {
    if (typeof menu?.key === 'string' && menu.key.startsWith('/admin')) {
      const loginUser = loginUserLogin.loginUser
      if (!loginUser || loginUser.userRole !== 'admin') {
        return false
      }
    }
    return true
  })
}

// 展示在菜单的路由数组
const items = computed<MenuProps['items']>(() => filterMenus(originItems))

const router = useRouter()
// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}
// 当前选中菜单
const current = ref<string[]>([])
// 监听路由变化，更新当前选中菜单
router.afterEach((to, from, next) => {
  current.value = [to.path]
})

const doLogout = async () => {
  const res = await userLogoutUsingPost()
  console.log(res)

  if (res.data.code === 0) {
    loginUserLogin.setLoginUser({
      userAccount: '未登录',
      userName: '未登录',
      // userAvatar: '',
    })
    await router.push({
      path: '/user/login',
      replace: true,
    })
    message.success('退出成功')
  } else {
    message.error('退出失败，' + res.data.message)
  }
}
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 25px;
}
</style>
