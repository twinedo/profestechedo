import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Login, SalesInfo} from 'screens';
import {useAppSelector} from 'stores/hooks';

const Stack = createStackNavigator();

export default function Navigation() {
  const {Navigator, Screen} = Stack;

  const auth = useAppSelector(state => state.auth);

  console.log('awduanw', auth);
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {auth.access_token === '' ? (
        <Screen name="Login" component={Login} />
      ) : (
        <>
          <Screen name="Home" component={Home} />
          <Screen name="SalesInfo" component={SalesInfo} />
        </>
      )}
    </Navigator>
  );
}
