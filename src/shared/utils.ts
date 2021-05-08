import * as CryptoJS from 'crypto-js';

interface SignInParams {
  username: string;
  password: string;
}

interface EncryptionParams {
  data: SignInParams;
  key: string;
  param: string[];
}

export const hasError = (fieldsError:any):boolean => fieldsError.filter(({ errors }:any) => errors.length).length > 0;

export function encryption<T=SignInParams>(params:EncryptionParams):T {
  let {
    data,
    param,
    key
  } = params;
  const result = JSON.parse(JSON.stringify(data));
  param.forEach((p:string) => {
    const _data:string = result[p];
    const _key:any = CryptoJS.enc.Latin1.parse(key)
    const iv:any = _key
    // 加密
    const encrypted:CryptoJS.WordArray = CryptoJS.AES.encrypt(
      _data,
      _key, 
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      }
    )
    result[p] = encrypted.toString()
  });
  return result
}

/**
 * CryptoJS加密
 */
 export function encrypt(word:any, keyStr?:string):string {
  keyStr = keyStr ? keyStr : 'weihuangweihuang'
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}