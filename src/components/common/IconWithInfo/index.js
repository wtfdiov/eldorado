import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const iconWithInfo = (props) => {

  const displayIcon = props.displayIcon
  ? (<Icon name={props.displayIcon} size={parseInt(props.size)} color={props.iconColor} />)
  : null

  const title = props.title
  ? (<Text style={{color: props.titleColor, fontWeight: 'bold'}}> {props.title} </Text>)
  : null

  const info = props.info
  ? (props.info)
  : null

  return (
    <View style={{
      flexDirection: 'row',
      borderBottomWidth: props.last ? 0 : 0.5,
      borderBottomColor: props.last ? 'transparent' : '#ced4da'}}
    >
      <View style={{width: 50, alignItems: 'center'}}>
        {displayIcon}
      </View>
      <View style={{justifyContent: 'center'}}>
        {title}
        {info}
      </View>
    </View>
  );
}

export default iconWithInfo;