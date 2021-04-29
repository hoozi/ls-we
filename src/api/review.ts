import * as Taro from '@tarojs/taro';
import request from '../shared/request';
import { stringify } from 'qs';

interface TodoParams {
  current: number;
  size: number;
}

interface TodoDetailParams {
  ids: number
}

interface SubmitTask {
  taskId: string;
  taskFlag: string;
  comment: string;
}

export async function queryTodo<T>(data:TodoParams) {
  return request<T>({
    url: `/act/task/todo?${stringify(data)}`,
    method: 'GET',
    loadingText: '查询中...',
    onlyData: true
  })
}

export async function queryComment<T>(id:number) {
  return request<T>({
    url: `/act/task/comment/${id}`,
    method: 'GET',
    onlyData: true
  })
}

export async function queryNote<T>(id:number) {
  return request<T>({
    url: `/act/task/record/${id}`,
    method: 'GET',
    onlyData: true
  })
}

export async function queryTask<T>(id:string) {
  return request<T>({
    url: `/act/task/${id}`,
    method: 'GET',
    onlyData: true
  })
}

export async function submitTask<T>(data:SubmitTask) {
  return request<T>({
    url: '/act/task',
    data,
    loadingText: '提交中'
  })
}

export async function postTodo<T>(data:any) {
  return request<T>({
    url: '/biz/receive-plan-bill-detail',
    method: data.id ? 'PUT' : 'POST',
    data,
    loadingText: '提交中'
  })
}

export async function deleteTodo<T>(id:string) {
  return request<T>({
    url: `/biz/receive-plan-bill-detail/${id}`,
    method: 'DELETE',
    loadingText: '删除中'
  })
}

export async function queryCountInWarehouse<T>(id:string) {
  return request<T>({
    url: `/biz/inventory/list-by-material-id/${id}`,
    method: 'GET',
    loadingText: '查询库存',
    onlyData: true
  })
}

export async function queryTodoDetail<T>(data:TodoDetailParams | number, type?:string) {
  const serviceMap = {
    'MaterialsApproval': `receive-plan-bill-detail/list-by-main-ids?${stringify(data)}`,
    'PurchasingApproval': `purchase-work-bill-detail/list-by-main-ids?${stringify(data)}`,
    'ReportForms': `energy-consumption/${data}`,

    //维修相关
    'TemporaryMaintenance': `temporary-repair-bill/not-url/${data}`,
    'StopMaintenance': `stopping-maintenance-bill/not-url/${data}`,
    'FactoryMaintenance': `shop-repair-bill/not-url/${data}`,
    'OfficeMaintenance':`official-maintenance-bill/not-url/${data}`,
    'YearMaintenance': `year-overhaul-plan-bill/not-url/${data}`
  }
  return request<T>({
    url: `/biz/${serviceMap[type!]}`,
    method: 'GET',
    loadingText: '查询中...',
    onlyData: true
  });
}


