import Taro,{ RequestParams } from '@tarojs/taro';
import * as TaroH5 from '@tarojs/taro-h5'
import { getToken, removeToken } from './token';
import { service_url } from '../constants';

interface CodeMessage {
  [code: string]: string;
}

export interface ResponseData<T = any> {
  code?:number;
  msg?:string;
  data?:T
};

export interface ApiOptions {
  onlyData?:boolean;
  isAuth?:boolean;
  loadingText?:string;
}

export type ResultData<T> = 
 | T
 | T[]
 | ResponseData<T[]>
 | ResponseData<T>
 | ResponseData

export type Options = RequestParams & ApiOptions;

const codeMessage:CodeMessage = {
  '200': '操作成功',
  '401': '用户没有权限',
  '403': '访问被禁止',
  '404': '资源不存在',
  '413': '上传的资源过大',
  '426': '用户名或密码错误',
  '428': '缺少请求参数',
  '500': '服务器发生错误',
  '502': '网关错误',
  '504': '网关超时',
  '999': '未知错误'
};


function checkStatus(response: any): Response {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  const errortext:string = codeMessage[response.statusCode??999];
  response.statusCode != 401  && 
  Taro.showToast({
    title: errortext,
    icon: 'none',
    mask: true
  });
  throw response;
}

function parseData(response: ResponseData, options?:ApiOptions): any{
  if(!response) {
    return null;
  } else {
    if(!response.hasOwnProperty('data')) {
      return response
    } else {
      if(response.code === 1) {
        return Taro.showToast({
          title: response.msg as string,
          icon: 'none',
          mask: true
        })
      }
      return options?.onlyData ? response.data : response
    }
  }
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request<T>(options: Options): Promise<T> {
  if(options?.loadingText) {
    Taro.showLoading({
      title: options?.loadingText,
      mask: true
    })
  }
  
  const newOptions:RequestParams = {
    method: 'POST',
    ...options
  };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.header = {
      ...newOptions.header,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    };
    newOptions.data = JSON.stringify(newOptions.data);
  }
  newOptions.header = {
    ...newOptions.header,
    Authorization: getToken() ? `Bearer ${getToken()}` : 'Basic d2VpaHVhbmc6d2VpaHVhbmc='
  }
  newOptions.url = `${service_url}${newOptions.url}`;
  return Taro.request(newOptions)
    .then(response => {
      Taro.hideLoading();
      if (response.statusCode >= 200 && response.statusCode < 300) {
        const { data:{code, data} } = response
        if(code === 1) {
          return TaroH5.showToast({
            title: data.msg || '服务器错误',
            icon: 'none',
            mask: true
          });
        }
        return parseData(response.data, options);
      }
      const errortext:string = codeMessage[response.statusCode??999];
      (response.statusCode !== 401 && response.statusCode !==500)  && 
      Taro.showToast({
        title: errortext,
        icon: 'none',
        mask: true
      });
      throw response;
    })
    .catch(async (e) => {
      Taro.hideLoading();
      const data = await e.json();
      if(e.status === 500) {
        return TaroH5.showToast({
          title: data.msg || '服务器错误',
          icon: 'none',
          mask: true
        });
      } 
      if(e.status === 401) {
        removeToken();
        TaroH5.redirectTo({
          url: '/page/User/Sign'
        })
      }
      /*  */
    });
}