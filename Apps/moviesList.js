import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    RefreshControl,
    TabBarIOS
} from 'react-native';

import MovieDetail from './movieDetail.js'
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';

export default class MoviesList extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            refreshing: false,
            selectedTab: 'homeTab',
        };
    }

    componentDidMount() {
        this._onRefresh()
    }

    getMoviesFromApiAsync(category = 'now_playing') {
        const url  = 'https://api.themoviedb.org/3/movie/' + category + '?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed'
        console.log(url)
        return fetch(url)
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
        this.props.navigator.push({
            component: MovieDetail,
            title: 'Movie Detail',
            passProps: {movie: rowData},
            index: 1
        })
    }

    _onRefresh(category = 'now_playing') {
        this.setState({
            refreshing: true,
            dataSource: this.state.dataSource.cloneWithRows([])
        });
        this.getMoviesFromApiAsync(category).then(() => {
            this.setState({
                refreshing: false
            });
        });
    }

    renderRow(rowData) {
        return(
            <TouchableOpacity onPress={() => this._onRowPress(rowData)}>
                <View flexDirection="row" style={{marginTop: 10, marginBottom: 10}}>
                    <Image
                        source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}}
                        style={{flex: 3, height: 150, resizeMode: 'contain'}}
                        indicator={Progress}
                    />
                    <View style={{flex: 7}}>
                        <Text style={styles.title}>{rowData.title}</Text>
                        <Text>{rowData.overview}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderContent(selectedTab){
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}

                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            />
        );
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="dimgray"
                tintColor="black"
                unselectedItemTintColor="#CCC"
                barTintColor="orange"
                style={{backgroundColor: 'orange'}}>
                <TabBarIOS.Item
                    title="Now Playing"
                    icon={require("../images/now_playing.png")}
                    selected={this.state.selectedTab === 'homeTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'homeTab',
                        });
                        this._onRefresh('now_playing')
                    }}>
                {this._renderContent('homeTab')}
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Top Rated"
                    icon={require("../images/top_rated.png")}
                    badgeColor="pink"
                    selected={this.state.selectedTab === 'newMovieTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'newMovieTab',
                        });
                        this._onRefresh('top_rated')
                    }}>
                {this._renderContent('newMovieTab')}
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10
    }
})
