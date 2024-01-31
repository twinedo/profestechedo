import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import globalStyles from 'styles/globalStyles';
import {PRIMARY} from 'styles/colors';

interface IFAB {
  backgroundColor?: string;
  children?: ReactNode;
  onPress?: () => void;
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}

const FAB = ({
  backgroundColor = PRIMARY,
  children,
  onPress,
  position,
}: IFAB) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        globalStyles.absolute,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
        position === 'bottom-center'
          ? styles.containerCenter
          : position === 'bottom-left'
          ? styles.containerLeft
          : styles.container,
        {backgroundColor},
      ]}>
      {children}
    </Pressable>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    bottom: 10,
    right: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    zIndex: 50,
  },
  containerLeft: {
    bottom: 10,
    left: 10,
    width: 60,
    height: 60,
    borderRadius: 60,
    zIndex: 50,
  },
  containerCenter: {
    bottom: 10,
    left: Dimensions.get('window').width / 2,
    right: Dimensions.get('window').width / 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    zIndex: 50,
  },
});
