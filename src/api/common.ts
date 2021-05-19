import * as Taro from '@tarojs/taro';
import request from '../shared/request';
import { stringify } from 'qs';
import { getToken } from '../shared/token';
import { service_url } from '../constants';

export async function uploadFile(data) {
  const { filePath, formData } = data;
  return Taro.uploadFile({
    url: `${service_url}/act/ctn-file/upload?${stringify(formData)}`,
    filePath,
    name: 'file',
    fileName: `file${Date.now()}`,
    header: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export async function queryMaterial<T>() {
  return request<T>({
    url: '/biz/base-material/list',
    method: 'GET',
    onlyData: true
  })
}

export async function queryDicForRepair<T>(type:string) {
  const _type = type.replace(/([A-Z])/g,'_$1').toLowerCase();
  return request<T>({
    url: `/admin/dict/type/${_type}`,
    method: 'GET',
    onlyData: true
  })
}

export async function queryFileList(ids: string[]) {
  return request<any[]>({
    url: `/admin/file/list `,
    method: 'POST',
    data: ids,
    onlyData: true,
    loadingText: '查询中'
  })
}

export async function queryVessel() {
  return request<any[]>({
    url: `/biz/base-vessel/list`,
    method: 'GET',
    onlyData: true
  })
}

