import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQuery} from '@tanstack/react-query';
import {Alert} from 'react-native';
import {_useAxios} from 'services/useAxios';
import {setAuth} from 'stores/authSlice';
import {useAppDispatch} from 'stores/hooks';
import uuid from 'react-native-uuid';

export type TResponseOrderList = {
  OrderId: number;
  OrderNo: string;
  OrderDate: string;
  CustomerId: number;
  Address: string;
  ItemList: any[];
  CustomerName: string;
};

export type TBodyOrderItems = {
  ItemId: number;
  OrderId: number;
  ItemName: string;
  Quantity: number;
  Price: number;
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
      await AsyncStorage.setItem('@profestechedo_uuid', uuid.v4().toString());
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

export const useGetItemList = () => {
  const {...rest} = useQuery({
    queryKey: ['useGetItemList'],
    queryFn: async () => {
      var myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      try {
        const response = await _useAxios({
          url: '/Order/GetItems',
          method: 'get',
          headers: myHeaders,
        });
        return response?.data as TBodyOrderItems[];
      } catch (error) {
        return error;
      }
    },
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  return {...rest};
};

export const useCreateItem = () => {
  const {mutate, ...rest} = useMutation({
    mutationKey: ['useCreateItem'],
    mutationFn: async (data: TBodyOrderItems) => {
      console.log('datanhya', data);
      var myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      try {
        const response = await _useAxios({
          url: '/Order/CreateItem',
          method: 'post',
          data,
          headers: myHeaders,
        });
        return response?.data;
      } catch (error) {
        return error;
      }
    },
    onSuccess: data => {
      return data;
    },
    onError: error => {
      return error;
    },
  });
  return {createItem: mutate, ...rest};
};

export const useUpdateItem = () => {
  const {mutate, ...rest} = useMutation({
    mutationKey: ['useUpdateItem'],
    mutationFn: async (data: TBodyOrderItems) => {
      var myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      try {
        const response = await _useAxios({
          url: '/Order/UpdateItem',
          method: 'post',
          data,
          headers: myHeaders,
        });
        return response?.data;
      } catch (error) {
        return error;
      }
    },
    onSuccess: data => {
      return data;
    },
    onError: error => {
      return error;
    },
  });
  return {updateItem: mutate, ...rest};
};

export const useDeleteItem = () => {
  const {mutate, ...rest} = useMutation({
    mutationKey: ['useDeleteItem'],
    mutationFn: async (data: TBodyOrderItems) => {
      var myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      try {
        const response = await _useAxios({
          url: '/Order/DeleteItem',
          method: 'post',
          data,
          headers: myHeaders,
        });
        return response?.data;
      } catch (error) {
        return error;
      }
    },
    onSuccess: data => {
      return data;
    },
    onError: error => {
      return error;
    },
  });
  return {deleteItem: mutate, ...rest};
};
