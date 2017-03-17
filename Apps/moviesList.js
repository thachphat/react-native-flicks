import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image
} from 'react-native';

export default class MoviesList extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
    }

    componentWillMount() {
        this.getMoviesFromApiAsync()
    }

    getMoviesFromApiAsync() {
        return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderRow(rowData) {
        return(
            <View flexDirection="row">
                <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}} />
                <Text>{rowData.title}</Text>
                <Text>{rowData.overview}</Text>
            </View>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}
