import * as React from 'react';
import { View } from '@tarojs/components';
import Item from './component/Item';
import classNames from './style/index.module.scss';

interface TimelineInterface extends React.FC<React.PropsWithChildren<any>> {
  Item: typeof Item;
}

const Timeline:TimelineInterface = ({
  children
}) => {
  return (
    <View className={classNames.timeline}>
      { children }
    </View>
  )
}

Timeline.Item = Item;

export default Timeline;