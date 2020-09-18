import * as React from 'react';
import { View, Text, Input } from '@tarojs/components';
import Form, { useForm, Field } from 'rc-field-form';
import { useDispatch } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { AtButton } from 'taro-ui';
import { hasError } from '../../../shared/utils';
import { signInList } from '../signMap';
import Password from './Password';
import classNames from '../style/index.module.scss';

//<Field key={item.name} name={item.name} {...item.options}>
const SignIn:React.FC<any> = props => {
  const [ form ] = useForm();
  const { user } = useDispatch<RematchDispatch<Models>>();
  const { validateFields, isFieldsTouched, getFieldsError } = form;
  const handleSignIn = React.useCallback(async () => {
    try {
      const values = await validateFields();
      user.signIn(values);
    } catch(e) {
      console.log(e)
    }
  }, []);
  return (
    <Form
      form={form}
      component={false}
    >
      <View className={classNames.signForm}>
        {
          signInList.map(item => (
            <View className={classNames.signItem} key={item.name}>
              <Text style='width: 64px'>{item.title}</Text>
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
          ))
        }
        <Field shouldUpdate>
          {
            () => (
              <AtButton 
                disabled={ 
                  !isFieldsTouched(true) ||
                  hasError(getFieldsError())
                } 
                type='primary' 
                className={classNames.signButton}
                onClick={handleSignIn}
                openType='getUserInfo'
              >登 录</AtButton>
            )
          }
        </Field>
        
      </View>
    </Form>
  )
}

export default SignIn;