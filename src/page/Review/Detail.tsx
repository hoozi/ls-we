import * as React from 'react';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import createList from '../../HOC/createList';
import TopBarPage from '../../layout/TopBarPage';
import TaskDetail from '../../component/TaskDetail';
import Fields from '../../component/Fields';
//import classNames from './style/index.module.scss';

const Detail:React.FC<any> = props => {
  return (
    <TopBarPage 
      title='任务详情'
      fixed
    >
      <View className='cardContainer' style='height: 100%'>
        <TaskDetail tid={props.tid}/>
      </View>
    </TopBarPage>
  )
}

export default Detail;