import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

class SendScreen extends Component {

  render () {
    return (
      <ScrollView style={styles.dashContainer}>
        <Text> Send </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1
  }
});

export default SendScreen;