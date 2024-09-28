import { request } from '@/utils/request'

/**
 * @description 获取首页数据
 * @returns
 */
export const getHomePageDataAPI = () => {
  return request.get('/homepage/block/page')
}
