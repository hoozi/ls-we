import { getStorageSync, setStorageSync, removeStorageSync } from '@tarojs/taro';

const TOKEN_KEY:string = 'u_token';

export const setToken = (token: string):void => {
  setStorageSync(TOKEN_KEY, token);
}

export const getToken = ():string => {
  return getStorageSync(TOKEN_KEY);
}

export const removeToken = ():void => {
  removeStorageSync(TOKEN_KEY);
}