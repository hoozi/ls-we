import * as React from 'react';
import * as Taro from '@tarojs/taro';
import { View, Text, Input, Image } from '@tarojs/components';
import Form, { useForm, Field } from 'rc-field-form';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton } from 'taro-ui';
import { hasError } from '../../../shared/utils';
import { signUpList } from '../signMap';
import Password from './Password';
import classNames from '../style/index.module.scss';

const SignUp:React.FC<any> = props => {
  const [ src, setSrc ] = React.useState<string>('');
  const [ form ] = useForm();
  const { user } = useDispatch<RematchDispatch<Models>>();
  const { validateFields, isFieldsTouched, getFieldsError, resetFields, getFieldError, isFieldTouched } = form;
  const handleSignIn = React.useCallback(async () => {
    try {
      const values = await validateFields();
      user.signUp({
        ...values,
        filePath: src,
        callback() {
          setSrc('');
          resetFields();
        }
      });
    } catch(e) {
      console.log(e)
    }
  }, [src]);
  const handleChooseImage = React.useCallback(async () => {
    try {
      const res = await Taro.chooseImage({count: 1,sizeType:['compressed']});
      setSrc(res.tempFilePaths[0])
    } catch(e) {
      console.log(e)
    }
  }, [setSrc]);
  return (
    <Form
      form={form}
      component={false}
    >
      <View className={`${classNames.signForm} ${classNames.signUpForm}`}>
        {
          signUpList.map(item => (
            <View className={classNames.signItemContainer} key={item.name}>
              <View className={classNames.signItem}>
                <Text style='width: 72px'>{item.title}</Text>
                <View className={classNames.signInputContainer}>
                  <Field key={item.name} getValueFromEvent={e => e.detail.value} name={item.name} {...item.options}>
                    {
                      item.name === 'password' ?
                      <Password {...item.props}/> : 
                      <Input {...item.props} className={classNames.textInput}/>
                    }
                  </Field>
                </View>
              </View>
              <Field shouldUpdate>
              { 
                () => (             
                  isFieldTouched(item.name) && getFieldError(item.name).length ? 
                  <Text className={classNames.error}>{getFieldError(item.name)}</Text> : 
                  null
                )
              }
              </Field>
            </View>
          ))
        }
        <View className={classNames.imageContainer} onClick={handleChooseImage}>
          {
            src ? 
            <Image src={src} mode='heightFix' style='height: 128px; display:block'/> :
            <View>
              <Text className='at-icon at-icon-image'/>
              <Text>添加证件照片</Text>
            </View>
          }
        </View>
        <Field shouldUpdate>
          {
            () => (
              <AtButton 
                disabled={ 
                  !isFieldsTouched(true) ||
                  hasError(getFieldsError()) ||
                  !src
                } 
                type='primary' 
                className={classNames.signButton}
                onClick={handleSignIn}
              >注 册</AtButton>
            )
          }
        </Field>
        
      </View>
    </Form>
  )
}

export default SignUp;