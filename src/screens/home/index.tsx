import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BaseContainer} from 'components/layout';
import SalesOrder from 'components/layout/sales-order';
import globalStyles from 'styles/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PRIMARY, WHITE} from 'styles/colors';
import {Button, Input, Spacer} from 'components/basic';
import InputList, {IFormType} from 'components/layout/input-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {NavParam} from 'navigations/types';
import {percentageHeight} from 'utils/screenSize';

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<NavParam, 'Home'>>();
  return (
    <View style={[globalStyles.displayFlex, {backgroundColor: PRIMARY}]}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <SafeAreaView style={globalStyles.displayFlex}>
        <SalesOrder title="Sales Order List">
          <View
            style={[
              styles.sectionSearch,
              globalStyles.horizontalDefaultPadding,
              globalStyles.verticalDefaultPadding,
            ]}>
            <Text style={[globalStyles.headingBold.h3]}>Search</Text>
            <Spacer height={10} />
            <Input
              placeholder="Keyword"
              containerStyle={{borderColor: '#979C9F'}}
            />
            <Spacer height={10} />
            <Input
              placeholder="Order Date"
              containerStyle={{borderColor: '#979C9F'}}
              postfix={
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={24}
                  color="#979C9F"
                />
              }
            />
          </View>
          <Spacer height={30} />
          <View
            style={[
              globalStyles.row,
              globalStyles.justifySpaceBetween,
              globalStyles.alignCenter,
            ]}>
            <Text style={[globalStyles.headingBold.h1]}>Order List</Text>
            <Text style={[globalStyles.headingMedium.h3]}>Total Items: 0</Text>
          </View>
          <Spacer height={20} />
          <Button
            onPress={() => navigation.navigate('SalesInfo')}
            backgroundColor={PRIMARY}
            containerStyle={{width: 98, height: 29, borderRadius: 10}}
            textStyle={{fontSize: 12}}>
            Add
          </Button>
          <Spacer height={20} />
          <View>
            <FlatList
              data={Array(10).fill('')}
              keyExtractor={(_, i) => i.toString()}
              ItemSeparatorComponent={() => <Spacer height={22} />}
              style={{height: percentageHeight(40)}}
              contentContainerStyle={[{padding: 10}]}
              renderItem={({item}) => (
                <Pressable
                  style={[
                    globalStyles.horizontalDefaultPadding,
                    globalStyles.verticalDefaultPadding,
                    globalStyles.row,
                    globalStyles.alignCenter,
                    globalStyles.justifyEven,
                    {borderRadius: 15, backgroundColor: WHITE, elevation: 15},
                  ]}>
                  <Text style={[globalStyles.headingBold.h2]}>PROFES</Text>
                  <Text style={[globalStyles.headingMedium.h3]}>50_01</Text>
                  <Text style={[globalStyles.headingMedium.h3]}>24/2/2011</Text>
                </Pressable>
              )}
            />
          </View>
          <View>
            <Text>Test</Text>
          </View>
        </SalesOrder>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionSearch: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#979C9F',
  },
});
