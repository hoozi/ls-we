import * as React from 'react';
import { View, Input } from '@tarojs/components';
import { AtInput, AtForm, AtFloatLayout,AtRadio,AtButton } from 'taro-ui';
import { parse } from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { RematchDispatch, Models } from '@rematch/core';
import debounce from 'lodash/debounce'
import { RootState } from '../../store';
import TopBarPage from '../../layout/TopBarPage';
import classNames from './style/index.module.scss';

const EditTodo:React.FC<{tid: string}> = ({
  tid
}) => {
  const { id='', receivePlanBillId='' } = parse(tid.split('?')[1]);
  const { common, review } = useDispatch<RematchDispatch<Models>>();
  const { filteredMaterial } = useSelector((state: RootState) => state.common);
  const { records } = useSelector((state: RootState) => state.review);
  const [ selectOpened, setSelectOpened ] = React.useState<boolean>(false);
  const [ selectedValue, setSelectValue ] = React.useState<string>('');
  const [ formValue, setFormValue ] = React.useState<any>({
    materialName: '',
    materialShortName: '',
    materialCode: '',
    materialPartNumber: '',
    measureUnit: '',
    specification: '',
    inWarehouseQuantity: '',
    quantity: '',
    captainAuditCount: '',
    flightAuditCount: '',
    materialId: ''
  })
  const formRef = React.useRef<any>();

  React.useEffect(() => {
    common.fetchMaterial();
  }, []);

  React.useEffect(() => {
    if(id) {
      setFormValue(f => ({...f, ...records.find(item => item.id === Number(id))}))
    }
  }, [id])

  const handleFieldChange = React.useCallback((name, value) => {
    setFormValue((f) => ({...f, [name]:value}))
  }, [formValue])

  const formItem = React.useMemo(() => {
    return [
      {
        name: 'materialName',
        title: '物资',
        props: {
          required: true,
          placeholder: '请选择',
          children: <div className={classNames.selectBtn} onClick={() => setSelectOpened(true)}>选择</div>
        }
      },
      {
        title: '物资首拼',
        name: 'materialShortName',
        props: {
          editable: false,
          placeholder: '由物资自动带出'
        }
      },
      {
        title: '物资编码',
        name: 'materialCode',
        props: {
          editable: false,
          placeholder: '由物资自动带出'
        }
      },
      {
        title: '物资部件号',
        name: 'materialPartNumber',
        props: {
          editable: false,
          placeholder: '由物资自动带出'
        }
      },
      {
        title: '计量单位',
        name: 'measureUnit',
        props: {
          editable: false,
          placeholder: '由物资自动带出'
        }
      },
      {
        title: '规格',
        name: 'specification',
        props: {
          editable: false,
          placeholder: '由物资自动带出'
        }
      },
      {
        title: '在库数量',
        name: 'inWarehouseQuantity',
        props: {
          editable: false,
          placeholder: '由物资自动带出'
        }
      },
      {
        title: '申请数量',
        name: 'quantity',
        props: {
          required: true,
          placeholder: '请输入',
          type: 'number' as 'number'
        }
      },
      {
        title: '船长、部门长审批数量',
        name: 'captainAuditCount',
        props: {
          placeholder: '请输入',
          type: 'number' as 'number'
        }
      },
      {
        title: '机务员、办公室主任审批数量',
        name: 'flightAuditCount',
        props: {
          placeholder: '请输入',
          type: 'number' as 'number'
        }
      }
    ]
  }, [formValue])

  return (
    <TopBarPage
      fixed
      title={id ? '编辑' : '新增'}
    >
      <AtForm 
        ref={formRef}
        onSubmit={e => {
          review.postTodo({
            ...formValue,
            receivePlanBillId,
            outWarehouseStatus: '未出库'
          })
        }}
      >
        {
          formItem.map(item => (
            <AtInput
              key={item.name}
              title={item.title}
              name={item.name}
              value={formValue[item.name]}
              onChange={value => handleFieldChange(item.name, value)}
              {...item.props}
            />
          ))
        }
        <AtButton className={classNames.postBtn} formType='submit' type='primary'>提交</AtButton>
      </AtForm>
        <AtFloatLayout isOpened={selectOpened} title='选择物资' onClose={() => setSelectOpened(false)}>
          <View className={classNames.searchBar}>
            <View className={classNames.searchBarInner}>
              <View className='at-icon at-icon-search'/>
              <Input 
                className={classNames.searchBarInput} 
                placeholderStyle='color: #999'
                placeholder='物资名称/代码' 
                onInput={e => debounce(() => common.filter(e.detail.value), 200)()}//common.filter(e.detail.value)}
              />
            </View>
          </View>
          <View>
            <AtRadio
              options={filteredMaterial.map(item => {
                return {
                  label: item.name,
                  desc: item.code,
                  value: item.code
                }
              })}
              value={selectedValue}
              onClick={v => {
                const {
                  name: materialName,
                  partNumber: materialPartNumber,
                  shortName: materialShortName,
                  code: materialCode,
                  measureUnit,
                  specification,
                  id: materialId
                } = filteredMaterial.find(item => item.code === v);
                console.log(materialId);
                review.fetchCountInWarehouse({
                  id: materialId,
                  callback: inWarehouseQuantity=> {
                    setFormValue(f => ({
                      ...f, 
                      materialId,
                      inWarehouseQuantity,
                      materialName,
                      materialShortName,
                      materialCode,
                      measureUnit,
                      materialPartNumber,
                      specification
                    }));
                    setSelectOpened(false);
                  }
                })
                //console.log(material)
                /* materialName: '',
    materialShortName: '',
    materialCode: '',
    materialPartNumber: '',
    measureUnit: '',
    specification: '',
    inWarehouseQuantity: '',
    quantity: '',
    captainAuditCount: '',
    flightAuditCount: '',
    materialId: '' */
                /* setFormValue(f => ({
                  ...f, 
                  
                })) */
                setSelectValue(v)
              }}
            />
          </View>
        </AtFloatLayout>
    </TopBarPage>
  )
}

export default EditTodo;