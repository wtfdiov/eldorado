import { Navigation } from 'react-native-navigation';

export default () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'eldorado.screens.Auth'
      }
    }
  });
}
