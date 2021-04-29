import { ModelEffects, ModelReducers } from '@rematch/core';
import { RootState } from '../index';
import { uploadFile, queryMaterial, queryDicForRepair, queryFileList } from '../../api/common';
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
  material:any[];
  filteredMaterial: any[];
  accidentType: any[];
  repairWay: any[];
  repairType: any[];
  maintenancePlace: any[];
  fileList: any[]
}

const state:Common = {
  material: [],
  filteredMaterial: [],
  accidentType: [],
  repairType: [],
  repairWay: [],
  maintenancePlace: [],
  fileList: []
}
const reducers:ModelReducers<Common> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  },
  filter(state, payload) {
    const filteredMaterial = state.material.filter(item => {
      return item._key.indexOf(payload) > -1
    }).slice(0, 20);
    console.log(filteredMaterial)
    return Object.assign({}, state, { filteredMaterial })
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
  },
  async fetchMaterial() {
    try {
      const response = await queryMaterial<any[]>();
      if(response) {
        const material = response.map(item => ({...item,_key: `${item.name}.${item.code}`}))
        this.save({
          material,
          filteredMaterial: material.slice(0, 20)
        })
      }
    } catch(e) {} 
  },
  async fetchFileList(ids:string[]) {
    try {
      const response = await queryFileList(ids);
      if(response) {
        this.save({
          fileList: response
        })
      }
    } catch(e) {} 
  },
  async fetchDicForRepair() {
    const types = ['accidentType', 'repairType','repairWay', 'maintenancePlace'];
    try {
      const services = types.map(async item => await queryDicForRepair(item));
      const [accidentType, repairType, repairWay,maintenancePlace] = await Promise.all(services);
      this.save({
        accidentType, repairType, repairWay,maintenancePlace
      });
    } catch {
      this.save({
        accidentType: [],
        repairType: [],
        repairWay: [],
        maintenancePlace: []
      })
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