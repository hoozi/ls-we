import { init, Plugin, Middleware, RematchStore, ExtractRematchDispatchersFromEffects, Models } from '@rematch/core';
import { Reducer } from 'redux';
import createLoadingPlugin, { LoadingConfig } from '@rematch/loading';

interface IRootReducer {
  [key:string]: Reducer<any, any>
}
export interface IRedux {
  middlewares?:Middleware[];
  reducers?:IRootReducer
}

const options:LoadingConfig = {};

const loadingPlugin:Plugin = createLoadingPlugin(options)

import common, { Common as CommonState } from './models/common';
import history, { History as HistoryState } from './models/history';
import user, { User as UserState } from './models/user';
import review, { Review as ReviewState } from './models/review';

const models = {
  common,
  history,
  user,
  review
}

export type RootModels = typeof models;

export interface LoadingState<M extends Models> {
  global: boolean,
  models: { [modelName in keyof M]: boolean },
  effects: {
    [modelName in keyof M]: {
      [effectName in keyof ExtractRematchDispatchersFromEffects<M[modelName]['effects']>]: boolean
    }
  }
}

export type RootState = {
  common: CommonState;
  history: HistoryState;
  user: UserState;
  review: ReviewState;
  loading: LoadingState<any>;
}

const store:RematchStore = init({
  models,
  plugins: [loadingPlugin]
});

export default store;