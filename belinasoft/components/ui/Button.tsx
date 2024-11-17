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
  full?: boolean;
}

const MyButton: FC<IProps> = ({
  btnProps,
  textProps,
  children,
  to,
  type = 'common',
  full = true,
}) => {
  const styles = getStyles(type, btnProps?.disabled, full);

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
      <Text {...textProps} style={[styles.text, textProps?.style]}>
        {children}
      </Text>
    </TouchableHighlight>
  );
};

const getStyles = (type: BtnType, disabled?: boolean, full?: boolean) =>
  StyleSheet.create({
    btn: {
      backgroundColor: staticColors[type][disabled ? 'opacity' : 'bg'],
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 12,
      flex: full ? 1 : 0,
    },
    text: {
      textAlign: 'center',
      color: staticColors[type].color,
    },
  });

export default memo(MyButton);
