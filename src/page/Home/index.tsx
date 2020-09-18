import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { View, Text } from '@tarojs/components';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtAvatar, AtGrid } from 'taro-ui';
import menus from './map';
import classNames from './style/index.module.scss';
import avatar from '../../assets/images/avatar.png';

export default () => {
  const { user } = useDispatch<RematchDispatch<Models>>();
  return (
    <View className={classNames.container}>
      <View className={classNames.userCard}>
        {/* <View className={classNames.circleBg}/>
        <View className={`${classNames.circleBg} ${classNames.circleBg1}`}/>
        <View className={`${classNames.circleBg} ${classNames.circleBg2}`}/>
        <View className={`${classNames.circleBg} ${classNames.circleBg3}`}/> */}
        <View className={classNames.userContent}>
          <AtAvatar circle image={avatar}/>
          <View className={classNames.userCardText}>
            <View>
              <Text>你好，{Taro.getStorageSync('sysUser').username}</Text>
            </View>
            <View className={classNames.extraText}>
              <Text>{Taro.getStorageSync('sysUser').deptName}</Text>
            </View>
          </View>
        </View>
        <View className='at-icon at-icon-settings' 
          style='position: relative; color:#fff; z-index: 11;' 
          onClick={async () => {
            const contralList: any[] = [
              () => {
                Taro.navigateTo({
                  url: '/page/User/UpdatePassword'
                });
              },
              () => {
                user.logout();
              }
            ]
            try {
              const res = await Taro.showActionSheet({
                itemList: ['修改密码','退出登录']
              });
              contralList[res.tapIndex]();
            } catch(e) {console.log(e)}
          }}
        />
      </View>
      
      <View className={classNames.menuList}>
        <View className={classNames.menuBody}>
          {
            menus.map(m => (
              <View className={classNames.menuItem} key={m.url} onClick={()=> Taro.navigateTo({
                url: m.url
              })}>
                <View style='width: 42px'>
                  <View className={classNames.menuIcon} style={`background-color:${m.iconInfo.color}`}>
                    <Text style={`font-size:${m.iconInfo.size}px`} className={`icon ${m.iconInfo.prefixClass}-${m.iconInfo.value}`}/>
                  </View>
                  <Text className={classNames.menuTitle}>{m.value}</Text>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    </View>
  )
}