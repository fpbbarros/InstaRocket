import React, { Component } from 'react';
import api from '../services/api';
import { View, Image, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class Feed extends Component {
    static navigationOptions = ({navigation}) => ({
        headerRight: (
            <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('New')} >
                <Image source={camera} />
            </TouchableOpacity>

        ),
    });


    state = {
        feed:[],
    };

    async componentDidMount(){
        //this.registerToSocket();
        const response = await api.get('posts');
        console.log(response.data);
        this.setState({feed: response.data });
    }


  render() {
    return (
    <View style={styles.container}>

<Text>Fábio pereira barros</Text>

        <FlatList 
        data={ this.state.feed } 
        keyExtractor={post => post._id}
        renderItem={({ item }) => (

                <View style={styles.feedItem}>

                    <View style={styles.feedItemHeader}>
                        <View style={styles.userInfo}>

                            <Text style={styles.name}>{item.author}</Text>
                            <Text style={styles.place}>{item.place}</Text>

                        </View>
                        <Image source={more} />
                    </View>
                    <Image style={style.feedImage} source={ { uri: `http://192.168.100.246/3333/files/${item.image}` } } />
                    <View style={styles.feedItemFooter}>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => {}}>
                                <Image source={like}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {}}>
                                <Image source={comment}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {}}>
                                <Image source={send}></Image>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.likes}>{item.likes} curtidas</Text>
                        <Text style={styles.descriptions}>{item.descriptions} curtidas</Text>
                        <Text style={styles.descriptions}>{item.descriptions}</Text>
                        <Text style={styles.hashtags}>{item.hashtags}</Text>

                    </View>

                </View>

        )}
        ></FlatList>

    </View>
    );
  }
}



const styles = StyleSheet.create({


    container: { flex: 1, },

    feedItem: {
        marginTop: 20
    },

    feedItemHeader: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    name: {
        fontSize: 14,
        color: '#000'

    },

    place: {
        fontSize: 12,
        color: '#666',
        marginTop: 2

    },

    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15,

    }
});
