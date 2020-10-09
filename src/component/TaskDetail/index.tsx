import * as React from 'react';
import { parse } from 'qs';
import { View, Text } from '@tarojs/components';
import createList from '../../HOC/createList';
import Empty from '../../component/Empty';
import Card from '../../component/Card';
import Fields from '../../component/Fields';
//import classNames from './style/index.module.scss';

const { Group } = Fields;

const rows = [
  {
    title: '汇报人',
    dataIndex: 'reportUser'
  },
  {
    title: '汇报时间',
    dataIndex: 'reportTime'
  },
  {
    title: '维修类型',
    dataIndex: 'repairType'
  },
  {
    title: '设备损坏、故障部位及现象',
    dataIndex: 'damageDescription'
  },
  {
    title: '须协助修理的项目及理由',
    dataIndex: 'applyDescription'
  },
  {
    title: '已采取的修理方法、措施',
    dataIndex: 'temporaryMeasure'
  }
]

const TaskDetail:React.FC<any> = props => {
  const tid = props.tid;
  const query = parse(tid.split('?')[1]);
  const { id, type, page } = query;
  props.setParams({
    reset: {
      id,
      type,
      page
    }
  });
  const ReportFormsDetail = React.useMemo(() => {
    const groups = [
      {
        title: '计入时间',
        key: 'g1',
        rows: [
          {
            title: '日期',
            dataIndex: 'date'
          }
        ]
      },
      {
        title: '主机运行时间(小时)',
        key: 'g2',
        rows: [
          {
            title: '长航',
            dataIndex: 'mainEngineNavigationSumHour'
          },
          {
            title: '油供水',
            dataIndex: 'mainEngineOilSupplyWaterSumHour'
          },
          {
            title: '拖带',
            dataIndex: 'mainEngineAwaitSumHour'
          },
          {
            title: '合计',
            dataIndex: 'mainEngineSumHour'
          }
        ]
      },
      {
        title: '副机运行时间(小时)',
        key: 'g3',
        rows: [
          {
            title: '副机#1',
            dataIndex: 'auxiliaryEngineOneSumHour'
          },
          {
            title: '副机#2',
            dataIndex: 'auxiliaryEngineTwoSumHour'
          },
          {
            title: '消防副机',
            dataIndex: 'fireProtectionAuxiliaryEngineSumHour'
          },
          {
            title: '副机合计',
            dataIndex: 'auxiliaryEngineSumHour'
          }
        ]
      },
      {
        title: '燃料消耗量(Kg)',
        key: 'g4',
        rows: [
          {
            title: '主副机',
            dataIndex: 'mainViceMachineFuelConsumption'
          },
          {
            title: '修理',
            dataIndex: 'repairFuelConsumption'
          },
          {
            title: '其他',
            dataIndex: 'otherFuelConsumption'
          },
          {
            title: '合计',
            dataIndex: 'sumFuelConsumption'
          }
        ]
      },
      {
        title: 'LNG主机运行时间(小时)',
        key: 'g5',
        rows: [
          {
            title: 'LNG长航',
            dataIndex: 'LNGMainEngineNavigationSumHour'
          },
          {
            title: 'LNG油供水',
            dataIndex: 'LNGMainEngineOilSupplyWaterSumHour'
          },
          {
            title: 'LNG拖带',
            dataIndex: 'LNGMainEngineAwaitSumHour'
          },
          {
            title: 'LNG合计',
            dataIndex: 'LNGMainEngineSumHour'
          }
        ]
      },
      {
        title: 'LNG副机运行时间(小时)',
        key: 'g6',
        rows: [
          {
            title: 'LNG副机#1',
            dataIndex: 'LNGAuxiliaryEngineOneSumHour'
          },
          {
            title: 'LNG副机#2',
            dataIndex: 'LNGAuxiliaryEngineTwoSumHour'
          },
          {
            title: '消防副机',
            dataIndex: 'LNGAFireProtectionAuxiliaryEngineSumHour'
          },
          {
            title: '副机合计',
            dataIndex: 'LNGAuxiliaryEngineSumHour'
          }
        ]
      },
      {
        title: 'LNG燃料消耗量(Kg)',
        key: 'g7',
        rows: [
          {
            title: '主副机',
            dataIndex: 'LNGMainViceMachineFuelConsumption'
          },
          {
            title: '修理',
            dataIndex: 'LNGRepairFuelConsumption'
          },
          {
            title: '其他',
            dataIndex: 'LNGOtherFuelConsumption'
          },
          {
            title: '合计',
            dataIndex: 'LNGSumFuelConsumption'
          }
        ]
      },
      {
        title: '计时钟读数(小时)',
        key: 'g8',
        rows: [
          {
            title: '左机上月',
            dataIndex: 'lastMonthLeftTimeClock'
          },
          {
            title: '左机本月',
            dataIndex: 'monthLeftTimeClock'
          },
          {
            title: '左机实际运行',
            dataIndex: 'actualLeftTimeClock'
          },
          {
            title: '右机上月',
            dataIndex: 'lastMonthRightTimeClock'
          },
          {
            title: '右机本月',
            dataIndex: 'monthRightTimeClock'
          },
          {
            title: '右机实际运行',
            dataIndex: 'actualRightTimeClock'
          }
        ]
      },
      {
        title: '耗电度',
        key: 'g9',
        rows: [
          {
            title: '上月读数',
            dataIndex: 'lastMonthElectricity'
          },
          {
            title: '本月读数',
            dataIndex: 'monthElectricity'
          },
          {
            title: '本月电能消耗',
            dataIndex: 'monthPowerConsumption'
          }
        ]
      },
      {
        title: '流量计读数',
        key: 'g10',
        rows: [
          {
            title: '上月流量',
            dataIndex: 'lastMonthQuantityOfFlow'
          },
          {
            title: '本月流量',
            dataIndex: 'monthQuantityOfFlow'
          },
          {
            title: '实际流量',
            dataIndex: 'actualFlow'
          }
        ]
      },
      {
        title: 'LNG计时钟读数(小时)',
        key: 'g11',
        rows: [
          {
            title: '左机上月',
            dataIndex: 'LNGLastMonthLeftTimeClock'
          },
          {
            title: '左机本月',
            dataIndex: 'LNGMonthLeftTimeClock'
          },
          {
            title: '左机实际运行',
            dataIndex: 'LNGActualLeftTimeClock'
          },
          {
            title: '右机上月',
            dataIndex: 'LNGLastMonthRightTimeClock'
          },
          {
            title: '右机本月',
            dataIndex: 'LNGMonthRightTimeClock'
          },
          {
            title: '右机实际运行',
            dataIndex: 'LNGActualRightTimeClock'
          }
        ]
      },
      {
        title: 'LNG流量计读数',
        key: 'g12',
        rows: [
          {
            title: '上月流量',
            dataIndex: 'LNGLastMonthQuantityOfFlow'
          },
          {
            title: '本月流量',
            dataIndex: 'LNGMonthQuantityOfFlow'
          },
          {
            title: '实际流量',
            dataIndex: 'LNGActualFlow'
          }
        ]
      },
      {
        title: '柴油柜实际结存数(Kg)',
        key: 'g13',
        rows: [
          {
            title: '柴油柜#1',
            dataIndex: 'dieselSurplusOne'
          },
          {
            title: '柴油柜#2',
            dataIndex: 'dieselSurplusTow'
          },
          {
            title: '柴油柜#3',
            dataIndex: 'dieselSurplusThree'
          },
          {
            title: '柴油柜#4',
            dataIndex: 'dieselSurplusFour'
          },
          {
            title: '柴油柜#5',
            dataIndex: 'dieselSurplusFive'
          },
          {
            title: '接岸电次数',
            dataIndex: 'shorePowerNumber'
          }
        ]
      },
      {
        title: '本月燃润料收发存数(Kg)',
        key: 'g14',
        rows: [
          {
            title: '轻柴油上月结存',
            dataIndex: 'lastMonthLightDieselOil'
          },
          {
            title: '轻柴油上月结存',
            dataIndex: 'monthLightDieselOil'
          },
          {
            title: '轻柴油本月消耗',
            dataIndex: 'lightDieselFuelConsumption'
          },
          {
            title: '轻柴油年度盘存',
            dataIndex: 'annualInventoryOfLightDieselOil'
          },
          {
            title: '轻柴油结存',
            dataIndex: 'residualLightDieselOil'
          },
          {
            title: '润滑油上月结存',
            dataIndex: 'lastMonthLubricatingOil'
          },
          {
            title: '润滑油本月领料',
            dataIndex: 'monthLubricatingOil'
          },
          {
            title: '润滑油本月消耗',
            dataIndex: 'lubeOilConsumption'
          },
          {
            title: '润滑油年度盘存',
            dataIndex: 'annualInventoryOfLubricants'
          },
          {
            title: '润滑油结存',
            dataIndex: 'residualLubeOil'
          },
          {
            title: 'LNG上月结存',
            dataIndex: 'lastMonthLNG'
          },
          {
            title: 'LNG本月领料',
            dataIndex: 'monthLNG'
          },
          {
            title: 'LNG本月消耗',
            dataIndex: 'LNGFuelConsumption'
          },
          {
            title: 'LNG年度盘存',
            dataIndex: 'annualInventoryOfLNG'
          },
          {
            title: 'LNG结存',
            dataIndex: 'residualLNG'
          }
        ]
      },
      {
        title: '电卡(主)',
        key: 'g15',
        rows: [
          {
            title: '上月结存',
            dataIndex: 'mainLastMonthResidualElectricity'
          },
          {
            title: '本月领料',
            dataIndex: 'mainMonthResidualElectricity'
          },
          {
            title: '本月消耗',
            dataIndex: 'mainMonthlyConsumption'
          },
          {
            title: '盘存',
            dataIndex: 'mainAnnualInventoryOfElectricity'
          },
          {
            title: '结存',
            dataIndex: 'mainResidualElectricity'
          }
        ]
      },
      {
        title: '电卡(副)',
        key: 'g16',
        rows: [
          {
            title: '上月结存',
            dataIndex: 'auxiliaryLastMonthResidualElectricity'
          },
          {
            title: '本月领料',
            dataIndex: 'auxiliaryMonthResidualElectricity'
          },
          {
            title: '本月消耗',
            dataIndex: 'auxiliaryMonthlyConsumption'
          },
          {
            title: '盘存',
            dataIndex: 'auxiliaryAnnualInventoryOfElectricity'
          },
          {
            title: '结存',
            dataIndex: 'auxiliaryResidualElectricity'
          }
        ]
      }
    ];
    return groups.map(item => <Group data={props.list} group={item} key={item.key} labelWidth={96}/>);
  }, [props.list]);
  const TemporaryMaintenanceDetail = React.useMemo(() => {
    return (
      <View style={`
        margin: 8px; 
        background-color: #fff; 
        padding: 8px; 
        border-radius: 6px;
        box-shadow: 0 0 6PX rgba(0,0,0,0.04);
        `
      }>
        <Fields
          data={props.list}
          rows={rows}
        />
      </View>
    )
  }, [props.list])
  const compMap = React.useMemo<{[key:string]:any}>(() => ({
    ReportForms: ReportFormsDetail,
    TemporaryMaintenance: TemporaryMaintenanceDetail
  }), [ReportFormsDetail]);
  return (
    Array.isArray(props.list) ? 
    props.list.length ? 
    props.list.map((item, index) => {
        const TopBarContent = (
          <React.Fragment>
            <Text className='icon icon-guige' style='font-size: 16px; margin-right:2px'/>
            <Text>{item.specification} / 申请{item.quantity}{item.measureUnit} {type === 'PurchasingApproval' && ` / 审批${item.applyQuantity}${item.measureUnit}`}</Text>
          </React.Fragment>
        )
        return (
          <Card 
            topBar={TopBarContent}
            key={item.id}
          >
            <Card.Header
              title={item.materialName}
              subTitle={item.materialCode}
              onHeaderClick={() => props.onEdit && props.onEdit(item, index)}
              extra={
                <View style='line-height:1;text-align:right'>
                  <View style='color: #faad14;font-size: 16px;'>{item.budgetAmount}元</View>
                  <View style='color: #999; font-size: 12px;margin-top: 6px'>预计费用</View>
                </View>
              }
            />
            <Card.Body>
              <Fields
                data={item}
                labelWidth={48}
                rows={[
                  {
                    title: '用途',
                    dataIndex: 'usage'
                  },
                  {
                    title: '备注',
                    dataIndex: 'remark'
                  }
                ]}
              />
            </Card.Body>
          </Card>
        )
      }):
    <Empty/> : props.list.id ? compMap[type as string] : <Empty/>
  )
}

export default createList('todoDetail')(TaskDetail);