import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export default () => {

  Promise.all([
    Icon.getImageSource('ios-wallet', 34),
    Icon.getImageSource('ios-send', 34),
    Icon.getImageSource('ios-repeat', 34),
    Icon.getImageSource('ios-contacts', 34),
  ])
  .then(assets => {

    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            {
              component: {
                name: 'eldorado.screens.Home',
                options: {
                  bottomTab: {
                    text: 'Dashboard',
                    icon: assets[0],
                    iconColor: '#2c3e50',
                    selectedIconColor: '#27ae60',
                    testID: 'HOME_TAB_BUTTON'
                  },
                  topBar: {
                    visible: false,
                  }
                }
              },
            },
            {
              component: {
                name: 'eldorado.screens.Send',
                options: {
                  bottomTab: {
                    text: 'Enviar',
                    icon: assets[1],
                    iconColor: '#2c3e50',
                    selectedIconColor: '#27ae60',
                    testID: 'SEND_TAB_BUTTON'
                  }
                }
              }
            },
            {
              topTabs: {
                children: [
                  {
                    component: {
                      name: 'eldorado.screens.Transactions.All',
                    },
                    options: {
                      topTab:{
                        title: 'tab 1'
                      }
                    }
                  },
                  {
                    component: {
                      name: 'eldorado.screens.Transactions.Sent',
                    },
                    options: {
                      topTab:{
                        title: 'tab 2'
                      }
                    }
                  }
                ],
                options: {
                  bottomTab: {
                    text: 'Transactions',
                    icon: assets[2],
                    iconColor: '#2c3e50',
                    selectedIconColor: '#27ae60',
                    testID: 'TRANSACTIONS_TAB_BUTTON'
                  }
                }
              },
            }
          ],
        },
      }
    });

  });

};
