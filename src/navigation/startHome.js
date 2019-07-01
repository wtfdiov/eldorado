import { Navigation } from 'react-native-navigation';

export default () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'main',
        options: {
          topBar: {
            visible: false
          }
        },
        children: [
          {
            component: {
              name: 'eldorado.screens.Home'
            }
          }
        ]
      }
    }
  });
};
