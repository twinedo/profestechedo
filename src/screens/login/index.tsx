import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputList, {IFormType} from 'components/layout/input-list';
import {Button} from 'components/basic';
import * as Yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export type TLoginField = {
  username: string;
  password: string;
};

export default function Login() {
  const [formList, setFormList] = useState<IFormType[]>([
    {
      id: 1,
      title: 'Username',
      placeholder: 'Username',
      name: 'username',
      type: 'default',
      isText: true,
    },
    {
      id: 2,
      title: 'Password',
      placeholder: 'Password',
      name: 'password',
      type: 'default',
      isText: true,
      secureTextEntry: true,
      postfix: (
        <Ionicons name="eye" size={24} onPress={() => _onSecureTextEntry(1)} />
      ),
    },
  ]);

  const _onSecureTextEntry = (i: number) => {
    const dat = [...formList];
    dat[i].secureTextEntry = !dat[i].secureTextEntry;
    dat[i].postfix = (
      <Ionicons
        name={dat[i].secureTextEntry ? 'eye' : 'eye-off'}
        size={24}
        onPress={() => _onSecureTextEntry(1)}
      />
    );
    setFormList(dat);
  };

  return (
    <View>
      <Text>Login</Text>
      <InputList<TLoginField>
        form={formList}
        initialValues={{username: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={values => console.log('val', values)}
        submitComponent={handleSubmit => (
          <Button
            onPress={handleSubmit}
            containerStyle={{borderRadius: 5, margin: 10}}>
            Submit
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
