import * as Taro from '@tarojs/taro-h5';
import { ModelEffects, ModelReducers, RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../index';
import { queryTodo, queryComment, queryNote, queryTask, queryTodoDetail, submitTask, deleteTodo, postTodo, queryCountInWarehouse } from '../../api/review';

export type Review = {
  records: any[];
  total: number;
  size: number;
  pages: number;
  current: number;
  comments: any[];
  notes: any[];
  refresh: boolean;
  task: {
    [key:string]: any;
  };
}

const state:Review = {
  records: [],
  comments: [],
  task: {},
  notes: [],
  total: 0,
  size: 10,
  refresh: true,
  pages: 0,
  current: 1
}
const reducers:ModelReducers<Review> = {
  save(state, payload) {
    return Object.assign({},state, payload);
  },
  put(state, payload) {
    const { records } = state;
    const { index=-1, data, task={} } = payload;
    index > -1 && records.splice(index, 1, data);
    return Object.assign({}, state, { records: [...records],task:{ ...state.task, ...task } })
  }
}
const effects = (dispatch:RematchDispatch<Models>):ModelEffects<RootState> => ({
  async fetchTodo(payload, rootState) {
    const { callback, ...restPayload } = payload;
    const { size, current } = rootState.review;
    try {
      const response = await queryTodo<Review>({
        size,
        current,
        ...restPayload
      });
      if(response) {
        this.save(response);
        callback && callback(response);
      }
    } catch(e) {
      
    }
  },
  async fetchComment(payload) {
    const { id } = payload;
    try {
      const response = await queryComment<any>(id);
      if(response) {
        this.save({
          comments: response
        })
      }
    } catch(e) {
      
    }
  },
  async fetchNote(payload) {
    const { id } = payload;
    try {
      const response = await queryNote<any>(id);
      if(response) {
        this.save({
          notes: response
        })
      }
    } catch(e) {
      
    }
  },
  async submitTask(payload) {
    try {
      const response = await submitTask<any>(payload);
      if(response.code === 0) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              Taro.navigateBack();
            }, 2000)
          }
        })
      }
    } catch(e) {}
  },
  async fetchTodoDetail(payload, rootState) {
    const { id, type, page, callback } = payload;
    this.save({
      records: []
    });
    try {
      const task = page === 'history' ? {id} : await queryTask<any>(id);
      
      if(task) {
        const params = type === 'ReportForms' || type === 'Maintenance' ? task.id : { ids: task.id }
        this.save({
          task
        });
        const response = await queryTodoDetail<any>(params, type === 'Maintenance' ? task.identify : type);
        if(response) {
          this.save({
            records: response,
            refresh: false
          });
          callback && callback({
            task,
            records: response
          });
        }
      }
      
    } catch(e) {
      
    }
  },
  async postTodo(payload) {
    try {
      const response = await postTodo<any>(payload);
      if(response.code === 0) {
        Taro.showToast({
          title: '提交成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              Taro.navigateBack();
            }, 2000);
          }
        })
      }
    } catch(e) {}
  },
  async deleteTodo(payload) {
    try {
      const effect = this;
      const { pid, type, id } = payload
      const response = await deleteTodo<any>(id);
      if(response.code === 0) {
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          mask: true,
          duration: 2000,
          success() {
            setTimeout(() => {
              effect.fetchTodoDetail({
                id: pid,
                type
              });
            }, 2000);
          }
        })
      }
    } catch(e) {}
  },
  async fetchCountInWarehouse(payload) {
    const { callback, ...restPayload } = payload;
    try {
      const response = await queryCountInWarehouse<any[]>(restPayload.id);
      callback && callback(response.reduce((sum, cur) => sum+cur.quantity,0))
    } catch(e) {
      callback && callback(0)
    }
  }
})

export default {
  state,
  reducers,
  effects
}