import * as React from 'react';
import * as Taro from '@tarojs/taro-h5';
import { Picker } from '@tarojs/components'
import { AtInput,AtTextarea,AtListItem,AtBadge } from 'taro-ui';
import { AtTextareaProps } from 'taro-ui/types/textarea';
import { PickerSelectorProps, PickerDateProps } from '@tarojs/components/types/Picker';
import { AtInputProps } from 'taro-ui/types/input';
import { AtListItemProps } from 'taro-ui/types/list';

type Props = 
  Partial<AtInputProps> |
  Partial<AtTextareaProps> |
  Partial<PickerSelectorProps> |
  Partial<PickerDateProps> |
  Partial<AtListItemProps>

type ComponentType = typeof AtInput | typeof AtTextarea | typeof Picker | React.ComponentType<Props> | typeof AtListItem;

export interface MaintenanceFormItem {
  children?: {
    component: React.ReactNode,
    props?:any
  };
  title: string;
  name: string;
  required?:boolean;
  component?: ComponentType;
  isText?:boolean;
  props?: Props;
  textRender?(v, data:any):any;
  onItemClick?(v, data:any):void;
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
        title: '附件',
        name: 'attachmentUrl',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => (Array.isArray(v) && v.length) ? `查看(${v.length})` : '暂无',
        onItemClick: (v,d) => (
          (Array.isArray(v) && v.length) ? Taro.navigateTo({
            url: `/page/FileList/index?ids=${(Array.isArray(v) && v.length) ? v.join(',') : ''}`
          }) : null
        )
      },
      /* {
        title: '船舶工单',
        name: 'validate',
        isText: true,
        props: {
          arrow: 'right',
          className: 'warning-item'
        } as AtListItemProps,
        textRender:(v, d) => '请在电脑端操作'
      }, */
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
        title: '维修方向',
        name: 'repairWay',
        component: Picker,
        isText: role.indexOf('机务员二审') < 0 && 
        role.indexOf('设备部副经理二审') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '维修方向',
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('船长审批') < 0 && 
        role.indexOf('机务员审批') < 0 &&
        role.indexOf('机务员二审') < 0 &&
        role.indexOf('机务员三审') < 0,
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员二审') < 0 && 
        role.indexOf('机务员审批') < 0 &&
        role.indexOf('机务员三审') < 0,
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员二审') < 0 && 
        role.indexOf('机务员审批') < 0 &&
        role.indexOf('机务员三审') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
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
        title: '设备部意见',
        name: 'technologyLeadershipOpinion',
        isText: role.indexOf('设备部经理审批') < 0 && 
        role.indexOf('机务员审批') < 0 &&
        role.indexOf('设备部副经理审批') < 0,
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
        title: '附件',
        name: 'attachmentUrl',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => (Array.isArray(v) && v.length) ? `查看(${v.length})` : '暂无',
        onItemClick: (v,d) => (
          (Array.isArray(v) && v.length) ? Taro.navigateTo({
            url: `/page/FileList/index?ids=${(Array.isArray(v) && v.length) ? v.join(',') : ''}`
          }) : null
        )
      },
      /* {
        title: '船舶工单',
        name: 'validate',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => '请在电脑端操作'
      }, */
      {
        title: '预计开始时间',
        name: 'planStartTime',
        component: Picker,
        isText: true,
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
        isText: true,
        component: AtInput,
        props: {
          type: 'digit',
          placeholder: '请输入'
        }
      },
      {
        title: '实际开始时间',
        name: 'actualStartTime',
        required: role.indexOf('机务员三审') > -1,
        component: Picker,
        isText: role.indexOf('机务员审批') < 0 && role.indexOf('机务员二审') < 0 && role.indexOf('机务员三审') < 0,
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
        required: role.indexOf('机务员三审') > -1,
        component: Picker,
        isText: role.indexOf('机务员审批') < 0 && role.indexOf('机务员二审') < 0 && role.indexOf('机务员三审') < 0,
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员审批') < 0 && role.indexOf('机务员二审') < 0 && role.indexOf('机务员三审') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '保养地点',
        name: 'maintenancePlace',
        required: role.indexOf('机务员三审') > -1,
        component: Picker,
        isText: role.indexOf('机务员审批') < 0 && role.indexOf('机务员二审') < 0 && role.indexOf('机务员三审') < 0,
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
        title: '附件',
        name: 'attachmentUrl',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => (Array.isArray(v) && v.length) ? `查看(${v.length})` : '暂无',
        onItemClick: (v,d) => (
          (Array.isArray(v) && v.length) ? Taro.navigateTo({
            url: `/page/FileList/index?ids=${(Array.isArray(v) && v.length) ? v.join(',') : ''}`
          }) : null
        )
      },
      /* {
        title: '船舶工单',
        name: 'validate',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => '请在电脑端操作'
      }, */
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员审批') < 0 && 
        role.indexOf('机务员二审') < 0 &&
        role.indexOf('机务员三审') < 0,
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员审批') < 0 && 
        role.indexOf('机务员二审') < 0 &&
        role.indexOf('机务员三审') < 0,
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
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员审批') < 0 && 
        role.indexOf('机务员二审') < 0 &&
        role.indexOf('机务员三审') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '维修天数',
        name: 'repairDay',
        required: role.indexOf('机务员三审') > -1,
        isText: role.indexOf('机务员审批') < 0 && 
        role.indexOf('机务员二审') < 0 &&
        role.indexOf('机务员三审') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '维修船厂',
        name: 'maintenancePlace',
        required: role.indexOf('机务员三审') > -1,
        component: Picker,
        isText: role.indexOf('机务员审批') < 0 && 
        role.indexOf('机务员二审') < 0 &&
        role.indexOf('机务员三审') < 0,
        children: {
          component: AtListItem,
          props: {
            title: '维修船厂',
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
      {
        title: '附件',
        name: 'attachmentUrl',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => (Array.isArray(v) && v.length) ? `查看(${v.length})` : '暂无',
        onItemClick: (v,d) => (
          (Array.isArray(v) && v.length) ? Taro.navigateTo({
            url: `/page/FileList/index?ids=${(Array.isArray(v) && v.length) ? v.join(',') : ''}`
          }) : null
        )
      },
      {
        title: '维修金额',
        name: 'repairFee',
        required: role.indexOf('陆域维修管理员审批') > -1,
        isText: role.indexOf('陆域维修管理员审批') < 0,
        component: AtInput,
        props: {
          type: 'number',
          placeholder: '请输入'
        }
      },
      {
        title: '部门意见',
        name: 'deptLeadershipOpinion',
        isText: role.indexOf('基层单位审批') < 0 && role.indexOf('发起人部门经理审批') < 0,
        component: AtInput,
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '办公室意见',
        name: 'officalLeadershipOpinion',
        isText: role.indexOf('办公室审批') < 0,
        component: AtInput,
        props: {
          placeholder: '请输入'
        }
      },
      {
        title: '技术设备部意见',
        name: 'deputyTechnologyLeadershipOpinion',
        isText: role.indexOf('设备部副经理审批') < 0 && role.indexOf('设备部经理审批') < 0,
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
        title: '附件',
        name: 'attachmentUrl',
        isText: true,
        props: {
          arrow: 'right'
        } as AtListItemProps,
        textRender:(v, d) => (Array.isArray(v) && v.length) ? `查看(${v.length})` : '暂无',
        onItemClick: (v,d) => (
          (Array.isArray(v) && v.length) ? Taro.navigateTo({
            url: `/page/FileList/index?ids=${(Array.isArray(v) && v.length) ? v.join(',') : ''}`
          }) : null
        )
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
          placeholder: '请输入'
        }
      }
    ]
  }
}

const getMaintenanceValueFromItem = maintenanceFormItem({pickerData:{},role:''});

const maintenanceValueForState:any = {};

for(let key in getMaintenanceValueFromItem) {
  maintenanceValueForState[key] = getMaintenanceValueFromItem[key].reduce((memo, cur) =>{ memo[cur.name] = '';return memo },{})
}

export { maintenanceValueForState }