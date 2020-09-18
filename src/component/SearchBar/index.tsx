import * as React from 'react';
import { View, Input } from '@tarojs/components';
import classnames from 'classnames';
import classNames from './style/index.module.scss';

interface SearchBarProps {
  onSearch(v:string):void;
  dark?:boolean;
  placeholder?: string;
  fixed?:boolean;
  customStyle?:React.CSSProperties;
  extra?:React.ReactElement;
}

const SearchBar:React.FC<SearchBarProps> = ({
  onSearch,
  placeholder='搜索',
  fixed=false,
  customStyle,
  dark,
  extra
}) => {
  const searchBarClassName = classnames(classNames.searchBar, {
    [`${classNames.fixed}`]: !!fixed
  });
  return (
    <View className={searchBarClassName} style={{...customStyle}}>
      <View className={classNames.searchBarInner} style={{backgroundColor: !!dark ? '#fff': '#f5f5f5'}}>
        <View className='at-icon at-icon-search'/>
        <Input placeholder={placeholder} placeholderStyle='color:#999' className={classNames.searchBarInput} onConfirm={e => onSearch(e.detail.value)}/>
      </View>
      {
        extra && extra
      }
    </View>
  )
}

export default SearchBar;