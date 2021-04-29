import * as React from 'react';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import TopBarPage from '../../layout/TopBarPage';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../../store';
import classNames from './index.module.scss';

const FileList:React.FC<any> = props => {
  const tid = props.tid;
  const { ids } = parse(tid.split('?')[1]);
  const { common } = useDispatch<RematchDispatch<Models>>();
  const { fileList } = useSelector((state: RootState) => state.common);
  React.useEffect(() => {
    if(ids) {
      common.fetchFileList((ids as string).split(','))
    }
  }, [ids]);
  return (
    <TopBarPage 
      title='附件'
      fixed
    >
      <View className='cardContainer' style='height: 100%'>
        {
          fileList.length ? 
          fileList.map(item => (
            <View className={classNames.fileContainer} key={item.id}>
              <a href={item.url}>
                <Text className={`icon icon-${/jpg|png|gif|jpeg/.test(item.type) ? 'jpg' : 'weizhiwendang'} mr8`} style='font-size: 28px;color:#faad14'/>
                <View>
                  <Text className={classNames.fileName}>{item.original}</Text>
                  <View>
                    <Text className={classNames.extra}>{item.createUser}</Text>
                    <Text className='ml4 mr4' style='color: rgba(0,0,0,0.4);'>上传于</Text>
                    <Text className={classNames.extra}>{item.createTime}</Text>
                  </View>
                </View>
              </a>
            </View> 
          )): null
        }
      </View>
    </TopBarPage>
  )
}

export default FileList;