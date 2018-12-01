import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { config } from '../../../app.json';

import Card from '../common/Card';
import IconWithInfo from '../common/IconWithInfo';
import NBR from '../common/DisplayValue/NBR';
import ConvertNBR from '../common/DisplayValue/ConvertNBR';

class WalletStats extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      available: .0,
      locked: .0,
      total: .0,
      value: .0,
      valueBTC: .0,
    }
  }

  componentDidMount () {
    axios.get(`${config.api}/addresses/balance`, {
      headers: {
        Authorization: `Bearer ${this.props.authToken}`
      }
    })
    .then(({data}) => {
      this.setState({available: data.available});
      this.setState({locked: data.locked});
      this.setState({total: data.total});
    })
    .catch(error => console.log(error))
  }

  render () {
    return (
      <Card bgColor="white">
        <IconWithInfo 
          title="BALANCE"
          titleColor="darkgreen"
          displayIcon="ios-shuffle"
          iconColor="darkgray"
          size="48"
          info={<NBR value={this.state.available} />}
        />

        <IconWithInfo 
          title="LOCKED"
          titleColor="red"
          displayIcon="ios-lock"
          iconColor="darkgray"
          size="48"
          info={<NBR value={this.state.locked} />}
        />

        <IconWithInfo 
          title="VALUE (USD)"
          titleColor="green"
          displayIcon="ios-cash"
          iconColor="darkgray"
          size="48"
          decimals="2"
          info={<ConvertNBR to="USD" amount={this.state.total} />}
        />

        <IconWithInfo 
          title="VALUE (BTC)"
          titleColor="purple"
          displayIcon="logo-bitcoin"
          iconColor="darkgray"
          size="48"
          decimals="2"
          last
          info={<ConvertNBR to="BTC" amount={this.state.total} />}
        />

      </Card>
    );
  }
}

const mapStateToProps = state => { 
  return { authToken: state.auth.token };
};

export default connect(mapStateToProps, null)(WalletStats);