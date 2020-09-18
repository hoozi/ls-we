import * as React from 'react';
import { View, Text } from '@tarojs/components';
import classNames from './style/index.module.scss';

interface Row {
  title: React.ReactNode;
  dataIndex: string;
  render?(value?:string, rows?:any):React.ReactNode;
}

interface FieldsProps {
  data:any[];
  rows: Row[];
  labelWidth?: number;
}

const Fields:React.FC<FieldsProps> = ({
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
          return (
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

export default Fields;