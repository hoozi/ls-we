import * as Taro from '@tarojs/taro-h5';
import { ModelEffects, ModelReducers, RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../index';
import { queryTodo, queryComment, queryNote, queryTask, queryTodoDetail, submitTask } from '../../api/review';

export type Review = {
  records: any[];
  total: number;
  size: number;
  pages: number;
  current: number;
  comments: any[];
  notes: any[];
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
  pages: 0,
  current: 1
}
const reducers:ModelReducers<Review> = {
  save(state, payload) {
    return Object.assign({},state, payload);
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
      const effect = this;
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
    } catch(e) {
      
    }
  },
  async fetchTodoDetail(payload, rootState) {
    const { id, callback } = payload;
    try {
      const task = await queryTask<any>(id);
      if(task) {
        this.save({
          task
        });
        const response = await queryTodoDetail<any>({
          ids:task.id
        });
        if(response) {
          this.save({
            records: response
          });
          callback && callback({
            records: response
          });
        }
      }
      
    } catch(e) {
      
    }
  }
})

export default {
  state,
  reducers,
  effects
}