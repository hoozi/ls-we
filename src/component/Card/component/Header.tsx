import * as React from 'react';
import { View, Text } from '@tarojs/components';
import TouchHighlight from '../../TouchHighlight';
import classNames from '../style/index.module.scss';

interface HeaderProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  onHeaderClick?():void;
  underlayColor?:string;
}

type HeaderType = React.FC<React.PropsWithChildren<HeaderProps>>

const Header:HeaderType = ({
  title,
  subTitle,
  extra,
  onHeaderClick,
  underlayColor='#f9f9f9',
  children
}) => {
  const HeaderContainer = React.useMemo<React.ComponentType<any>>(
    () => onHeaderClick ? TouchHighlight : View, 
    [onHeaderClick]
  );
  return (
    <HeaderContainer
      underlayColor={underlayColor}
      className={classNames.cardHeader}
      onClick={() => onHeaderClick ? onHeaderClick() : null}
    >
      <View className={classNames.cardHeaderContent}>
        <View className={classNames.cardTitle}>
          <Text>{title}</Text>
        </View>
        <View className={classNames.cardSubTitle}>
          <Text>{subTitle}</Text>
        </View>
        { children }
      </View>
      { extra && extra }
    </HeaderContainer>
  )
}

export default Header;
