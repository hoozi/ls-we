import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { View, Text, ScrollView } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../../store';
import TopBarPage from '../../layout/TopBarPage';
import createList from '../../HOC/createList';
import Empty from '../../component/Empty';
import TouchHighlight from '../../component/TouchHighlight';
import Card from '../../component/Card';
import Loading from '../../component/Loading';
import Timeline from '../../component/Timeline';
import ListView from '../../component/ListView';
import { color } from '../../constants';
import { tabList } from '../Review';
import classNames from './style/index.module.scss';

interface ButtonItem {
  title: string;
  icon: string;
  action: string;
  onClick():void;
};

interface Type {
  [key: string]: {
    title: string;
    cls: string;
  }
}

const buttons:ButtonItem[] = [
  {
    title: '确认',
    icon: 'daily',
    action: 'confirm',
    onClick() {
      console.log(3)
    }
  },
  {
    title: '详情',
    icon: 'pizhu',
    action: 'detail',
    onClick() {
      console.log(2)
    }
  }
];

const Requisition:React.FC<any> = props => {
  const { requisition } = useDispatch<RematchDispatch<Models>>();
  props.setParams({
    reset: {
      current: 1
    }
  });
  return (
    <ListView 
      onReachBottom={props.reachBottom}
      onPullDownRefresh={props.pullDownRefresh}
    >
      <TopBarPage
        title='领用确认'
        fixed
      >
        {
          props.list.length ? 
          <View className='cardContainer'>
            {
              props.list.map(item => {
                const Actions:React.ReactNode[] = buttons./* filter(btn => !(btn.action === 'confirm' && item.confirmed)). */map(button => (
                  <TouchHighlight
                    underlayColor='#f9f9f9' 
                    key={button.icon} 
                    className={classNames.cardLink}
                    onClick={() => {
                      if(button.action === 'detail') {
                        return Taro.navigateTo({
                          url: `/page/Requisition/Detail?no=${item.no}`
                        })
                      };
                      const confirmed = window.confirm(`单号${item.no}出库？`);
                      if(confirmed) {
                        requisition.confirm({
                          no: item.no,
                          callback() {
                            props.getList();
                          }
                        });
                      }
                    }}
                  >
                    <Text className={`icon icon-${button.icon}`}/>
                    <Text>{button.title}</Text>
                  </TouchHighlight>
                ));
                const TopBarContent = (
                  <React.Fragment>
                    <View style='margin-top:4px'>
                      <Text className='icon icon-jiezhi' style='font-size: 14px; margin-right:4px'/>
                      <Text>出库时间: {item.deliverTime}</Text>
                    </View>
                  </React.Fragment>
                )
                return (
                  <Card 
                    key={item.no}
                    topBar={TopBarContent}
                    actions={Actions}
                  >
                    <Card.Header 
                      title={item.no}
                      extra={<View className={classNames.tag} style={`color: ${item.confirmed ? '#52c41a' : '#fa541c'}`}>{item.confirmed ? '已确认' : '未确认'}</View>}
                      subTitle={
                        <View>
                          <Text>领用数量</Text>
                          <Text style='font-size: 16px; font-weight: 500'> {item.count}</Text>
                        </View>
                      }
                    >
                      
                    </Card.Header>
                  </Card>
                )
              })
            }
          </View> : <Empty/>
        }
        
      </TopBarPage>
    </ListView>
  )
}

export default createList('requisition')(Requisition);