import React, { Component } from 'react';
import { Text } from 'react-native';
import axios from 'axios';

import { config } from '../../../../app.json';
import { roundToken } from '../../../helpers/roundToken';

class ConvertNBR extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 0
    }

    this.config = {
      symbol: 'NBR',
      name: 'Nióbio Cash',
      decimals: 8,
      defaultUnit: 100000000
    }
  }

  convert = (from, to, amount) => {
    return axios.post(`${config.api}/conversions`, {
      ticker: {
        from,
        to
      },
      amount
    })
    .then(({ data }) => data.price.toFixed(this.props.decimals || roundToken(data.price)))
  }

  componentDidMount() {
    if (this.props.amount) {
      this.convert(this.config.symbol, this.props.to, this.props.amount / this.config.defaultUnit)
      .then(convertedValue => this.setState({value: convertedValue}))
      .catch(error => console.log(`Problem trying to convert ${from} to ${to}.`, error));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) {
      this.convert(this.config.symbol, this.props.to, this.props.amount / this.config.defaultUnit)
      .then(convertedValue => this.setState({value: convertedValue}))
      .catch(error => console.log(`Problem trying to convert ${from} to ${to}.`, error));
    }
  }
    
  render () {
    return <Text> {this.state.value} </Text>
  }

}

export default ConvertNBR;