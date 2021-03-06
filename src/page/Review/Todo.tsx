import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton, AtFloatLayout, AtTextarea, AtActionSheet, AtActionSheetItem } from 'taro-ui';
import { RootState } from '../../store';
import TopBarPage from '../../layout/TopBarPage';
import BottomBar from '../../component/BottomBar';
import classNames from './style/index.module.scss';
import TodoCard from './components/TodoCard';
import Maintenance from './components/Maintenance';
import TaskDetail from '../../component/TaskDetail';
import { maintenanceValueForState } from './constants';
import { color } from '../../constants';

const Todo:React.FC<{tid: string}> = props => {
  const tid = props.tid;
  const { id, userId, deptName, type, detail='0', page='' } = parse(tid.split('?')[1]);
  const [ visible, setVisible ] = React.useState<boolean>(false);
  const [ comment, setComment ] = React.useState<string>('');
  const [ rows, setRows ] = React.useState<any[]>([]);
  const [ opened, setOpened ] = React.useState<boolean>(false);
  const [ editButtonOpened , setEditButtonOpened ] = React.useState<boolean>(false);
  const [ maintenanceValue, setMaintenanceValue ] = React.useState<any>(maintenanceValueForState)
  const taskAction = React.useRef<string>('');
  const currentId = React.useRef<number>(-1);
  const currentRecords = React.useRef<any[]>([]);
  const { review } = useDispatch<RematchDispatch<Models>>();
  const { task, records } = useSelector((state: RootState) => state.review);
  const currentRow = React.useRef<any>([]);
  const todoRows = [
    {
      title: '物资名称',
      dataIndex: 'materialName'
    },
    {
      title: '物资首拼',
      dataIndex: 'materialShortName'
    },
    {
      title: '物资编码',
      dataIndex: 'materialCode'
    },
    {
      title: '物资部件号',
      dataIndex: 'materialPartNumber'
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
      title: '在库数量',
      dataIndex: 'inWarehouseQuantity'
    },
    {
      title: '申请数量',
      dataIndex: 'quantity'
    },
    {
      title: '船长/部门长审批数量',
      dataIndex: 'captainAuditCount',
      hide: task?.identify !== 'MaterialsApproval' && task?.identify !== 'OfficeMaterialsApproval'
    },
    {
      title: '机务员/办公室主任审批数量',
      dataIndex: 'flightAuditCount',
      hide: task?.identify !== 'MaterialsApproval' && task?.identify !== 'OfficeMaterialsApproval'
    }
  ]

  React.useEffect(() => {
    currentRow.current = rows;
  });
  Taro.useDidShow(() => {
    setRows([]);
    review.fetchTodoDetail({
      id,
      type,
      page,
      callback: ({records, task}) => {
        if(type === 'Maintenance') {
          setMaintenanceValue(prev => {
            return {
              ...prev,
              [`${task?.identify}`]: records
            }
          })
        }
      }
    });
  });

  const handleShowFloatLayout = React.useCallback((flag?:boolean) => {
    setVisible(!!flag);
  }, []);
  const handleSubmitTask = React.useCallback(() => {
    if(taskAction.current === '通知领取') {
      if(!rows.length) return Taro.showToast({
        title: '前选择领用物资',
        icon: 'none',
        mask: true
      })
    } 
    review.submitTask({
      ...task,
      extra: currentRow.current.length ? currentRow.current : (type === 'Maintenance' ? maintenanceValue[task?.identify] : records.map(item => ({...item}))),
      comment,
      isDefault: true,
      taskFlag: taskAction.current
    });
  }, [task, records, comment, taskAction.current, maintenanceValue]);
  const handlePut = React.useCallback((data, index, type) => {
    const map = [
      {
        placeholder: '机务员/办公室主任审批数量',
        field: 'flightAuditCount',
        default: data.captainAuditCount
      },
      {
        placeholder: '请输入船长/部门长审批数量',
        field: 'captainAuditCount',
        default: data.quantity
      },
      {
        placeholder: '机务员/办公室主任审批数量',
        field: 'flightAuditCount',
        default: data.captainAuditCount
      }
    ];
    const current = map[type];
    const applyQuantity = window.prompt(current.placeholder, current.default);
    if(applyQuantity) {
      review.put({
        data:{
          ...data,
          [`${current.field}`]: applyQuantity
        }, 
        index
      });
    }
  }, [review]);
  const getAction = React.useCallback((item,index) => {
     const taskName = task?.taskName || '';
     if(!taskName) return;
     if(task?.identify !== 'MaterialsApproval' && task?.identify !== 'OfficeMaterialsApproval') return;
      switch(true) {
       case taskName.indexOf('物资审批 - 仓库保管员审批') > -1 && item.outWarehouseStatus === '未出库':
        currentId.current = item.id;
        return setEditButtonOpened(true);
       case taskName.indexOf('物资审批 - 机务员、班组所属部门长审批') > -1:
        return handlePut(item, index, 0);
       case taskName.indexOf('物资审批 - 船长、班组长、部门长审批') > -1:
        return handlePut(item, index, 1);
        case taskName.indexOf('办公室主任审批') > -1:
          return handlePut(item, index, 2);
     }
     return null;
  }, [task.taskName])
  return (
    <TopBarPage fixed title={detail==='0' ? '任务办理' : '任务详情'}>
      {
        task?.id && page!=='history'? 
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
          {
            (task.taskName?.indexOf('物资审批 - 仓库保管员审批') > -1 && detail === '0') && 
            <View className={classNames.addBtn} onClick={() => Taro.navigateTo({
              url: `/page/Review/EditTodo?receivePlanBillId=${task?.id}`
            })}>
              <Text>新增</Text>
            </View>
          }
          {
            Object.keys(task).length && 
            (
              type === 'ReportForms' ?
              <TaskDetail tid={props.tid}/> :
                type === 'Maintenance' ?
                <Maintenance 
                  detail={detail==='1'} 
                  role={task?.taskName} 
                  identify={task?.identify} 
                  updater={setMaintenanceValue} 
                  formValue={maintenanceValue[task?.identify]}
                /> :
                records && records.length ?
                records.map((item, index) => {
                  const taskName = task?.taskName;
                  let _item = item;
                 
                  if(task?.identify === 'MaterialsApproval' || task?.identify === 'OfficeMaterialsApproval') {
                    switch(true) {
                      case taskName.indexOf('物资审批 - 机务员、班组所属部门长审批') > -1:
                        _item = {...item, flightAuditCount: item.flightAuditCount || item.captainAuditCount}
                        break;
                      case taskName.indexOf('物资审批 - 船长、班组长、部门长审批') > -1:
                        _item = {...item, captainAuditCount: item.captainAuditCount || item.quantity}
                        break;
                      case taskName.indexOf('办公室主任审批') > -1:
                        _item = {...item, flightAuditCount: item.flightAuditCount || item.captainAuditCount}
                        break;
                    }
                  }
                  return (
                    <TodoCard
                      key={item.id || index}
                      title={item.receiveBillNo}
                      data={_item}
                      checked={currentRow.current.indexOf(item) > -1}
                      checkable={task.taskName?.indexOf('物资审批 - 仓库保管员审批') > -1 && item.outWarehouseStatus === '未出库' && detail === '0'}
                      rows={todoRows}
                      headerExtra={task.taskName?.indexOf('物资审批 - 仓库保管员审批') > -1 ? <b style={{color:color.brandColor}}>{item.outWarehouseStatus}</b> : null}
                      onCardClick={() => {
                        if( detail === '1') return
                        return getAction(item, index)
                      }}
                      onChecked={() => {
                        setRows(rows => {
                          const index = rows.indexOf(item);
                          if(index > -1) {
                            rows.splice(index, 1);
                            return rows;
                          } else {
                            return [...rows, item];
                          }
                        })
                      }}
                    /> 
                  )
                }) : null
            )
          }
          {/* <TaskDetail onEdit={(data, index) => type === 'PurchasingApproval' ? handlePut(data,index) : null} tid={props.tid}/> */}
        </View>
      </View>
      { 
        detail === '0' && 
        <BottomBar>
          <View className='button-group'>
            <AtButton type='primary' className={classNames.round} onClick={() => setOpened(true)}>操 作</AtButton>
          </View>
        </BottomBar> 
      }
      <AtActionSheet cancelText='取消' onClose={() => setOpened(false)} isOpened={opened}>
          {
            task.flagList && task.flagList.map((item, index) => {
              return (
                <AtActionSheetItem key={index} onClick={() => {
                  taskAction.current = item;
                  setOpened(false);
                  if(type === 'Maintenance') {
                    handleSubmitTask();
                  } else {
                    handleShowFloatLayout(true);
                  }
                }}>{item}</AtActionSheetItem>
              )
            })
          }
      </AtActionSheet>
      <AtActionSheet cancelText='取消' onClose={() => setEditButtonOpened(false)} isOpened={editButtonOpened}>
        <AtActionSheetItem onClick={() => {
          Taro.navigateTo({
              url: `/page/Review/EditTodo?receivePlanBillId=${task?.id}&id=${currentId.current}`
          });
          setEditButtonOpened(false); 
        }}>编辑</AtActionSheetItem>
        <AtActionSheetItem onClick={() => {
          const confirm = window.confirm(`确定要删除这条记录吗?`);
          if(confirm) {
            review.deleteTodo({
              id: currentId.current,
              pid: id,
              type
            });
            setEditButtonOpened(false);
          }
        }}><span style={{color:'red'}}>删除</span></AtActionSheetItem>
      </AtActionSheet>
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