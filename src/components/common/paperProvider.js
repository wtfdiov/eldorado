import React, { Component } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    accent: '#2D8E90',
    primary: '#2D8E90'
  }
};

export default function paperProvider(WrappedComponent) {
  class Wrapper extends Component {
    render() {
      return (
        <PaperProvider theme={theme}>
          <WrappedComponent {...this.props} />
        </PaperProvider>
      );
    }
  }
  if (WrappedComponent) {
    Wrapper.options = WrappedComponent.options;
  }

  return Wrapper;
}
