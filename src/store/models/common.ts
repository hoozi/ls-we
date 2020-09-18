import { ModelEffects, ModelReducers } from '@rematch/core';
import { RootState } from '../index';
import { uploadFile } from '../../api/common';
import * as Taro from '@tarojs/taro';

/* interface User {
  avatarUrl: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  nickName: string;
  province: string;
} */

export type Common = {
  
}

const state:Common = {
  
}
const reducers:ModelReducers<Common> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects:ModelEffects<RootState> = {
  async uploadFile(payload) {
    Taro.showLoading({
      title: '上传中...',
      mask: true
    });
    const { callback, ...restPayload } = payload;
    try {
      const response = await uploadFile(restPayload);
      const res = JSON.parse(response.data)
      if(res.code === 0) {
        Taro.showToast({
          title: '上传成功',
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
  }
  /* async fetchOpenId() {
    try {
      const wxResponse = await Taro.login();
      const { code } = wxResponse;
      const openId:string = await queryOpendId({code});
      if(openId) {
        this.save({
          openId
        });
      }
      return openId;
    } catch(e) {console.log(e)}
  } */
}

export default {
  state,
  reducers,
  effects
}