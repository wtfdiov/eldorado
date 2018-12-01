import React, { Component } from 'react';

import Card from '../common/Card';
import IconWithInfo from '../common/IconWithInfo';
import NBR from '../common/DisplayValue/NBR';
import ConvertNBR from '../common/DisplayValue/ConvertNBR';


class WalletStats extends Component {
  
  constructor(props) {
    super(props);
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
          info={<NBR value={this.props.ballance.available} />}
        />

        <IconWithInfo 
          title="LOCKED"
          titleColor="red"
          displayIcon="ios-lock"
          iconColor="darkgray"
          size="48"
          info={<NBR value={this.props.ballance.locked} />}
        />

        <IconWithInfo 
          title="VALUE (USD)"
          titleColor="green"
          displayIcon="ios-cash"
          iconColor="darkgray"
          size="48"
          decimals="2"
          info={<ConvertNBR to="USD" amount={this.props.ballance.total} />}
        />

        <IconWithInfo 
          title="VALUE (BTC)"
          titleColor="purple"
          displayIcon="logo-bitcoin"
          iconColor="darkgray"
          size="48"
          decimals="2"
          last
          info={<ConvertNBR to="BTC" amount={this.props.ballance.total} />}
        />

      </Card>
    );
  }
}

export default WalletStats;