import * as Taro from '@tarojs/taro-h5';
import { ModelEffects, ModelReducers, RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../index';
import { queryRequisition,confirm, queryRequisitionDetail } from '../../api/requisition';

export type Requisition = {
  details: any[];
  records: any[];
  total: number;
  size: number;
  pages: number;
  current: number;
  notes: any[];
}

const state:Requisition = {
  details: [],
  records: [],
  notes: [],
  total: 0,
  size: 10,
  pages: 0,
  current: 1
}
const reducers:ModelReducers<Requisition> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<RootState> => ({
  async fetchRequisition(payload, rootState) {
    const { callback, ...restPayload } = payload;
    //const openId = rootState.common.openId || (await dispatch.common.fetchOpenId());
    try {
      const response = await queryRequisition<Requisition>({
        size: '10',
        ...restPayload
      });
      if(response) {
        this.save(response);
        callback && callback(response)
      }
    } catch(e) {}
  },
  async confirm(payload) {
    const { callback, ...restPayload } = payload;
    //const openId = rootState.common.openId || (await dispatch.common.fetchOpenId());
    try {
      const response = await confirm<any>(restPayload.no);
      if(response.code === 0) {
        Taro.showToast({
          title: '确认成功',
          icon: 'success',
          mask: true,
          duration: 3000,
          success() {
            setTimeout(() => {
              callback && callback(response)
            }, 2000);
          }
        });
        
      }
    } catch(e) {}
  },
  async fetchRequisitionDetail(payload) {
    const { callback, ...restPayload } = payload;
    //const openId = rootState.common.openId || (await dispatch.common.fetchOpenId());
    try {
      const response = await queryRequisitionDetail<any[]>(restPayload.no);
      if(response) {
        this.save({
          details: response
        });
        callback && callback(response)
      }
    } catch(e) {}
  }
})

export default {
  state,
  reducers,
  effects
}