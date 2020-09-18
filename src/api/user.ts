import * as Taro from '@tarojs/taro';
import request from '../shared/request';
import { stringify } from 'qs';
import { service_url } from '../constants';

interface SignInParams {
  username: string;
  password: string;
}

export async function signIn<T>(data:SignInParams) {
  return request<T>({
    url: `/auth/oauth/token?grant_type=password&${stringify(data)}`,
    data,
    loadingText: '登录中...'
  })
}

export async function queryCurrentUser<T>() {
  return request<T>({
    url: '/admin/user/info',
    method: 'GET',
    onlyData: true
  })
}

export async function updatePassword<T>(data) {
  return request<T>({
    url: '/admin/user/edit',
    method: 'PUT',
    data,
    loadingText: '修改中...'
  })
}

export async function signUp(data) {
  const { filePath, ...rest } = data;
  return Taro.uploadFile({
    url: `${service_url}/act/fleet-truck/register?${stringify(rest)}`,
    filePath,
    name: 'file',
    fileName: `file${Date.now()}`
  })
}