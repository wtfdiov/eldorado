import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import componentStyle from '../../style';

class Pills extends Component {

  render = () => {
    const { icon, text } = this.props
    return (
        <View style={[componentStyle.transactionPill, {flexDirection: 'row'}]}>
          <View style={[componentStyle.centreItems, {borderRadius: 35, backgroundColor: 'white', width: 36, height: 36}]}>
          <Icon name={icon} color="#3ae374" size={26} />
          </View>
          <Text style={{color: 'white', alignSelf: 'center', marginHorizontal: 5, fontSize: 16}}>{text}</Text>
        </View>
    )
  }
}

export default Pills