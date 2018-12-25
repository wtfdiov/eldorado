import { Navigation } from 'react-native-navigation';

export default (props = null) => {
    Navigation.push('mainTabs', {
        component: {
            name: 'eldorado.screens.QRScanner',
            passProps: {
              ...props
            },
        }
    });
}
