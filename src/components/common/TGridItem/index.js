import React, { Component } from 'react'
import { View } from 'react-native'

import componentStyle from '../../style';

class GridItem extends Component {

  render = () => {
    return (
      <View style={[componentStyle.transactionCard, componentStyle.shadow]}>
       {this.props.children}
      </View>
    )
  }
}

export default GridItem