import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';

type ToolbarProps = {
  text?: string | React.ReactNode;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle | ViewStyle[];
  prefix?: React.ReactNode;
  prefixStyle?: ViewStyle | ViewStyle[];
  postfix?: React.ReactNode;
  postfixStyle?: ViewStyle | ViewStyle[];
  middleStyle?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
} & ViewProps;

const Toolbar = (props: ToolbarProps & ViewProps) => {
  const {
    children,
    text,
    textStyle,
    containerStyle,
    prefix,
    prefixStyle,
    postfix,
    postfixStyle,
    middleStyle,
  } = props;
  return (
    <View
      {...props}
      style={[
        globalStyles.row,
        globalStyles.alignCenter,
        globalStyles.justifySpaceBetween,
        styles.container,
        containerStyle,
      ]}>
      <View {...props} style={[styles.prefix, prefixStyle]}>
        {prefix}
      </View>
      {typeof children === 'string' ? (
        <Text style={[globalStyles.headingBold.h3, {...textStyle}]}>
          {text}
        </Text>
      ) : (
        <View style={[styles.middle, {...middleStyle}]}>{children}</View>
      )}

      <View {...props} style={[styles.postfix, {...postfixStyle}]}>
        {postfix}
      </View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 12,
    backgroundColor: WHITE,
  },
  middle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prefix: {
    flex: 0.5,
    alignItems: 'flex-start',
  },
  postfix: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
});
