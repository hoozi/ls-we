import * as React from 'react';
import { View, Text } from '@tarojs/components'
import classNames from './style/index.module.scss';

interface EmptyProps {
  text?:string;
  onlyText?: boolean
}

const Empty:React.FC<EmptyProps> = ({
  onlyText=false,
  text='暂无数据'
}:EmptyProps) => {
  return (
      <View className={classNames.container}>
        { onlyText ? null : <View className={classNames.emptyIcon}/>}
        <View className={classNames.textContainer}>
          <Text className={classNames.emptyText}>{text}</Text>
        </View>
      </View>
  )
}

export default Empty;