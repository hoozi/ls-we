import * as React from 'react';
import { connect } from 'react-redux';

export default (getFrom:string, isPage:boolean=false) => {
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
        'history': this.props.fetchHistory,
        'historyDetail': this.props.fetchHistoryDetail
      }
      private setParams(params) {
        this.params = {
          ...this.params,
          ...params
        }
      }
      private parseList(records:any, type:string = 'init') {
        const list = type === 'add' ?  [...this.state.list, ...records] : [...records];
        this.setState({
          list
        });
      }
      public state = {
        list: []
      }
      private initList() {
        this.setParams({
          ...this.params,
          search: {
            ...this.params.reset
          }
        });
        this.getList('init');
      }
      public componentDidUpdate() {
        const recordMap = {
          todoList: this.props.review.records,
          todoDetail: this.props.review.records,
          history: this.props.history.records,
          historyDetail: this.props.history.records
        }
        if(this.params.reset.type === 'PurchasingApproval') {
          this.setState({
            list: recordMap[getFrom]
          });
        }
      }
      public [`componentDid${isPage ? 'Show' : 'Mount'}`]() {
        this.initList();
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
            if(Array.isArray(response.records)) {
              this.parseList(response.records, type);
            } else {
              this.setState({
                list: response.records
              })
            }
          }
        });
      }
      public pullDownRefresh(){
        this.initList();
      }
      public reachBottom() {
        if(this.pages <= this.currentPage) {
          return 
        } else {
          ++this.currentPage;
        };
        this.getList('add');
      }
      public render() {
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
      ({review, history}) => ({
        review,
        history
      }), 
      ({review, history}) => ({
        ...review,
        ...history
      })
    )(HOC);
  }
}