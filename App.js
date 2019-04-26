/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar} from 'react-native';
import Router from './src/settings/router';


export default class App extends Component {

  render() {
    return (
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
          <Router/>
        </View>
    );
  }
}
