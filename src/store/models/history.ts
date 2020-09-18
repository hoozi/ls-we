import { ModelEffects, ModelReducers, RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../index';
import { queryHistory, queryNote } from '../../api/history';

export type History = {
  records: any[];
  total: number;
  size: number;
  pages: number;
  current: number;
  notes: any[];
}

const state:History = {
  records: [],
  notes: [],
  total: 0,
  size: 10,
  pages: 0,
  current: 1
}
const reducers:ModelReducers<History> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<RootState> => ({
  async fetchHistory(payload, rootState) {
    const { callback, ...restPayload } = payload;
    //const openId = rootState.common.openId || (await dispatch.common.fetchOpenId());
    try {
      const response = await queryHistory<History>({
        size: '10',
        ...restPayload
      });
      if(response) {
        this.save(response);
        callback && callback(response)
      }
    } catch(e) {}
  },
  async fetchNote(payload) {
    const { id } = payload;
    //const openId = rootState.common.openId || (await dispatch.common.fetchOpenId());
    try {
      const response = await queryNote<any>(id);
      if(response) {
        this.save({
          notes: response
        });
      }
    } catch(e) {}
  }
})

export default {
  state,
  reducers,
  effects
}