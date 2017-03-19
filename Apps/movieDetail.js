import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    RefreshControl
} from 'react-native';

export default class MovieDetail extends Component {
    render() {
        return (
            <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + this.props.movie.poster_path}} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <Text style={[styles.text, styles.title]}>{this.props.movie.title}</Text>
                    <Text style={styles.text}>{this.props.movie.release_date}</Text>
                    <Text style={[styles.text, styles.overview]}>{this.props.movie.overview}</Text>
                </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 64
    },
    container: {
        backgroundColor: '#000000cc',
        paddingHorizontal: 5,
        paddingVertical: 20,
        marginHorizontal: 20
    },
    text: {
        color: 'white',
        fontSize: 16,
        paddingBottom: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20
    },
    overview: {
        fontWeight: 'bold',
    }
})