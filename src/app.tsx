import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as Taro from '@tarojs/taro';

import store from './store';

import './style/index.scss';

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
