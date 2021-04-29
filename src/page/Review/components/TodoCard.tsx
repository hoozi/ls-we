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
  onCardClick?(e:MouseEvent):void;
  onChecked?():void;
  headerExtra?: React.ReactNode;
  subHeader?: React.ReactNode;
  footer?:React.ReactNode;
}

const TodoCard:React.FC<ITodoCard> = ({
  data,
  checkable,
  checked,
  rows,
  title,
  headerExtra,
  subHeader,
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
      {
        subHeader &&
        <View>
          {subHeader}
        </View>
      }
      <View className={classNames.todoCardBody}>
        <View className={classNames.todoCardContent} onClick={(e:any) => {
          e.stopPropagation();
          onCardClick && onCardClick(e)
        }}>
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