import React from 'react';
import { View, Text, Checkbox } from '@tarojs/components';
import classNames from '../style/index.module.scss';
import Fields, { Row } from '../../../component/Fields';

interface ITodoCard {
  data: any;
  rows: Row[];
  checkable: boolean;
  checked: boolean;
  title: string;
  onCardClick?():void;
  onChecked?():void;
  headerExtra?: React.ReactNode;
  footer?:React.ReactNode;
}

const TodoCard:React.FC<ITodoCard> = ({
  data,
  checkable,
  checked,
  rows,
  title,
  headerExtra,
  footer,
  onCardClick,
  onChecked
}) => {
  return (
    <View className={`${classNames.todoCard} ${checkable ? classNames.todoCardChecked : ''}`}>
      { 
        ( title || headerExtra ) &&
        <View className={classNames.todoCardHeader}>
        <span>
          {
            checkable &&
            <Checkbox value={data.id} checked={checked} onClick={e => {
              e.stopPropagation();
              onChecked && onChecked()
            }}/>
          }
          <b className='ml6'>{title}</b>
        </span>
        <div className={classNames.todoCardHeaderExtra}>{headerExtra}</div>
      </View>
      }
      
      <View className={classNames.todoCardBody}>
        <View className={classNames.todoCardContent} onClick={onCardClick}>
          <Fields
            rows={rows}
            data={data}
          />
        </View>
      </View>
      {footer}
    </View>
  )
}

export default TodoCard;