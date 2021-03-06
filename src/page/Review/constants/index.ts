import * as React from 'react';
import { Picker } from '@tarojs/components'
import { AtInput,AtTextarea,AtListItem } from 'taro-ui';
import { AtTextareaProps } from 'taro-ui/types/textarea';
import { PickerSelectorProps, PickerDateProps } from '@tarojs/components/types/Picker';
import { AtInputProps } from 'taro-ui/types/input';

type Props = 
  Partial<AtInputProps> |
  Partial<AtTextareaProps> |
  Partial<PickerSelectorProps> |
  Partial<PickerDateProps>

type ComponentType = typeof AtInput | typeof AtTextarea | typeof Picker | React.ComponentType<Props>;

export interface MaintenanceFormItem {
  children?: {
    component: React.ReactNode,
    props?:any
  };
  title: string;
  name: string;
  component?: ComponentType;
  isText?:boolean;
  props?: Props;
}

export const maintenanceFormItem = ({
  pickerData,
  role
}):{[key:string]: MaintenanceFormItem[]} => {
  const basicItems:MaintenanceFormItem[] = [
    {
      title: '基层领导意见',
      name: 'grassrootsLeadershipOpinion',
      isText: role.indexOf('基层单位审批') < 0,
      component: AtInput,
      props: {
        placeholder: '请输入'
      }
    },
    {
      title: '技术设备部副经理意见',
      name: 'deputyTechnologyLeadershipOpinion',
      isText: role.indexOf('设备部副经理审批') < 0,
      component: AtInput,
      props: {
        placeholder: '请输入'
      }
    },
    {
      title: '技术设备部经理意见',
      name: 'technologyLeadershipOpinion',
      isText: role.indexOf('设备部经理审批') < 0,
      component: AtInput,
      props: {
        placeholder: '请输入'
      }
    },
    {
      title: '技术副总意见',
      name: 'vicePresidentLeadershipOpinion',
      isText: role.indexOf('副总审批') < 0,
      component: AtInput,
      props: {
        placeholder: '请输入'
      }
    }
  ] 
  return {
    TemporaryMaintenance: [
      {
        title: '维修单号',
        name: 'overhaulBillNo',
        isText: true
      },
      {
        title: '维修事项标题',
        name: 'title',
        isText: true
      },
      {
        title: '设备损坏、故障及现象',
        name: 'damageDescription',
        isText: role.indexOf('船长审批') < 0,
        component: AtInput,
        props: {
          placeholder: '请输入',
          clear: true
        }
      },
      {
        title: '须协助修理的项目及理由',
        name: 'applyDescription',
        isText: role.indexOf('船长审批') < 0,
        component: AtInput,
        props: {
          placeholder: '请输入',
          clear: true
        }
      },
      {
        title: '已采取的修理方法、措施',
        name: 'temporaryMeasure',
        isText: role.indexOf('船长审批') < 0,
        component: AtInput,
        props: {
          placeholder: '请输入',
          clear: true
        }
      },
      {
        title: '维修方式',
        name: 'repairWay',
        component: Picker,
        isText: role.indexOf('机务员二审') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '维修方式',
            arrow: 'right'
          }
        },
        props: {
          mode: 'selector',
          range: pickerData['repairWay'],
          rangeKey: 'label'
        }
      },
      {
        title: '故障类别',
        name: 'accidentType',
        isText: role.indexOf('船长审批') < 0,
        component: Picker,
        children: {
          component: AtListItem,
          props: {
            title: '故障类别',
            arrow: 'right'
          }
        },
        props: {
          mode: 'selector',
          range: pickerData['accidentType'],
          rangeKey: 'label',
        }
      },
      {
        title: '维修类型',
        name: 'repairType',
        component: Picker,
        isText: role.indexOf('机务员二审') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '维修类型',
            arrow: 'right'
          }
        },
        props: {
          mode: 'selector',
          range: pickerData['repairType'],
          rangeKey: 'label'
        }
      },
      {
        title: '维修金额',
        name: 'repairFee',
        isText: role.indexOf('机务员二审') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      ...basicItems
    ],
    StopMaintenance: [
      {
        title: '维修单号',
        name: 'overhaulBillNo',
        isText: true
      },
      {
        title: '维修事项标题',
        name: 'title',
        isText: true
      },
      {
        title: '预计开始时间',
        name: 'planStartTime',
        component: Picker,
        isText: role.indexOf('船长审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '预计开始时间',
            arrow: 'right'
          }
        },
        props: {
          mode: 'date'
        }
      },
      {
        title: '预计结束天数',
        name: 'planEndDay',
        isText: role.indexOf('船长审批') < 0,
        component: AtInput,
        props: {
          type: 'digit',
          placeholder: '请输入'
        }
      },
      {
        title: '实际开始时间',
        name: 'actualStartTime',
        component: Picker,
        isText: role.indexOf('机务员审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '实际开始时间',
            arrow: 'right'
          }
        },
        props: {
          mode: 'date'
        }
      },
      {
        title: '实际结束时间',
        name: 'actualEndTime',
        component: Picker,
        isText: role.indexOf('机务员审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '实际结束时间',
            arrow: 'right'
          }
        },
        props: {
          mode: 'date'
        }
      },
      {
        title: '维修金额',
        name: 'repairFee',
        isText: role.indexOf('机务员审批') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '保养地点',
        name: 'maintenancePlace',
        component: Picker,
        isText: role.indexOf('机务员审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '保养地点',
            arrow: 'right'
          }
        },
        props: {
          mode: 'selector',
          range: pickerData['maintenancePlace'],
          rangeKey: 'label'
        }
      },
      ...basicItems
    ],
    FactoryMaintenance: [
      {
        title: '维修单号',
        name: 'overhaulBillNo',
        isText: true
      },
      {
        title: '维修事项标题',
        name: 'title',
        isText: true
      },
      {
        title: '预计开始时间',
        name: 'planStartTime',
        component: Picker,
        isText: role.indexOf('船长审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '预计开始时间',
            arrow: 'right'
          }
        },
        props: {
          mode: 'date'
        }
      },
      {
        title: '预计结束天数',
        name: 'planEndDay',
        isText: role.indexOf('船长审批') < 0,
        component: AtInput,
        props: {
          type: 'digit',
          placeholder: '请输入'
        }
      },
      {
        title: '实际开始时间',
        name: 'actualStartTime',
        component: Picker,
        isText: role.indexOf('机务员审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '实际开始时间',
            arrow: 'right'
          }
        },
        props: {
          mode: 'date'
        }
      },
      {
        title: '实际结束时间',
        name: 'actualEndTime',
        component: Picker,
        isText: role.indexOf('机务员审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '实际结束时间',
            arrow: 'right'
          }
        },
        props: {
          mode: 'date'
        }
      },
      {
        title: '维修金额',
        name: 'repairFee',
        isText: role.indexOf('机务员审批') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '保养地点',
        name: 'maintenancePlace',
        component: Picker,
        isText: role.indexOf('机务员审批') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '保养地点',
            arrow: 'right'
          }
        },
        props: {
          mode: 'selector',
          range: pickerData['maintenancePlace'],
          rangeKey: 'label'
        }
      },
      ...basicItems
    ],
    OfficeMaintenance: [
      {
        title: '维修单号',
        name: 'overhaulBillNo',
        isText: true
      },
      {
        title: '维修事项标题',
        name: 'title',
        isText: true
      },
      ...basicItems
    ],
    YearMaintenance: [
      {
        title: '维修单号',
        name: 'overhaulBillNo',
        isText: true
      },
      {
        title: '维修事项标题',
        name: 'title',
        isText: true
      },
      {
        title: '维修时长',
        name: 'maintenanceDay',
        isText: true,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '厂修时长',
        name: 'factoryMaintenanceDay',
        isText: true,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '船舶',
        name: 'vesselName',
        isText: true,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      }
    ]
  }
}

const getMaintenanceValueFromItem = maintenanceFormItem({pickerData:{},role:''});

const maintenanceValueForState = {};

for(let key in getMaintenanceValueFromItem) {
  maintenanceValueForState[key] = getMaintenanceValueFromItem[key].reduce((memo, cur) =>{ memo[cur.name] = '';return memo },{})
}

export { maintenanceValueForState }