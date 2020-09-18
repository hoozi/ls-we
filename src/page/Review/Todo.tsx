import * as React from 'react';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton, AtFloatLayout, AtTextarea } from 'taro-ui';
import { RootState } from '../../store';
import useList from '../../hook/useList';
import TopBarPage from '../../layout/TopBarPage';
import Empty from '../../component/Empty';
import Card from '../../component/Card';
import Fields from '../../component/Fields';
import BottomBar from '../../component/BottomBar';
import classNames from './style/index.module.scss';

const Todo:React.FC<any> = props => {
  const tid = props.tid;
  const parseQuery = parse(tid.split('?')[1]);
  const id = parseQuery['id'];
  const userId = parseQuery['userId'];
  const deptName = parseQuery['deptName'];
  const [ visible, setVisible ] = React.useState<boolean>(false);
  const [ comment, setComment ] = React.useState<string>('');
  const currentComment = React.useRef<string>('');
  const taskFlagIndex = React.useRef<number>(0);
  const { review } = useDispatch<RematchDispatch<Models>>();
  const { task } = useSelector((state: RootState) => state.review);
  const [ list ] = useList({
    getList: review.fetchTodoDetail,
    initParams: {
      id
    }
  });
  React.useEffect(() => {
    currentComment.current = comment
  }, [comment]);
  const handleShowFloatLayout = React.useCallback((flag?:boolean) => {
    setVisible(!!flag);
  }, []);
  const handleSubmitTask = React.useCallback(() => {
    review.submitTask({
      ...task,
      comment: currentComment.current,
      isDefault: true,
      taskFlag: task.flagList[taskFlagIndex.current]
    });
  }, [task, currentComment,taskFlagIndex.current])
  return (
    <TopBarPage fixed title='任务办理'>
      {
        task?.id ? 
        <View className={classNames.taskCard}>
          <View className={classNames.taskTitle}>{task.taskName}</View>
          <View className={classNames.taskExtra}>
            <Text className='icon icon-shenqing' style='font-size: 16px; margin-right:2px'/>
            <Text>{userId} - {deptName} - {task.time}</Text>
          </View>
        </View> : null
      }
      
      <View style='height: calc(100% - 72px);'>
        {
          list.length ? 
          <View className='cardContainer cardBtnContainer'>
          {
            list.map(item => {
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
      </View>
      <BottomBar>
        <View className='button-group'>
          <AtButton type='primary' onClick={() => {
            taskFlagIndex.current = 0;
            handleShowFloatLayout(true);
          }}>审批</AtButton>
          <AtButton type='secondary' onClick={() => {
            taskFlagIndex.current = 1;
            handleShowFloatLayout(true);
          }}
          >驳回</AtButton>
        </View>
      </BottomBar>
      <AtFloatLayout 
        title='批注' 
        className='textarea-layout comment-layout' 
        isOpened={visible}
        onClose={() => {
          setComment('');
          handleShowFloatLayout();
        }}
      >
        <View style='padding:12px 12px 0'>
          <AtTextarea value={comment} onChange={v => setComment(v)} maxLength={100} placeholder='请输入批注'/>
          <AtButton 
            className='large-button shadow-button' 
            type='primary'
            onClick={handleSubmitTask}
          >确 定</AtButton>
        </View>
      </AtFloatLayout>
    </TopBarPage>
  )
}

export default Todo;