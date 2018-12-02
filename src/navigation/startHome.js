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
        stack: {
          id: 'main',
          children: [
            {
              bottomTabs: {
                children: [
                  {
                    component: {
                      name: 'eldorado.screens.Home',
                      options: {
                        bottomTab: {
                          icon: assets[0],
                          iconColor: '#009432',
                          selectedIconColor: 'white',
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
                          icon: assets[1],
                          iconColor: '#009432',
                          selectedIconColor: 'white',
                          testID: 'SEND_TAB_BUTTON'
                        },
                        topBar: {
                          visible: false,
                          drawBehind: true,
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
                            options: {
                              topTab:{
                                title: 'tab 1'
                              }
                            }
                          },
                          
                        },
                        {
                          component: {
                            name: 'eldorado.screens.Transactions.Received',
                            options: {
                              topTab:{
                                title: 'tab 2'
                              }
                            }
                          },
                          
                        },
                        {
                          component: {
                            name: 'eldorado.screens.Transactions.Sent',
                            options: {
                              topTab:{
                                title: 'tab 2'
                              }
                            }
                          },
                          
                        }
                      ],
                      options: {
                        bottomTab: {
                          icon: assets[2],
                          iconColor: '#009432',
                          selectedIconColor: 'white',
                          testID: 'TRANSACTIONS_TAB_BUTTON'
                        },
                        topBar: {
                          visible: false,
                        }
                      }
                    },
                  }
                ],
                options: {
                  bottomTabs: {
                    backgroundColor: '#60b145'
                  }
                }
              },
            }
          ]
        }
      }
    });

  });

};
