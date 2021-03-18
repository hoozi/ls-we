import request from '../shared/request';
import { stringify } from 'qs';

interface QueryRequisitionParam {
  current: number
}
interface RequisitionDetailParams {
  parentId: string
}
export async function queryRequisition<T>(data:QueryRequisitionParam) {
  return request<T>({
    url: `/biz/warehouse-out-storage/delivery-order-sum-for-receiver?${stringify(data)}`,
    method: 'GET',
    loadingText: '正在查询',
    onlyData: true
  })
}

export async function confirm<T>(no:string) {
  return request<T>({
    url: `/biz/warehouse-out-storage/delivery-order-receiver-confirm?no=${no}`,
    method: 'GET',
    loadingText: '正在确认'
  })
}

export async function queryRequisitionDetail<T>(no:string) {
  return request<T>({
    url: `/biz/warehouse-out-storage/delivery-order-list-for-receiver?no=${no}`,
    method: 'GET',
    onlyData: true,
    loadingText: '查询中'
  })
}