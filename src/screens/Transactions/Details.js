import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Linking, View, Text } from 'react-native';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transaction: props.transactions.find(item => item.id === props.transactionId)
    }
  }

  render () {
    return this.state.transaction ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Linking.openURL(`http://explorer.niobiocash.com/?hash=${this.state.transaction.hash}#blockchain_transaction`)}>
          <Text>Click on me</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={styles.container}>
        <ActivityIndicator color="green" />
        <Text>Carregando informações sobre a transação.</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

const mapStateToProps = state => ({ transactions: state.transactions.transactions});

export default connect(mapStateToProps, null)(Details)