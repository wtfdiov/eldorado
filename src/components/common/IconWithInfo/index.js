import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-paper';

import Icon from 'react-native-vector-icons/Ionicons';

import componentStyle from '../../style';

function IconWithInfo({ info, title, displayIcon, iconColor, size, titleColor }) {
  return (
    <Card style={[componentStyle.profileMetrics]}>
      <Card.Content
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Icon name={displayIcon} color={iconColor} size={parseInt(size)} />
        <View>
          <Text
            style={{
              color: titleColor,
              alignSelf: 'flex-end',
              fontWeight: '500'
            }}
          >
            {title}
          </Text>
          {info}
        </View>
      </Card.Content>
    </Card>
  );
}

export default IconWithInfo;
