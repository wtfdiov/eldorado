import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import componentStyle from '../../style';

class IconWithInfo extends Component {
  static propTypes = {
    value: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    value: '',
    title: '',
  }
  render = () => {
    const { info, title, displayIcon, iconColor, size, titleColor } = this.props
    return (
      <View style={[componentStyle.profileMetrics, componentStyle.shadow, componentStyle.centreItems, {flexDirection: 'row', padding: 10, justifyContent: 'space-between'}]}>
        <Icon name={displayIcon} color={iconColor} size={parseInt(size)} />
        <View>
        <Text style={{color: titleColor, alignSelf: 'flex-end'}}>
        {title}
        </Text>
        {info}
        </View> 
      </View>
    )
  }
}

export default IconWithInfo