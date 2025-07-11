import { getLoginUserUsingGet } from '@/api/userController';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<any>({
    userName: '未登录',
    userAccount: '未登录',
  })

  async function fetchLoginUser() {
    // todo 由于后端还没提供接口，暂时注释
    const res = await getLoginUserUsingGet();
    if (res.data.code === 0 && res.data.data) {
      loginUser.value = res.data.data;
    }
  }
  // async function fetchLoginUser() {
  //   // 测试用户登录，3 秒后登录
  //   setTimeout(() => {
  //     loginUser.value = { userName: '测试用户', id: 1 }
  //   }, 3000)
  // }

  function setLoginUser(newLoginUser: any) {
    loginUser.value = newLoginUser
  }

  return { loginUser, setLoginUser, fetchLoginUser }
})
