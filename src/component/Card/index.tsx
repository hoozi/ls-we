import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Header from './component/Header';
import Body from './component/Body';
import classNames from './style/index.module.scss';

interface CardProps {
  actions?:React.ReactNode[];
  topBar?:React.ReactNode;
}

interface CardInterface extends React.FC<React.PropsWithChildren<CardProps>> {
  Header: typeof Header;
  Body: typeof Body;
}

const Card:CardInterface = ({
  actions,
  topBar,
  children
}) => {
  return (
    <View className={classNames.card}>
      { topBar && <View className={classNames.cardTopBar}>{topBar}</View>}
      { children }
      <View className={classNames.cardActions}>
        { actions }
      </View>
    </View>
  )
}

Card.Header = Header;
Card.Body = Body;

export default Card;
