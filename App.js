import { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator  } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { PersistGate } from 'redux-persist/integration/react';

import registerForNotifications from './services/push_notifications';
import { store, persistor } from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {

  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      // const text = notification.data.text;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }
    render() {

    const MainNavigator = createBottomTabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            navigationOptions: {
              title: 'Review Jobs',
              tabBarIcon: ({tintColor}) => { return (<Icon name="favorite" size={30} color={tintColor} />);}
            },
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarOptions: {
            labelStyle: {fontSize: 12}
          }
        })
      }
    }, {
      defaultNavigationOptions: {
        tabBarVisible: false
      }
    });

    const AppContainer = createAppContainer(MainNavigator);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
