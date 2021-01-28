import * as React from 'react';
import { View,Text } from '@tarojs/components';
import { maintenanceFormItem } from '../constants';
import { AtList, AtListItem } from 'taro-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../../../store';

interface IMaintenanceProps {
  identify: string;
  updater: React.Dispatch<any>;
  formValue: any;
  role: string;
  detail: boolean;
} 


const Maintenance:React.FC<IMaintenanceProps> = ({
  identify,
  updater,
  formValue,
  role,
  detail
}) => {
  const { common } = useDispatch<RematchDispatch<Models>>();
  const { accidentType, repairType, repairWay,maintenancePlace } = useSelector((state: RootState) => state.common);

  React.useEffect(() => {
    common.fetchDicForRepair()
  },[]);
  return (
    <View className='mt12'>
      <AtList>
        {
          maintenanceFormItem({
            role,
            pickerData:{
              accidentType, 
              repairType, 
              repairWay,
              maintenancePlace
            }
          })[identify].map(item => {
            const {
              isText = false, 
              component:Component,
              title,
              name,
              props,
              children
            } = item;
            return (
              (isText || detail) ?
              <AtListItem key={name} title={title} extraText={String(formValue[name] || '暂无')}></AtListItem> : 
              Component && 
                //@ts-ignore
                <Component 
                  {...props}
                  title={title} 
                  name={name} 
                  key={name} 
                  value={formValue[name]}
                  onChange={value => {
                    updater(prev => {
                      return {
                        ...prev,
                        [identify]: {
                          ...prev[identify],
                          [name]: typeof value === 'string' ? 
                            value :
                            //@ts-ignore
                            props.range ? props.range[value.detail.value].label : value.detail.value
                        }
                      }
                    });
                  }}
                >
                  { //@ts-ignore 
                    children?.component && React.cloneElement(<children.component/>, {
                      ...children?.props,
                      extraText:String(formValue[name]) || '请选择'
                    }) 
                  }
                </Component>  
            )
          })
        }
      </AtList>
    </View>
  )
}

export default Maintenance;