import React, { Component } from 'react';
import {
    AppRegistry,
    NavigatorIOS,
    StyleSheet
} from 'react-native';

import MoviesList from './moviesList.js'

export default class MainNavigator extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{component: MoviesList, title: 'Movies List', index: 0}}
                style={{flex: 1, backgroundColor: 'orange'}}
            />
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flex: 1,
        backgroundColor: 'white'
    },
})