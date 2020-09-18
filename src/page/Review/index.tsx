import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { View, Text } from '@tarojs/components';
import { AtFloatLayout } from 'taro-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../../store';
import TopBarPage from '../../layout/TopBarPage';
import createList from '../../HOC/createList';
import Empty from '../../component/Empty';
import TouchHighlight from '../../component/TouchHighlight';
import ListView from '../../component/ListView';
import Card from '../../component/Card';
import Loading from '../../component/Loading';
import Timeline from '../../component/Timeline';
import { color } from '../../constants';
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
    title: '办理',
    icon: 'shenhe',
    action: 'todo',
    onClick() {
      console.log(1)
    }
  },
  {
    title: '批注',
    icon: 'pizhu',
    action: 'Comment',
    onClick() {
      console.log(2)
    }
  },
  {
    title: '记录',
    icon: 'daily',
    action: 'Note',
    onClick() {
      console.log(3)
    }
  }
];

const Review:React.FC<any> = props => {
  props.setParams({
    reset: {
      current: 1
    }
  });
  const { review } = useDispatch<RematchDispatch<Models>>();
  const { loading } = useSelector((state:RootState) => state);
  const reviewState = useSelector((state:RootState) => state.review)
  const [ visible, setVisible ] = React.useState<boolean>(false);
  const [ layoutType, setLayoutType ] = React.useState<string>('comment');
  const types:Type = {
    'comment': {
      title: '批注',
      cls: 'comment'
    },
    'note': {
      title: '记录',
      cls: 'note'
    }
  }
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
        title='审批'
        fixed
        onSearch={() => null}
        extra={<Text className='at-icon at-icon-filter' style='width:36px; font-size:16px;color:#999;text-align:center'/>}
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
                      if(button.action === 'todo') {
                        return Taro.navigateTo({
                          url: `/page/Review/Todo?id=${item.taskId}&userId=${item.initiator}&deptName=${item.deptName}`
                        })
                      };
                      setVisible(true);
                      setLayoutType(button.action.toLowerCase());
                      review[`fetch${button.action}`]({
                        id: item.taskId
                      });
                    }}
                  >
                    <Text className={`icon icon-${button.icon}`}/>
                    <Text>{button.title}</Text>
                  </TouchHighlight>
                ));
                const TopBarContent = (
                  <React.Fragment>
                    <Text className='icon icon-shenqing' style='font-size: 16px; margin-right:2px'/>
                    <Text>{item.initiator} - {item.deptName || '暂无'} - {item.time}</Text>
                  </React.Fragment>
                )
                return (
                  <Card 
                    key={item.taskId}
                    topBar={TopBarContent}
                    actions={Actions}
                  >
                    <Card.Header 
                      title={item.title}
                      subTitle={item.taskName}
                      extra={<Text className='icon icon-xiayiye' style='font-size: 18px; color: #666'/>}
                      onHeaderClick={() => Taro.navigateTo({
                        url: `/page/Review/Detail?id=${item.taskId}`
                      })}
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
              loading.effects.review.fetchComment || 
              loading.effects.review.fetchNote
            ) ?
            <Loading center/> : 
            reviewState[`${layoutType}s`].length ? 
            <Timeline>
              {
                reviewState[`${layoutType}s`].map((item, index) => {
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
                      <View className={classNames.contentItem} style='color: #999'>{item.userId}{item.taskName ? `,【${item.taskName}】` : ''}</View>
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

export default createList('todoList')(Review);