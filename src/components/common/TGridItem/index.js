import React from 'react';
import { View } from 'react-native';

import componentStyle from '../../style';

function GridItem({ children }) {
  return <View style={[componentStyle.transactionCard, componentStyle.shadow]}>{children}</View>;
}

export default GridItem;
