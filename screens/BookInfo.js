import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, Alert } from 'react-native'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';
import {
    SafeAreaView,
    TextInput,
    StyleSheet,
    FlatList,
    Text,
    View,
    Image,
    ImageBackground,

} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withRepeat

} from 'react-native-reanimated'
import { ScrollView, GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

import ModalImage from '../components/ModalImage';
const BookInfo = ({ navigation, route }) => {
    const user = useSelector(state => state.auth.user);  //useSelector is a hook to pick data from store
    const [modalVisible, setModalVisible] = useState(false);
    const [imgModal, setImgModal] = useState(true);
    const likePng = require('./images/like (1).png');
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);
    const scale = useSharedValue(0);

    const [userDetail, setUserDetail] = useState('');

    useEffect(() => {
        setUserDetail(user.uid);
    }, []);






    const opacityValue = useSharedValue(1)
    const doubleTapRef = useRef(null)
    const reanimatedStyle2 = useAnimatedStyle(() => {
        return {

            opacity: opacityValue.value

        }
    });

    const reanimatedStyle = useAnimatedStyle(() => {
        return {

            transform: [{ scale: Math.max(0, scale.value) }] //Here why we are giving Math.max means due to spring effect the scale of heart will come to -1 to 0 (i.e Upside down). Inorder to avoid that we are giving this.

        }
    })
    const { data } = route.params;

    const onSingleTap = () => {
        console.log("Pressed")
        if (!modalVisible) {
            setModalVisible(true)
        }



    }
    const onDoubleTap = async () => {
        scale.value = withSpring(1, undefined, () => {
            scale.value = 0
        });
        try {
            console.log(userDetail)
            const response = await axios.post('http://192.168.0.109:5000/api/bookDetails/favourites', { userDetail, data });
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }


    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <ModalImage img={data.image} onClose={() => setModalVisible(false)} />
                        </Modal>
                    </View>

                    <Animated.View style={[styles.Container, reanimatedStyle2]}>
                        <View style={[styles.imageFrame]}>
                            <TapGestureHandler onActivated={onSingleTap} waitFor={doubleTapRef}>
                                <TapGestureHandler
                                    maxDelayMs={250}
                                    ref={doubleTapRef}
                                    numberOfTaps={2}
                                    onActivated={onDoubleTap}
                                >
                                    <Animated.View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                        {/* when we give resizeMode="contain" the image will not be cropped even though we reduce the size of the image */}
                                        <AnimatedBackground source={{ uri: data.image }} style={[styles.bookImage]} resizeMode="contain" />
                                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, position: 'absolute' }}>
                                            <AnimatedImage source={likePng} style={[reanimatedStyle, styles.likeImage]}></AnimatedImage>
                                        </View>
                                    </Animated.View>
                                </TapGestureHandler>
                            </TapGestureHandler>
                        </View>
                        <View style={[styles.bookDetails]}>
                            <Text style={{ fontFamily: 'Poppins', fontSize: 35 }}>{data.bookName}</Text>
                            <View style={[styles.Rating]}>
                                <FontAwesome name='star' size={15} color='#D4A056' style={{}} />
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>{data.rating}/5</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey' }}>No.of purchased{data.No_of_Purchased}</Text>
                            </View>
                            <View style={[styles.desc]}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 20 }}>Description</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey', marginLeft: 23 }}>{data.overview}</Text>

                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView>
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
        borderRadius: 20,
        width: 260,
        height: 360,




    },
    bookDetails: {
        paddingLeft: 30,
        paddingRight: 20

    },
    Rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: -15

    },
    desc: {
        marginTop: 5,
        marginLeft: 3
    },
    likeImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40

    },


})