import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';

interface Params {
  getList(any):void;
  pages?: number,
  initParams?:any
}

export default ({
  getList,
  pages,
  initParams
}:Params):any[] => {
  const currentPage = React.useRef<number>(1);
  const params = React.useRef<any>({})
  const [ list, setList ] = React.useState<any[]>([]);
  const parseList = React.useCallback((records:any[], type:string = 'init') => {
    const currentList = type === 'add' ? [...list, ...records] : [...records];
    setList([...currentList]);
  }, [list, setList]);
  const createList = React.useCallback((type) => {
    if(type === 'init') {
      currentPage.current = 1;
    }
    getList({
      current: currentPage.current,
      ...params.current,
      callback(response) {
        parseList(response.records, type);
      }
    });
  }, [getList, list, params.current]);
  const setParams = React.useCallback(_params => {
    params.current = {
      ...params.current,
      ..._params
    };
  }, [params]);
  React.useEffect(() => {
    setParams(initParams);
    createList('init');
    return;
  }, []);
  /* Taro.usePullDownRefresh(() => {
    setParams(initParams);
    createList('init');
  });
  Taro.useReachBottom(() => {
    if(pages <= currentPage.current) {
      return 
    } else {
      ++currentPage.current;
    };
    createList('add');
  }); */
  return [list, createList, setParams]
}