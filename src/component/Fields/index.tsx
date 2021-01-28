import * as React from 'react';
import { View, Text } from '@tarojs/components';
import classNames from './style/index.module.scss';

export interface Row {
  title: React.ReactNode;
  dataIndex: string;
  render?(value?:string, rows?:any):React.ReactNode;
  hide?:boolean | ((value?:string, rows?:any)=>boolean);
}

interface FieldsProps {
  data:any;
  rows: Row[];
  labelWidth?: number;
}

interface GroupProps {
  group: {
    title: string,
    rows: Row[]
  };
  data: any;
  labelWidth?: number;
}

interface FieldsInterface extends React.FC<FieldsProps> {
  Group: typeof GroupFields
}

const Fields:FieldsInterface = ({
  data,
  rows,
  labelWidth=100
}) => {
  return (
    <View className={classNames.fieldContainer}>
      {
        rows && rows.length ?
        rows.map(item => {
          const value = data[item.dataIndex];
          const hideRow = typeof item.hide === 'function' ? item.hide(value, data) : item.hide;
          return (
            !!!hideRow &&
            <View className={classNames.field} key={item.dataIndex}>
              <View className={classNames.fieldName} style={`width: ${labelWidth}px`}>{item.title}</View>
              <View className={classNames.fieldValue}>
                {
                  item.render ? 
                  item.render(value, data) :
                  <Text>{value || '暂无'}</Text>
                }
              </View>
            </View>
          )
        }) : null
      }
    </View>
  )
}

const GroupFields:React.FC<GroupProps> = ({
  data,
  group,
  labelWidth=100
}) => {
  return (
    <View className={classNames.groupItem}>
      <View className={classNames.groupItemTitle}>{group.title}</View>
      <View className={classNames.groupItemContent}>
        <Fields
          data={data}
          rows={group.rows}
          labelWidth={labelWidth}
        />
      </View>
    </View>
  )
}

Fields.Group = GroupFields;

export default Fields;