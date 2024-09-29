import { request } from "@/utils/request";

/**
 * @description 获取首页数据
 * @returns
 */
export const getHomePageDataAPI = () => {
  return request.get("/homepage/block/page");
};
export const getPlaylistSong = () =>
  request.get("/playlist/detail?id=8725882112");
export const getPlaylisttop = () => request.get("/top/playlist");
export const getPlaylistSub = () =>
  request.get("/playlist/subscribers?limit=30&id=8725882112");
