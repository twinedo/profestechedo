import {Image, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import {Toolbar} from 'components/basic';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {PRIMARY, WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';
import {useAppDispatch} from 'stores/hooks';
import {resetAuth} from 'stores/authSlice';

type TSalesOrder = {
  title: string;
  children: ReactNode;
};

export default function SalesOrder(props: TSalesOrder) {
  const {title = 'Sales Order', children} = props;
  const dispatch = useAppDispatch();
  return (
    <View style={[globalStyles.displayFlex, {}]}>
      <Toolbar
        prefix={
          <Image
            source={require('assets/images/img_profile.png')}
            style={styles.imgProfile}
          />
        }
        postfix={
          <SimpleLineIcons
            name="menu"
            size={24}
            color={WHITE}
            onPress={() => dispatch(resetAuth())}
          />
        }
        containerStyle={{backgroundColor: PRIMARY}}
      />
      <View style={[globalStyles.displayFlex, {backgroundColor: PRIMARY}]}>
        <View
          style={[
            globalStyles.horizontalDefaultPadding,
            globalStyles.verticalDefaultPadding,
          ]}>
          <Text style={[globalStyles.headingBold.h1, styles.title]}>
            {title}
          </Text>
        </View>
        <View style={[globalStyles.displayFlex]}>
          <View
            style={[
              globalStyles.displayFlex,
              globalStyles.horizontalDefaultPadding,
              globalStyles.verticalDefaultPadding,
              styles.content,
            ]}>
            {children}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {fontSize: 36, color: WHITE},
  content: {
    backgroundColor: '#EEEEEE',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  imgProfile: {width: 50, height: 50},
});
