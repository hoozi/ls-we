import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton, AtFloatLayout, AtTextarea } from 'taro-ui';
import { RootState } from '../../store';
import TopBarPage from '../../layout/TopBarPage';
import BottomBar from '../../component/BottomBar';
import classNames from './style/index.module.scss';
import TaskDetail from '../../component/TaskDetail';

const Todo:React.FC<any> = props => {
  const tid = props.tid;
  const parseQuery = parse(tid.split('?')[1]);
  const id = parseQuery['id'];
  const userId = parseQuery['userId'];
  const deptName = parseQuery['deptName'];
  const type = parseQuery['type'];
  const [ visible, setVisible ] = React.useState<boolean>(false);
  const [ comment, setComment ] = React.useState<string>('');
  const currentComment = React.useRef<string>('');
  const taskFlagIndex = React.useRef<number>(0);
  const { review } = useDispatch<RematchDispatch<Models>>();
  const { task, records } = useSelector((state: RootState) => state.review);
  //const [approvalEditQuantitiesList, setApprovalEditQuantitiesList] = React.useState<any[]>([]);

  React.useEffect(() => {
    currentComment.current = comment;
  }, [comment]);
  const handleShowFloatLayout = React.useCallback((flag?:boolean) => {
    setVisible(!!flag);
  }, []);
  const handleSubmitTask = React.useCallback(() => {
    review.submitTask({
      ...task,
      approvalEditQuantitiesList: records.map(item => ({id:item.id, approvalQuantity: item.applyQuantity})),
      comment: currentComment.current,
      isDefault: true,
      taskFlag: task.flagList[taskFlagIndex.current]
    });
  }, [task, records, currentComment,taskFlagIndex.current]);
  const handlePut = React.useCallback((data, index) => {
    const applyQuantity = window.prompt('请输入审批数量', '');
    if(applyQuantity) {
      review.put({
        data:{
          ...data,
          applyQuantity
        }, 
        index
      });
    }
  }, [review]);
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
        <View className='cardBtnContainer'>
          <TaskDetail onEdit={(data, index) => type === 'PurchasingApproval' ? handlePut(data,index) : null} tid={props.tid}/>
        </View>
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