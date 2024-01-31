import NetInfo from '@react-native-community/netinfo';

export const isNetworkAvailable = async () => {
  const iNet = await NetInfo.fetch();

  return iNet.isConnected;
};
