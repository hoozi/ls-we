import * as React from 'react';
import { View } from '@tarojs/components';
//import Item from './component/Item';
import classNames from '../style/index.module.scss';

interface TimelineItemProps {
  label?: React.ReactNode;
}

const Item:React.FC<React.PropsWithChildren<TimelineItemProps>> = ({
  label,
  children
}) => {
  return (
    <View className={classNames.timelineItem}>
      <View className={classNames.tail}/>
      <View className={classNames.dot}/>
      <View className={classNames.label}>
        {label}
      </View>
      <View className={classNames.timelineContent}>
        {children}
      </View>
    </View>
  )
}

export default Item;