import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'
import { mergeCartAPI } from '@/api/cart'
 
export const useUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
      // 合并购物车的操作
      await mergeCartAPI(cartStore.cartList.map(item => {
        return {
          skuId: item.skuId,
          selected: item.selected,
          count: item.count
        }
      }))
      cartStore.updateNewList()
    }
   // 退出时清除用户信息
   const clearUserInfo = () => {
    userInfo.value = {}
       
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})