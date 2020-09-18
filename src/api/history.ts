import request from '../shared/request';
import { stringify } from 'qs';

interface QueryHistoryParam {
  current: number
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