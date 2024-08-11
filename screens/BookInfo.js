import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Modal, Pressable, Alert, TouchableOpacity, Dimensions } from 'react-native'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

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
    withRepeat,
    runOnJS,
    useAnimatedGestureHandler

} from 'react-native-reanimated'
import { ScrollView, GestureHandlerRootView, TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')
const counterWidth = width / 4;
import ModalImage from '../components/ModalImage';


const BookInfo = ({ navigation, route }) => {
    const RatingData = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },

    ];
    const [counter, setCounter] = useState(0);
    const counterUpdatedRef = useRef(false); // Use useRef to track if the counter has been updated
    const [dropdown, setDropDown] = useState(false);
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
            const response = await axios.post('http://192.168.0.106:5000/api/bookDetails/favourites', { userDetail, data });
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }


    }

    const handleRating = () => {
        setDropDown(!dropdown); // Toggle dropdown visibility


    }
    //If you have a component that re-renders frequently, re-creating functions can lead to unnecessary memory usage and slight performance degradation.
    // /Using useCallback ensures that the incrementCount and decrementCount functions are only re-created when their dependencies change. If we failed to give when useState rerenders new function will be created again and again
    const incrementCount = useCallback(() => {

        setCounter((currentCount) => currentCount + 1);
    }, []);

    const decrementCount = useCallback(() => {
        setCounter((currentCount) => currentCount - 1);
    }, []);

    const MAX_SLIDE_OFFSET = counterWidth * 0.3;
    const dragX = useSharedValue(0);
    const handleGesture = useAnimatedGestureHandler({

        onActive: (e) => {
            dragX.value = e.translationX,
                //If e.translationX is greater than -MAX_SLIDE_OFFSET, it returns e.translationX. If e.translationX is less than -MAX_SLIDE_OFFSET, it returns -MAX_SLIDE_OFFSET. This effectively sets the minimum value of dragX.value to -MAX_SLIDE_OFFSET.
                dragX.value = Math.min(Math.max(
                    e.translationX,
                    -MAX_SLIDE_OFFSET,

                ), MAX_SLIDE_OFFSET);



        },
        onEnd: (e) => {
            dragX.value = withTiming(0);
            if (dragX.value === MAX_SLIDE_OFFSET) {
                // Increment
                runOnJS(incrementCount)();
            } else if (dragX.value === -MAX_SLIDE_OFFSET) {
                // Decrement
                runOnJS(decrementCount)();
            }
        }
    });

    const dragContainer = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: dragX.value
                }
            ]
        }
    }
    )
    const AnimatedText = Animated.createAnimatedComponent(Text);

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
                                <TouchableOpacity onPress={handleRating}>
                                    <FontAwesome name='star' size={15} color='#D4A056' style={{}} />
                                </TouchableOpacity>
                                {dropdown && <View style={[styles.dropdown]}>
                                    {RatingData.map((item) => (
                                        <TouchableOpacity key={item.value} style={styles.dropdownItem} onPress={() => {
                                            console.log(item.value); // Handle the selected rating
                                            setDropDown(false); // Hide dropdown after selection
                                        }}>
                                            <Text style={{ fontSize: 20 }}>{item.label}</Text>
                                        </TouchableOpacity>
                                    ))}




                                </View>}
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>{data.rating}/5</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey' }}>No.of purchased{data.No_of_Purchased}</Text>
                            </View>
                            <View style={[styles.desc]}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 20 }}>Description</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey', marginLeft: 23 }}>{data.overview}</Text>

                            </View>
                            <View style={[styles.CounterCont]}>
                                <PanGestureHandler onGestureEvent={handleGesture}>
                                    <Animated.View style={[styles.Counter]}>
                                        <FontAwesome name='minus' size={15} color='white' style={{}} />

                                        <Animated.View style={[styles.countDesign, dragContainer]}>
                                            <AnimatedText>{counter}</AnimatedText>
                                        </Animated.View>

                                        <FontAwesome name='plus' size={15} color='white' style={{}} />




                                    </Animated.View>
                                </PanGestureHandler>
                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </GestureHandlerRootView >
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
    dropdown: {
        marginLeft: 20,
        top: 20,


        justifyContent: 'center',
        flex: 1,
        zIndex: 5,
        backgroundColor: 'white',
        flexDirection: 'column',
        backgroundColor: 'white',
        position: 'absolute',

        width: 120,
        gap: 2

    },
    dropdownItem: {

        paddingLeft: 15,
        borderBottomWidth: 1 / 4,
        borderBottomColor: 'grey',


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
    CounterCont: {
        flex: 1,
        alignItems: 'flex-end',

    },
    Counter: {
        width: counterWidth,
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black'
    },
    countDesign: {
        zIndex: 10,
        borderRadius: 300,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey'
    }


})