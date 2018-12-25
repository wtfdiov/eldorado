import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { RNCamera } from 'react-native-camera';

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
              text: 'Scan NBR QRCode',
              color: 'white'
            },
            backButton: {
              showTitle: false
            }
          },
        }
      }

  render() {
      return (
        <RNCamera
            ref={camera => { this.camera = camera }}
            style={{flex: 1}}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
            onBarCodeRead={({ data }) => {
                this.props.setAddress(data)
                Navigation.pop(this.props.componentId);
            }}
            permissionDialogTitle={'Permissão para uso da Câmera'}
            permissionDialogMessage={'Precisamos de autorização para acessar sua câmera e tornar possível o scan de QRCodes'}
        />
      );
  }
}

export default QRScanner