import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

export default class MoviesList extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            refreshing: false,
        };
    }

    componentDidMount() {
        this._onRefresh()
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
                alert(error)
            });
    }

    _onRowPress(rowData) {
        alert("you click " + rowData.title)
    }

    _onRefresh() {
        this.setState({
            refreshing: true,
            dataSource: this.state.dataSource.cloneWithRows([])
        });
        this.getMoviesFromApiAsync().then(() => {
            this.setState({
                refreshing: false
            });
        });
    }

    renderRow(rowData) {
        return(
            <TouchableOpacity onPress={() => this._onRowPress(rowData)}>
                <View flexDirection="row" style={{marginTop: 10, marginBottom: 10}}>
                    <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}} style={{flex: 3, height: 150, resizeMode: 'contain'}} />
                    <View style={{flex: 7}}>
                        <Text>{rowData.title}</Text>
                        <Text>{rowData.overview}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                style={{paddingTop: 20, backgroundColor: 'orange'}}

                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        );
    }
}
