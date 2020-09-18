import * as React from 'react';
import { View } from '@tarojs/components';
import { ViewProps } from '@tarojs/components/types/View';

interface TouchHighlightProps extends ViewProps {
  underlayColor: string;
  style?:React.CSSProperties;
  onClick?(e:any):void
}

type TouchHighlightType = React.PropsWithChildren<TouchHighlightProps>

const TouchHighlight:React.FC<TouchHighlightType> = ({
  underlayColor='#000',
  onClick,
  children,
  style,
  ...restProps
}) => {
  const [ color, setColor ] = React.useState<string>('');
  const handleClick = React.useCallback((e) => {
    setColor(underlayColor);
    window.setTimeout(() => {
      setColor('');
      onClick && onClick(e);
    }, 100);
  }, []);
  return (
    <View 
      {...restProps} 
      onClick={handleClick}
      style={{
        ...style,
        backgroundColor: color
      }} 
    >
      { children }
    </View>
  )
}

export default TouchHighlight;