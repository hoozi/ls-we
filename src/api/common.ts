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

