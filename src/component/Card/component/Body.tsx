import * as React from 'react';
import { View } from '@tarojs/components';
import classNames from '../style/index.module.scss';

type BodyType = React.FC<React.PropsWithChildren<any>>

const Body:BodyType = ({
  children
}) => {
  return (
    <View className={classNames.cardBody}>
      <View className={classNames.cardBodyInner}>{ children }</View>
    </View>
  )
}

export default Body;
