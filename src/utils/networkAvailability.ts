import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export const NetworkAvailability = async () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state?.isConnected!);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};
