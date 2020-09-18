import * as React from 'react';
import { View } from '@tarojs/components';

const BottomBar:React.FC<React.PropsWithChildren<any>> = ({
  children
}) => {
  return (
    <View className='bottomBar'>
      { children }
    </View>
  )
}

export default BottomBar;