import * as React from 'react';
import { ScrollView } from '@tarojs/components';

interface ListViewProps {
  onReachBottom?():void;
  onPullDownRefresh?():void;
}

const ListView:React.FC<React.PropsWithChildren<ListViewProps>> = ({
  onReachBottom,
  onPullDownRefresh,
  children
}) => {
  const dom = React.useRef<any>();
  const draging = React.useRef<boolean>(false);
  const pull = React.useRef<boolean>(false);
  const initialY = React.useRef<number>(0);
  const handleTouchStart = (evt: TouchEvent) => {
    const touchList = evt.touches;
    draging.current = true;
    initialY.current = touchList[0].clientY
  }
  const handleTouchMove = (evt: TouchEvent) => {
    const y = evt.touches[0].clientY;
    const currentDis = y-initialY.current;
    if( currentDis > 60 && dom.current.scrollTop === 0) {
      pull.current = true;
    }
  }
  const handleTouchEnd = () => {
    draging.current = false;
    initialY.current = 0;
    if(pull.current) {
      pull.current = false;
      onPullDownRefresh && onPullDownRefresh();
    }
  }
  React.useLayoutEffect(() => {
    const node = dom.current;
    node?.addEventListener('touchstart', handleTouchStart);
    node?.addEventListener('touchmove', handleTouchMove);
    node?.addEventListener('touchend', handleTouchEnd);
    node?.addEventListener('touchcancel', handleTouchEnd);
  }, [dom]);
  return (
    <ScrollView
      ref={dom}
      style='height: 100%'
      scrollY 
      onScrollToLower={() => onReachBottom && onReachBottom()}
    >
      { children }
    </ScrollView>
  )
}

export default ListView;