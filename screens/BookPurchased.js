import { View, Text, Button, Image, Dimensions, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen')
const BookPurchased = () => {
    const [reload, setReload] = useState(false);
    const [purchasedDetail, setPurchasedDetail] = useState([]);
    const user = useSelector(state => state.auth.user);
    useEffect(() => {
        const userPurchased = async () => {
            try {
                const uid = user.uid;
                const response = await axios.get('http://192.168.0.106:5000/api/bookDetails/getPurchasedBook', { params: { uid } });
                setPurchasedDetail(response.data);

            }
            catch (error) {
                console.log(error);
            }
        }
        userPurchased();
    }, [reload]);

    const displayPurchasedBooks = ({ item }) => {
        return (

            <View style={[styles.card]}>
                <Image source={{ uri: item.image }} style={{ width: width / 3.2, height: height / 4.5 }} resizeMode='contain'></Image>
                <View style={[styles.cardDetails]}>

                    <Text style={{ fontFamily: 'Poppins', fontSize: 22 }}>{item.bookName}</Text>


                    <Text style={{ fontSize: 12, color: 'grey', marginTop: -5 }}>{item.author}</Text>

                    <Text style={{ fontSize: 17, fontFamily: 'Poppins' }}>Books Ordered : {item.bookCount}</Text>
                    <View style={[styles.btns]}>
                        <TouchableOpacity style={[styles.rateBtn]}>
                            <FontAwesome5 name='star' size={15} color='white' style={{}} />
                            <Text style={{ fontSize: 15, color: 'white' }}>Rate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookBtn}>

                            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 3 }}>
                                <FontAwesome5 name='rupee-sign' size={12} color='white' style={{}} />
                                <Text style={{ fontSize: 12, color: 'white', fontWeight: '500', fontFamily: 'Poppins' }}>
                                    {item.amountPaid}
                                </Text>

                            </View>
                        </TouchableOpacity>

                    </View>


                </View>
            </View>

        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 50, flex: 1, padding: 5 }}>
                <Text style={{ fontSize: 20 }}>Purchased List</Text>
                <View style={{ width: 70, marginLeft: width / 1.4 }}>
                    <Button title='reload' onPress={() => setReload(!reload)}></Button>

                </View>
                <View style={[styles.list, { justifyContent: 'center' }]}>
                    <FlatList
                        data={purchasedDetail}
                        renderItem={displayPurchasedBooks}

                        showsHorizontalScrollIndicator={false}
                    />
                </View>

            </View>
        </View>
    )
}

export default BookPurchased;
const styles = StyleSheet.create({
    list: {
        flex: 1,
        padding: 5,
    },

    card: {
        paddingLeft: 5,
        marginTop: 15,

        width: width / 1.2,
        flex: 1,
        gap: 10,
        flexDirection: 'row',


    },
    cardDetails: {
        flex: 1,
        flexDirection: 'column'
    },
    btns: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:5,
        
    },
    rateBtn: {
        width: width / 6,
        padding: 5,
        backgroundColor: '#D4A056',
        gap: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bookBtn: {
        width: width / 6,
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 5,
        gap: 5,
        borderRadius: 5,
        flexDirection: 'row',


    },
})