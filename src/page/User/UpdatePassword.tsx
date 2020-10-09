import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton } from 'taro-ui';
import TopBarPage from '../../layout/TopBarPage';
import Password from './components/Password';
import classNames from './style/index.module.scss';

const UpdatePassword:React.FC<any> = props => {
  const { user } = useDispatch<RematchDispatch<Models>>();
  const [password, setPassword] = React.useState<any>({
    password: '',
    newpassword1: '',
    newpassword2: ''
  });
  const passwordValues = React.useRef<any>({});
  React.useEffect(() => {
    passwordValues.current = password
  });
  const handleChangePassword = React.useCallback((value, name) => {
    setPassword({
      ...passwordValues.current,
      [name]: value
    });
  },[]);
  const handleUpdatePassword = React.useCallback(() => {
    if(
      !passwordValues.current.password || 
      !passwordValues.current.newpassword1 ||
      !passwordValues.current.newpassword2
    ) {
      return Taro.showToast({
        title: '信息不完整',
        icon: 'none'
      })
    }
    if(passwordValues.current.newpassword1 !== passwordValues.current.newpassword2) {
      return Taro.showToast({
        title: '两次密码不一致',
        icon: 'none'
      })
    }
    user.updatePassword(passwordValues.current);
  },[passwordValues]);
  return (
    <TopBarPage title='修改密码'>
      <View className={classNames.upPasswordItem}>
        <Text style='width: 100px;display:block'>旧密码</Text>
        <Password 
          placeholder='请输入'
          placeholderStyle='color: #ddd' 
          onInput={e => handleChangePassword(e.detail.value, 'password')} 
          showIcon={false}
        />
      </View>
      <View className={classNames.upPasswordItem}>
        <Text style='width: 100px;display:block'>新密码</Text>
        <Password 
          placeholder='请输入'
          placeholderStyle='color: #ddd' 
          onInput={e => handleChangePassword(e.detail.value, 'newpassword1')} 
          showIcon={false}
        />
      </View>
      <View className={classNames.upPasswordItem}>
        <Text style='width: 100px;display:block'>确认新密码</Text>
        <Password 
          placeholder='请输入' 
          placeholderStyle='color: #ddd'
          onInput={e => handleChangePassword(e.detail.value, 'newpassword2')} 
          showIcon={false}
        />
      </View>
      <View style='padding: 12px'>
        <AtButton
          type='primary'
          className={classNames.signButton}
          customStyle={{
            marginTop:0
          }}
          onClick={handleUpdatePassword}
        >提 交</AtButton>
      </View>
    </TopBarPage>
  )
}

export default UpdatePassword;
