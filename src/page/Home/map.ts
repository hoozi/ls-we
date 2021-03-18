import { color } from '../../constants';

export default [
  {
    iconInfo: {
      prefixClass: 'icon',
      value: 'shujubaocunbeifen',
      color: color.brandColor,
      size: 24
    },
    value: '物资审批',
    url: '/page/Review/index'
  },
  {
    iconInfo: {
      prefixClass: 'icon',
      value: 'daily',
      color: color.warningColor,
      size: 24
    },
    value: '审批日志',
    url: '/page/History/index'
  },
  {
    iconInfo: {
      prefixClass: 'icon',
      value: 'daily',
      color: color.warningColor,
      size: 24
    },
    value: '领用确认',
    url: '/page/Requisition/index'
  }
]