import * as React from 'react';
import { View, Text } from '@tarojs/components';
import SignIn from './components/SignIn';
import classNames from './style/index.module.scss';


const Sign:React.FC<any> & {[key: string]:any} = props => {
  return (
    <View className={classNames.signContainer}>
      <View className={classNames.signCard}>
        <View className={classNames.circleBg}/>
        <Text className={classNames.signTitle}>船舶管理系统</Text>
      </View>
      <View className={classNames.signInContainer}>
        <SignIn/>
      </View>
    </View>
  )
}

export default Sign;
