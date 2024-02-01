import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {useState} from 'react';
import {Input, Spacer} from 'components/basic';
import {Formik} from 'formik';
import {KeyboardType} from 'react-native';
import globalStyles from 'styles/globalStyles';
import {ViewStyle} from 'react-native';
import {IInputProps} from 'components/basic/input';
import Foundation from 'react-native-vector-icons/Foundation';
import {WHITE} from 'styles/colors';

export type IFormField<T = Record<string, any>> = {
  [key: string]: keyof T;
};

export type IFormType<T = Record<string, any>> = {
  id: number;
  title?: string;
  placeholder: string;
  name: keyof IFormField<T>;
  type: KeyboardType;
  secureTextEntry?: boolean;
  isText: boolean;
  isOption?: boolean;
  isDate?: boolean;
  isAttach?: boolean;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
  options?: any[];
};

export type IFormFieldValues<T = Record<string, any>> = IFormField<T>;

export type TInputListProps<T = Record<string, any>> = {
  form: IFormType<T>[];
  initialValues: IFormFieldValues<T>;
  containerStyle?: ViewStyle | ViewStyle[];
  containerInputStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  inputProps?: IInputProps;
  submitComponent: (handleSubmit: () => void) => React.ReactNode;
  validationSchema?: any;
  onSubmit: (values: IFormFieldValues<T>) => void;
};

export default function InputList<T>(props: TInputListProps<IFormField<T>>) {
  const {
    form,
    initialValues,
    containerStyle,
    containerInputStyle,
    titleStyle,
    inputProps,
    validationSchema,
    submitComponent,
    onSubmit,
  } = props;
  const [formList] = useState<IFormType[]>(form);

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => onSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            {formList.map((o: IFormType) => (
              <View
                key={o.id.toString()}
                style={[
                  styles.container,
                  globalStyles.relative,
                  {...containerStyle},
                ]}>
                {typeof o.title === 'string' && (
                  <Text style={[globalStyles.headingBlack.h3, {...titleStyle}]}>
                    {o.title}
                  </Text>
                )}
                <Spacer height={10} />
                <Input
                  placeholder={o.placeholder}
                  onChangeText={handleChange(o.name)}
                  onBlur={handleBlur(o.name) || (() => {})}
                  value={values[o.name].toString()}
                  containerStyle={{...containerInputStyle}}
                  keyboardType={o.type}
                  secureTextEntry={o.secureTextEntry}
                  prefix={o.prefix}
                  postfix={o.postfix}
                  {...inputProps}
                />

                {errors[o.name] && touched[o.name] ? (
                  <View
                    style={[
                      globalStyles.row,
                      globalStyles.alignCenter,
                      globalStyles.columnGap,
                    ]}>
                    <Foundation name="info" color="red" size={24} />
                    <Text
                      style={[globalStyles.headingRegular.h3, {color: WHITE}]}>
                      {errors[o.name]!.toString()}
                    </Text>
                  </View>
                ) : null}
              </View>
            ))}
            {submitComponent(handleSubmit)}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginVertical: 10, marginHorizontal: 10},
});
