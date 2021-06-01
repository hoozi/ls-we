import * as Taro from '@tarojs/taro-h5';
import { ModelEffects, ModelReducers } from '@rematch/core';
import { RootState } from '../index';
import { signIn, signUp, queryCurrentUser, updatePassword } from '../../api/user';
import { encryption } from '../../shared/utils';
import { setToken, removeToken } from '../../shared/token';

interface SysUser {
  avatar: string;
  createTime: string;
  delFlag:string;
  deptId: number;
  lockFlag: string;
  password: string;
  phone: string;
  qqOpenid: string;
  tenantId: number;
  updateTime: string;
  userId: number;
  username: string;
  wxOpenid: string
}

export type User = {
  permissions: string[];
  sysUser:Partial<SysUser>;
  roles: number[];
  uid: number
}

export interface UserToken {
  access_token: string;
  refresh_token: string;
  user_id: number;
  username: string;
}

const state:User = {
  permissions: [''],
  sysUser:{},
  roles: [],
  uid: -1
}
const reducers:ModelReducers<User> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects:ModelEffects<RootState> = {
  async signIn(payload) {
    try {
      const randomStr = Number(Date.now());
      const encryptioned = encryption({
        data:{ ...payload, randomStr},
        key:'weihuangweihuang',
        param: ['password']
      });
      const response = await signIn<UserToken>({
        ...payload,
        client_id: 'weihuang',
        client_secret: 'weihuang',
        randomStr,
        password: encryptioned.password
      });
      if(response.access_token) {
        setToken(response.access_token);
        this.fetchCurrentUser(() => {
          Taro.redirectTo({
            url: '/page/Home/index'
          });
        })
      }
    } catch(e) {
      
    }
  },
  async updatePassword(payload) {
    try {
      const response = await updatePassword<any>({
        username: Taro.getStorageSync('sysUser').username,
        ...payload
      });
      if(response.code === 0) {
        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success:() => {
            setTimeout(() => {
              console.log(this)
              this.logout();
            }, 2000)
          }
        })
      }
    } catch(e) {
      
    }
  },
  async signUp(payload) {
    const { callback, ...restPayload } = payload;
    Taro.showLoading({
      title: '注册中...',
      mask: true
    });
    try {
      const response = await signUp(restPayload);
      const res = JSON.parse(response.data)
      if(res.code === 0) {
        Taro.showToast({
          title: restPayload.password ? '注册成功' : '注册成功,为您分配的密码为123456',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              callback && callback();
            }, 2000)
          }
        })
      }
    } catch(e) {
      
    }
  },
  async logout() {
    removeToken();
    Taro.removeStorageSync('sysUser');
    Taro.redirectTo({
      url: '/page/User/Sign'
    });
  },
  async fetchCurrentUser(callback) {
    try {
      const response = await queryCurrentUser<User>();
      if(response) {
        this.save(response);
        Taro.setStorageSync('sysUser', response.sysUser)
        callback && callback();
      }
    } catch(e) {
      
    }
  }
}

export default {
  state,
  reducers,
  effects
}