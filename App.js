/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import {Provider} from 'mobx-react';
import getTheme from './native-base-theme/components';
import commonColor from './native-base-theme/variables/commonColor';
import {Root, StyleProvider} from 'native-base';
import Router from './src/settings/router';
import RootStore from './stores';

export default class App extends Component {

  render() {
      return (
          <Provider {...RootStore}>
              <StyleProvider style={getTheme(commonColor)}>
                  <Root>
                      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
                      <Router/>
                  </Root>
              </StyleProvider>
          </Provider>
      );
  }
}
