import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default (screen, props = null) => {
    Promise.all([
        Icon.getImageSource('md-close', 48),
      ],).then(icons => {

    Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: screen,
              passProps: {
                ...props
              },
              options: {
                modalPresentationStyle: Platform.OS === 'android' ? 'overCurrentContext' : 'overFullScreen',
                layout: {
                  backgroundColor: '#00000095',
                  orientation: ['portrait']
                },
                topBar: {
                  drawBehind: true,
                  elevation: 0,
                  background: {
                    color: 'transparent'
                  },
                  rightButtons: [
                    {
                      icon: icons[0],
                      title: 'Close',
                      color: '#ffffff',
                      id: 'closeModal',
                    },
                  ],
                },
              }
            }
          }]
        }
      });
    });
}
