
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    FlatList,
    Text,
    View,
    Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const BookInfo = ({ navigation, route }) => {
    const { data } = route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.Container]}>
                    <View style={[styles.imageFrame]}>
                        <Image source={{ "uri": data.image }} style={[styles.bookImage]} />
                    </View>
                    <View style={[styles.bookDetails]}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 40 }}>{data.bookName}</Text>
                        <View style={[styles.Rating]}>
                            <FontAwesome name='star' size={15} color='#D4A056' style={{}} />
                            <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>{data.averageRating}/5</Text>
                            <Text style={{ fontFamily: 'Poppins', fontSize: 15, color: 'grey' }}>({data.ratingsCount} Rated)</Text>
                        </View>
                        <View style={[styles.desc]}>
                            <Text style={{ fontFamily: 'Poppins', fontSize: 20}}>Description</Text>
                            <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey' ,marginLeft:23}}>{data.description}</Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


export default BookInfo;
const styles = StyleSheet.create({
    imageFrame: {
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',

    },
    bookImage: {
        width: 250,
        height: 350,
        borderRadius: 20
    },
    bookDetails: {
        paddingLeft: 30,
        paddingRight:20
       
    },
    Rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: -15
    },
    desc:{
        marginTop:5,
        marginLeft:3
    }
})