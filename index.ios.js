/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import MainNavigator from './Apps/mainNavigator.js'

export default class ReactNativeFlicks extends Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}

AppRegistry.registerComponent('ReactNativeFlicks', () => ReactNativeFlicks);