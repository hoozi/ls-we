import * as React from 'react';
import { View, Input, Text } from '@tarojs/components';
import { InputProps } from '@tarojs/components/types/Input';
import classNames from '../style/index.module.scss';

interface PasswordProps extends InputProps {
  onInput?(e:any):void;
  showIcon?:boolean;
}

export default ({
  onInput,
  showIcon=true,
  ...restProps
}: PasswordProps) => {
  const [ isPassword, toggleInput ] = React.useState<boolean>(true);
  const handleChangeInputType = React.useCallback(() => {
    toggleInput(!isPassword);
  },[ isPassword ]);
  const handleInputChange = React.useCallback((e) => {
    onInput && onInput(e);
  },[]);
  return (
    <React.Fragment>
      <Input onInput={handleInputChange} {...restProps} password={isPassword} className={classNames.textInput}/>
      {
        showIcon ? 
        <View className={classNames.inputExtra} onClick={handleChangeInputType}>
          <Text className={`icon icon-${isPassword ? 'xianshikejian' : 'yincangbukejian'}`}/>
        </View> : null
      }
      
    </React.Fragment>
  )
}