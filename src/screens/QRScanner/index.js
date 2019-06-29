import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';

import i18n from 'i18n-js';

class QRScanner extends Component {
  static options(passProps) {
    return {
      layout: {
        orientation: ['portrait']
      },
      topBar: {
        buttonColor: '#FFFFFF',
        background: {
          color: '#006e6e'
        },
        title: {
          text: i18n.t('qrScanner.title'),
          color: 'white'
        },
        backButton: {
          showTitle: false
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      cameraOn: false
    };
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.setState({ cameraOn: true });
  }

  componentDidDisappear() {
    this.setState({ cameraOn: false });
  }

  render() {
    return (
      this.state.cameraOn && (
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          captureAudio={false}
          onBarCodeRead={({ data }) => {
            this.props.setAddress(data);
            Navigation.pop(this.props.componentId);
          }}
          androidCameraPermissionOptions={{
            title: i18n.t('qrScanner.askPermission.title'),
            message: i18n.t('qrScanner.askPermission.message'),
            buttonPositive: i18n.t('qrScanner.askPermission.btnPositive'),
            buttonNegative: i18n.t('qrScanner.askPermission.btnNegative')
          }}
        />
      )
    );
  }
}

export default QRScanner;
