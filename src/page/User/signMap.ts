import { InputProps } from '@tarojs/components/types/Input'; 
import { InternalFieldProps } from 'rc-field-form/es/Field';

interface SignItem {
  name: string;
  title: string;
  props: InputProps;
  options?: InternalFieldProps;
}

const baseOptions: InternalFieldProps = {
  validateTrigger: 'onInput',
  trigger: 'onInput'
}

export const signInList:SignItem[] = [
  {
    name: 'username',
    title: '账号',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入账号',
          validateTrigger: 'onInput'
        }
      ]
    }
  },
  {
    name: 'password',
    title: '密码',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入密码',
          validateTrigger: 'onInput'
        }
      ]
    }
  }
]

export const signUpList:SignItem[] = [
  {
    name: 'username',
    title: '用户名',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入用户名',
          validateTrigger: 'onInput'
        }
      ]
    }
  },
  {
    name: 'password',
    title: '密码',
    props: {
      placeholder: '请输入(为空则由系统分配)',
      placeholderStyle: 'color: #999'
    },
    options: {
      ...baseOptions
    }
  },
  {
    name: 'licence',
    title: '车牌号',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入车牌号',
          validateTrigger: 'onInput'
        }
      ]
    }
  },
  {
    name: 'driverName',
    title: '姓名',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入姓名',
          validateTrigger: 'onInput'
        }
      ]
    }
  },
  {
    name: 'contact',
    title: '电话',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入联系电话',
          validateTrigger: 'onInput'
        },
        {
          pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
          message: '手机格式不正确',
          validateTrigger: 'onInput'
        }
      ]
    }
  },
  {
    name: 'portNo',
    title: '港编号',
    props: {
      placeholder: '请输入',
      placeholderStyle: 'color:#999'
    },
    options: {
      ...baseOptions,
      rules: [
        {
          required: true,
          message: '请输入港编号',
          validateTrigger: 'onInput'
        }
      ]
    }
  }
]