/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import MoviesList from './Apps/moviesList.js'

export default class ReactNativeFlicks extends Component {
  render() {
    return (
      <MoviesList />
    );
  }
}

AppRegistry.registerComponent('ReactNativeFlicks', () => ReactNativeFlicks);
