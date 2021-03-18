import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../../store';
import TopBarPage from '../../layout/TopBarPage';
import TodoCard from '../Review/components/TodoCard'
import Empty from '../../component/Empty';


const Detail:React.FC<any> = props => {
  const tid = props.tid;
  const { no='' } = parse(tid.split('?')[1]);
  const { requisition } = useDispatch<RematchDispatch<Models>>();
  const { details } = useSelector((state: RootState) => state.requisition);
  Taro.useDidShow(() => {
    requisition.fetchRequisitionDetail({no})
  });
  const requisitionRows = [
    {
      title: '物资名称',
      dataIndex: 'materialName'
    },
    {
      title: '物资编码',
      dataIndex: 'materialCode'
    },
    {
      title: '物资品牌',
      dataIndex: 'brand'
    },
    {
      title: '计量单位',
      dataIndex: 'measureUnit'
    },
    {
      title: '规格',
      dataIndex: 'specification'
    },
    {
      title: '申请数量',
      dataIndex: 'quantity'
    },
    {
      title: '备注',
      dataIndex: 'remark'
    }
  ]
  return (
    <TopBarPage 
      title={`${no}提货明细`}
      fixed
    >
      <View className='cardContainer' style='height: 100%'>
        {
          details.length ?
          details.map(detail => (
            <TodoCard
              title={`申请人: ${detail.proposer}`}
              checkable={false}
              checked={false}
              data={detail}
              rows={requisitionRows}
            />
          )) : <Empty/>
        }
      </View>
    </TopBarPage>
  )
}

export default Detail;