import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputList, {
  IFormField,
  IFormFieldValues,
  IFormType,
} from 'components/layout/input-list';
import {Button} from 'components/basic';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {SECONDARY, WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import {percentageWidth} from 'utils/screenSize';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export type TLoginField = {
  username: string;
  password: string;
};

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<NavParam, 'Login'>>();
  const [formList] = useState<IFormType[]>([
    {
      id: 1,
      title: 'Username',
      placeholder: 'Username',
      name: 'username',
      type: 'default',
      isText: true,
      prefix: <Ionicons name="person" size={24} color={WHITE} />,
    },
    {
      id: 2,
      title: 'Password',
      placeholder: 'Password',
      name: 'password',
      type: 'default',
      isText: true,
      secureTextEntry: true,
      prefix: <Fontisto name="unlocked" size={24} color={WHITE} />,
    },
  ]);

  const _onSubmit = (val: IFormFieldValues<IFormField<TLoginField>>) => {
    console.log('val', val);
    navigation.navigate('Home');
  };

  return (
    <View style={[globalStyles.displayFlex]}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <LinearGradient
        colors={['#0887FC', '#FFFFFF']}
        useAngle
        angle={120}
        style={[
          globalStyles.displayFlex,
          globalStyles.alignCenter,
          globalStyles.justifyCenter,
        ]}>
        <View
          style={[
            globalStyles.justifyCenter,
            globalStyles.horizontalDefaultPadding,
            globalStyles.verticalDefaultPadding,
            styles.containerForm,
          ]}>
          <Text
            style={[
              globalStyles.textAlignCenter,
              globalStyles.headingBold.h1,
              {color: WHITE},
            ]}>
            Login
          </Text>
          <InputList<TLoginField>
            form={formList}
            initialValues={{username: '', password: ''}}
            validationSchema={LoginSchema}
            onSubmit={value => _onSubmit(value)}
            containerInputStyle={{borderWidth: 0}}
            inputProps={{
              style: {
                borderWidth: 1,
                borderColor: WHITE,
                borderRadius: 15,
                paddingHorizontal: 20,
                color: WHITE,
              },
              placeholderTextColor: WHITE,
            }}
            titleStyle={{color: WHITE}}
            submitComponent={handleSubmit => (
              <Button
                onPress={handleSubmit}
                backgroundColor={SECONDARY}
                containerStyle={{borderRadius: 5, margin: 10}}>
                Login
              </Button>
            )}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    backgroundColor: '#413F3F7A',
    width: percentageWidth(80),
    borderRadius: 20,
  },
});
