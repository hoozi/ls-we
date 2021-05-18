import * as React from 'react';
import { View,Text } from '@tarojs/components';
import { MaintenanceFormItem, maintenanceFormItem } from '../constants';
import { AtList, AtListItem } from 'taro-ui';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import { RootState } from '../../../store';
import { AtListItemProps } from 'taro-ui/types/list';

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
  const [ maintenanceFormItems, setMaintenanceFormItems ] = React.useState<MaintenanceFormItem[]>([])
  React.useEffect(() => {
    common.fetchDicForRepair()
  },[]);
  React.useEffect(() => {
    setMaintenanceFormItems(maintenanceFormItem({
      role,
      pickerData:{
        accidentType, 
        repairType, 
        repairWay,
        maintenancePlace
      }
    })[identify])
  }, [
    identify, 
    JSON.stringify(maintenanceFormItems),
    accidentType, 
    repairType, 
    repairWay,
    maintenancePlace
  ]);
  return (
    <View className='mt12'>
      <AtList>
        {
          maintenanceFormItems.length ? maintenanceFormItems.map(item => {
            const {
              isText = false, 
              component:Component,
              title,
              name,
              props,
              children,
              textRender,
              onItemClick
            } = item;
            return (
              (isText || detail) ?
              <AtListItem 
                key={name} 
                title={title} 
                className={item.required === true ? 'list-required' : ''}
                extraText={textRender ? textRender(formValue[name], formValue) : String(formValue[name] || '-')} 
                onClick={() => onItemClick && onItemClick(formValue[name], formValue)}
                {...(props as AtListItemProps)}
              ></AtListItem> : 
              Component && 
                //@ts-ignore
                <Component 
                  {...props}
                  title={title} 
                  name={name} 
                  key={name} 
                  className={item.required === true ? 'list-required' : ''}
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
                      extraText:String(formValue[name] || '请选择')
                    }) 
                  }
                </Component>  
            )
          }):null
        }
      </AtList>
    </View>
  )
}

export default Maintenance;