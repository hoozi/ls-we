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
    title: '记录',
    icon: 'daily',
    action: 'Note',
    onClick() {
      console.log(3)
    }
  },
  {
    title: '详情',
    icon: 'pizhu',
    action: 'Comment',
    onClick() {
      console.log(2)
    }
  }
];

const History:React.FC<any> = props => {
  const { history } = useDispatch<RematchDispatch<Models>>();
  const { loading } = useSelector((state:RootState) => state);
  const historyState = useSelector((state:RootState) => state.history);
  const [ visible, setVisible ] = React.useState<boolean>(false);
  const [ layoutType, setLayoutType ] = React.useState<string>('note');
  const [ tabCurrent, setTabCurrent ] = React.useState<number>(0);
  props.setParams({
    reset: {
      current: 1,
      processName: tabList[tabCurrent].value
    }
  });
  const types:Type = {
    'note': {
      title: '记录',
      cls: 'note'
    },
    'comment': {
      title: '详情',
      cls: 'jizhu'
    }
  };
  const handleTabChange = React.useCallback(index => {
    setTabCurrent(index);
    props.setParams({
      search: {
        processName: tabList[index].value
      }
    });
    props.getList('init');
  }, []);
  const Tags = types => (
    types.length ? 
    types.map(type => (
      type && <View className={classNames.tag}>{type}</View>
    )) : null
  )
  return (
    <ListView 
      onReachBottom={props.reachBottom}
      onPullDownRefresh={props.pullDownRefresh}
    >
      <TopBarPage
        title='日志'
        fixed
        tabList={tabList}
        tabCurrent={tabCurrent}
        onTabChange={handleTabChange}
      >
        {
          props.list.length ? 
          <View className='cardContainer'>
            {
              props.list.map(item => {
                const Actions:React.ReactNode[] = buttons.map(button => (
                  <TouchHighlight
                    underlayColor='#f9f9f9' 
                    key={button.icon} 
                    className={classNames.cardLink}
                    onClick={() => {
                      if(button.action === 'Comment') {
                        return Taro.navigateTo({
                          url: `/page/Review/Todo?id=${item.recordId}&userId=${item.assignee}&deptName=${item.deptName}&type=${tabList[tabCurrent].value}&detail=1&page=history`
                        })
                      };
                      setVisible(true);
                      setLayoutType(button.action.toLowerCase());
                      history[`fetch${button.action}`]({
                        id: item.processInstanceId
                      });
                    }}
                  >
                    <Text className={`icon icon-${button.icon}`}/>
                    <Text>{button.title}</Text>
                  </TouchHighlight>
                ));
                const TopBarContent = (
                  <React.Fragment>
                    <View>
                      <Text className='icon icon-shenqing' style='font-size: 14px; margin-right:4px'/>
                      <Text>{item.assignee} - {item.deptName || '暂无'}</Text>
                    </View>
                    <View style='margin-top:4px'>
                      <Text className='icon icon-jiezhi' style='font-size: 14px; margin-right:4px'/>
                      <Text>{item.startTime} 至 {item.endTime}</Text>
                    </View>
                  </React.Fragment>
                )
                return (
                  <Card 
                    key={item.processInstanceId}
                    topBar={TopBarContent}
                    actions={Actions}
                  >
                    <Card.Header 
                      title={item.title}
                      subTitle={item.taskName}
                    >
                      <View className={classNames.tagContainer}>
                        {
                          Tags([
                            item.projectType,
                            item.applicationType,
                            item.procurementType
                          ])
                        }
                      </View>
                    </Card.Header>
                  </Card>
                )
              })
            }
          </View> : <Empty/>
        }
        <AtFloatLayout 
          isOpened={visible}
          className={`${types[layoutType].cls}-layout`} 
          title={types[layoutType].title}
          onClose={() => {
            setVisible(false)
          }}
        >
          {
            (
              loading.effects.history.fetchHistoryRecord 
            ) ?
            <Loading center/> : 
            historyState[`${layoutType}s`].length ? 
            <Timeline>
              {
                historyState[`${layoutType}s`].map((item, index) => {
                  const splitedTime = item.time.split(' ');
                  const Label = (
                    <React.Fragment>
                      <View style='padding:4PX 0 6PX'>{splitedTime[1]}</View>
                      <View style='color:#999'>{splitedTime[0]}</View>
                    </React.Fragment>
                  )
                  return (
                    <Timeline.Item label={Label} key={item.time}>
                      <View className={classNames.contentItem} style={{color: index === 0 ? color.successColor : '#333', fontWeight:'bold'}}>{item.fullMessage}</View>
                      <View className={classNames.contentItem} style='color: #999; line-height: 22px'>{item.userId}{item.taskName ? `,【${item.taskName}】` : ''}</View>
                    </Timeline.Item>
                  )
                })
              }
            </Timeline> : <Empty/>
          }
        </AtFloatLayout>
      </TopBarPage>
    </ListView>
  )
}

export default createList('history')(History);