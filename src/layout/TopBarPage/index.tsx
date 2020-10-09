import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { View, ScrollView } from '@tarojs/components';
import { AtTabs } from 'taro-ui';
import { TabItem } from 'taro-ui/types/tabs';
import classnames from 'classnames';
import SearchBar from '../../component/SearchBar';
import classNames from './style/index.module.scss';

interface PageHeaderProps {
  fixed?:boolean;
  title?:string;
  hasSearch?:boolean;
  tabList?: TabItem[];
  placeholder?: string;
  onSearch?(v:string):void;
  onTabChange?(index:number):void;
  tabCurrent?:number;
  dark?:boolean;
  extra?:React.ReactElement;
  headerRight?:React.ReactNode;
}

const computedMargin = (tabList:any, onSearch:any):number => {
  if(!!tabList && !!onSearch) {
    return 84+46;
  }
  if(!!tabList) {
    return 44+46;
  }
  if(!!onSearch) {
   return 50+46;
  }
  return 46;
}

const TopBarPage:React.FC<React.PropsWithChildren<PageHeaderProps>> = ({
  placeholder,
  tabList,
  title,
  onSearch,
  onTabChange,
  tabCurrent=0,
  fixed,
  dark,
  children,
  headerRight,
  extra
}) => {
  const topBarClassName = classnames(classNames.topBar, {
    [`${classNames.topBarFixed}`]: !!fixed
  });
  const paddingTop = React.useMemo(() => computedMargin(tabList, onSearch), [tabList, onSearch]);
  return (
    <View>
      <View className={topBarClassName} >
        <View className={classNames.topHeader}>
          <View className={`${classNames.topHeaderLeft} icon icon-shangyiye`} onClick={() => Taro.navigateBack()}/>
          <View className={classNames.topHeaderTitle} style='flex:1'>{title}</View>
          <View className={classNames.topHeaderRight} style='width:46px'>{headerRight}</View>
        </View>
        {
          !!onSearch &&
          <SearchBar
            dark={dark} 
            placeholder={placeholder} 
            onSearch={v => onSearch && onSearch(v)}
            customStyle={{
              paddingBottom: !!tabList ? 0 : 12,
              backgroundColor: !!dark ? '#455fe4' : '#fff'
            }}
            extra={extra}
          />
        }
        {
          !!tabList &&
          <AtTabs
            className={`custom-tabs ${!!dark ? 'custom-tabs-dark' : ''}`}
            tabList={tabList}
            current={tabCurrent}
            animated={false}
            onClick={index => onTabChange && onTabChange(index)}
          />
        }
      </View>
      <View style={`
        padding-top:${!!!fixed ? 0 : paddingTop}px;
        height: 100vh;
        box-sizing: border-box;
      `}>
        { children }
      </View>
    </View>
  )
}

export default TopBarPage;