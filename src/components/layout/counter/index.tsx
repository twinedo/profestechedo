import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import globalStyles from 'styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GREY3, PRIMARY, WHITE} from 'styles/colors';

interface ICounterPrimary {
  onChangeValue: (val: number) => void;
  defaultValue: number;
}

export const Counter = React.memo((props: ICounterPrimary) => {
  const {onChangeValue, defaultValue = 0} = props;
  const [count, setCount] = useState(defaultValue);

  const _onMinusPress = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      onChangeValue(newCount);
    }
  };

  const _onPlusPress = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChangeValue(newCount);
  };

  const _onChangeText = (text: string) => {
    const numericValue = parseInt(text, 10);

    if (text === '') {
      setCount(0);
      onChangeValue(0);
    } else if (!isNaN(numericValue)) {
      setCount(numericValue);
      onChangeValue(numericValue);
    }
  };

  return (
    <View
      style={[
        globalStyles.row,
        globalStyles.justifySpaceBetween,
        globalStyles.alignCenter,
        styles.input,
      ]}>
      <AntDesign
        name="minuscircle"
        size={24}
        color={WHITE}
        onPress={() => count > 0 && _onMinusPress()}
      />

      <TextInput
        placeholder={'0'}
        placeholderTextColor={GREY3}
        value={count.toString()}
        style={[globalStyles.headingBold.h3, globalStyles.textAlignCenter]}
        onChangeText={_onChangeText}
        keyboardType="numeric"
      />
      <AntDesign
        name="pluscircle"
        size={24}
        color={WHITE}
        onPress={_onPlusPress}
      />
    </View>
  );
});

export default Counter;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#D9D9D9',
    borderColor: '#959595',
    borderRadius: 24,
    minWidth: 50,
    height: 40,
    width: 108,
    paddingHorizontal: 8,
  },
});
