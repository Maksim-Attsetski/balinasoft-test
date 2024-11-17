import { staticColors } from '@/global/Colors';
import { useThemeColor } from '@/hooks';
import React, { FC, memo, PropsWithChildren } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TextProps,
  TouchableHighlightProps,
} from 'react-native';
import Text from './Text';
import { LinkProps, router } from 'expo-router';

type BtnType = 'primary' | 'secondary' | 'common';

interface IProps extends PropsWithChildren {
  to?: LinkProps['href'];
  btnProps?: TouchableHighlightProps;
  textProps?: TextProps;
  type?: BtnType;
}

const MyButton: FC<IProps> = ({
  btnProps,
  textProps,
  children,
  to,
  type = 'common',
}) => {
  const textColor = useThemeColor('text');
  const styles = getStyles(type);
  return (
    <TouchableHighlight
      {...btnProps}
      underlayColor={staticColors[type].opacity}
      onPress={(event) => {
        btnProps?.onPress?.(event);
        to && router.push(to);
      }}
      style={[btnProps?.style, styles.btn]}
    >
      <Text {...textProps} style={[textProps?.style, styles.text]}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const getStyles = (type: BtnType) =>
  StyleSheet.create({
    btn: {
      backgroundColor: staticColors[type].bg,
      paddingVertical: 16,
      paddingHorizontal: 24,
      flex: 1,
      borderRadius: 12,
    },
    text: {
      textAlign: 'center',
      color: staticColors[type].color,
    },
  });

export default memo(MyButton);
