import * as React from 'react';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import useList from '../../hook/useList';
import createList from '../../HOC/createList';
import TopBarPage from '../../layout/TopBarPage';
import Empty from '../../component/Empty';
import Card from '../../component/Card';
import Fields from '../../component/Fields';
//import classNames from './style/index.module.scss';

const Detail:React.FC<any> = props => {
  const tid = props.tid;
  const id = parse(tid.split('?')[1])['id'];
  props.setParams({
    reset: {
      id
    }
  });
  return (
    <TopBarPage 
      title='任务详情'
      fixed
    >
      {
        props.list.length ? 
        <View className='cardContainer'>
        {
          props.list.map(item => {
            const TopBarContent = (
              <React.Fragment>
                <Text className='icon icon-guige' style='font-size: 16px; margin-right:2px'/>
                <Text>{item.specification} / {item.quantity}{item.measureUnit}</Text>
              </React.Fragment>
            )
            return (
              <Card 
                topBar={TopBarContent}
                key={item.id}
              >
                <Card.Header
                  title={item.materialName}
                  subTitle={item.materialCode}
                  extra={
                    <View style='line-height:1;text-align:right'>
                      <View style='color: #faad14;font-size: 16px;'>{item.budgetAmount}元</View>
                      <View style='color: #999; font-size: 12px;margin-top: 6px'>预计费用</View>
                    </View>
                  }
                />
                <Card.Body>
                  <Fields
                    data={item}
                    labelWidth={48}
                    rows={[
                      {
                        title: '用途',
                        dataIndex: 'usage'
                      },
                      {
                        title: '备注',
                        dataIndex: 'remark'
                      }
                    ]}
                  />
                </Card.Body>
              </Card>
            )
          })
        }
        </View> : <Empty/>
      }
    </TopBarPage>
  )
}

export default createList('todoDetail')(Detail);