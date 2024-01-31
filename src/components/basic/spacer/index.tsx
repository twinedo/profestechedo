import React, {memo} from 'react';
import {View} from 'react-native';

type ISpacerProps = {
  height?: number;
  width?: number;
};

const Spacer: React.FC<ISpacerProps> = ({height, width}) => {
  return <View style={{height, width}} />;
};

export default memo(Spacer);
