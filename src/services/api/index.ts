import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Alert} from 'react-native';
import {_useAxios} from 'services/useAxios';
import {setAuth} from 'stores/authSlice';
import {useAppDispatch} from 'stores/hooks';

export type TResponseOrderList = {
  OrderId: number;
  OrderNo: string;
  OrderDate: string;
  CustomerId: number;
  Address: string;
  ItemList: any[];
  CustomerName: string;
};

export const useGenerateToken = () => {
  const dispatch = useAppDispatch();
  const {mutate, ...rest} = useMutation({
    mutationKey: ['useGenerateToken'],
    mutationFn: async (credential: {
      client_id: string;
      client_secret: string;
    }) => {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      var urlencoded = new URLSearchParams();
      urlencoded.append('grant_type', 'client_credentials');
      urlencoded.append('client_id', credential.client_id);
      urlencoded.append('client_secret', credential.client_secret);
      const response = await fetch(`${BASE_URL}/token`, {
        method: 'post',
        headers: myHeaders,
        body: urlencoded.toString(),
      });

      if (!response.ok) {
        throw await response.json();
      }
      return await response.json();
    },
    onSuccess: async data => {
      console.log('dataaa', data);
      await AsyncStorage.setItem('@profestechedo', data.access_token);
      dispatch(setAuth(data));
      return data;
    },
    onError: (error: Error & {error: string}) => {
      Alert.alert('Error', error.error);
      return error;
    },
  });
  return {generateToken: mutate, ...rest};
};

export const useGetOrderList = () => {
  const {...rest} = useQuery({
    queryKey: ['useGetOrderList'],
    queryFn: async () => {
      try {
        const response = await _useAxios({
          url: '/Order/GetOrderList',
          method: 'get',
        });
        return response?.data as TResponseOrderList[];
      } catch (error) {
        return error;
      }
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  return {...rest};
};
