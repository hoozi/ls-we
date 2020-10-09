import request from '../shared/request';
import { stringify } from 'qs';

interface QueryHistoryParam {
  current: number
}
interface HistoryDetailParams {
  parentId: string
}

export async function queryHistory<T>(data:QueryHistoryParam) {
  return request<T>({
    url: `/act/task/history?${stringify(data)}`,
    method: 'GET',
    loadingText: '正在查询',
    onlyData: true
  })
}

///act/task/history-record

export async function queryNote<T>(id:string) {
  return request<T>({
    url: `/act/task/history-record/${id}`,
    method: 'GET',
    onlyData: true
  })
}

export async function queryHistroyTask<T>(id:string) {
  return request<T>({
    url: `/act/task/history-task/${id}`,
    method: 'GET',
    onlyData: true
  })
}

export async function queryHistroyDetail<T>(data:HistoryDetailParams) {
  return request<T>({
    url: `/biz/purchase-work-bill-detail/list`,
    data,
    onlyData: true,
    loadingText: '查询中'
  })
}