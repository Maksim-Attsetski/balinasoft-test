import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks';
import React, { FC, memo, PropsWithChildren } from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface IProps extends TextProps {}

const MyText: FC<IProps> = (props) => {
  const textColor = useThemeColor('text');
  return (
    <Text {...props} style={[props.style, styles.text, { color: textColor }]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'SpaceMono-Regular',
  },
});

export default memo(MyText);
