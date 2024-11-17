import { Colors } from '@/global/Colors';
import { useThemeColor } from '@/hooks';
import React, { FC, memo, PropsWithChildren } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface IProps extends TextProps {
  title?: boolean;
}

const MyText: FC<IProps> = (props) => {
  const textColor = useThemeColor('text');
  return (
    <Text
      {...props}
      style={[
        { color: textColor, fontSize: props.title ? 32 : 20 },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};

export default memo(MyText);
