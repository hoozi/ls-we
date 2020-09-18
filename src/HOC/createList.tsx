import * as React from 'react';
import { connect } from 'react-redux';

export default (getFrom:string) => {
  return WarppedComponent => {
    class HOC extends React.PureComponent<any, any> {
      private currentPage:number = 1
      private pages:number = 0
      private params:any = {
        search: {},
        reset: {}
      };
      private getFromMap = {
        'todoList':this.props.fetchTodo,
        'todoDetail':this.props.fetchTodoDetail,
        'history': this.props.fetchHistory
      }
      private setParams(params) {
        this.params = {
          ...this.params,
          ...params
        }
      }
      private parseList(records:any[], type:string = 'init') {
        const list = type === 'add' ? [...this.state.list, ...records] : [...records];
        this.setState({
          list
        });
      }
      public state = {
        list: []
      }
      public componentDidShow() {
        this.setParams({
          ...this.params,
          search: {
            ...this.params.reset
          }
        });
        this.getList('init');
      }
      public getList(type) {
        if(type === 'init') {
          this.currentPage = 1;
        }
        this.getFromMap[getFrom]({
          ...this.params.search,
          current: this.currentPage,
          callback:(response) => {
            this.pages = response?.pages??0;
            this.parseList(response.records, type);
          }
        });
      }
      public pullDownRefresh(){
        this.setParams({
          search: {
            ...this.params.reset
          }
        });
        this.getList('init');
      }
      public reachBottom() {
        if(this.pages <= this.currentPage) {
          return 
        } else {
          ++this.currentPage;
        };
        this.getList('add');
      }
      render() {
        const { list } = this.state;
        const publicMethods = {
          getList: this.getList.bind(this),
          setParams: this.setParams.bind(this),
          pullDownRefresh: this.pullDownRefresh.bind(this),
          reachBottom: this.reachBottom.bind(this)
        }
        return (
          <WarppedComponent list={list} {...publicMethods} {...this.props}/>
        )
      }
    }
    return connect(
      () => ({}), 
      ({review, history}) => ({
        ...review,
        ...history
      })
    )(HOC);
  }
}