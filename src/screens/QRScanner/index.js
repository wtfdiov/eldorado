import React from 'react';
import { RNCamera } from 'react-native-camera';

import i18n from 'i18n-js';

function QRScanner({ navigation, route }) {
  const { setDestination } = route.params;
  return (
    <RNCamera
      style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      type={RNCamera.Constants.Type.back}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      flashMode={RNCamera.Constants.FlashMode.off}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      captureAudio={false}
      onBarCodeRead={({ data }) => {
        setDestination(data);
        navigation.pop();
      }}
      androidCameraPermissionOptions={{
        title: i18n.t('qrScanner.askPermission.title'),
        message: i18n.t('qrScanner.askPermission.message'),
        buttonPositive: i18n.t('qrScanner.askPermission.btnPositive'),
        buttonNegative: i18n.t('qrScanner.askPermission.btnNegative')
      }}
    />
  );
}

export default QRScanner;
