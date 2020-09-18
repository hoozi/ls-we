import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { getToken } from '../../shared/token';

const CheckLogin:React.FC<any> = () => {
  React.useEffect(() => {
    Taro.showLoading({
      title: '请稍候...'
    });
    try {
      const token = getToken();
      if(token) {
        Taro.redirectTo({
          url: '/page/Home/index'
        });
      } else {
        Taro.redirectTo({
          url: '/page/User/Sign'
        });
      }
    } catch(e) {
      Taro.hideLoading();
      console.log(e);
    } 
  });
  return null;
}

export default CheckLogin;