import { View, Text, Button, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useCallback } from 'react'
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSpring,
    withRepeat,
    runOnJS,
    useAnimatedGestureHandler

} from 'react-native-reanimated';

import { FontAwesome5 } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const counterWidth = width / 4;
function BuyNowModal({ data, onClose }) {
    const user = useSelector(state => state.auth.user);
    const [counter, setCounter] = useState(0);

    const AnimatedText = Animated.createAnimatedComponent(Text);
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
    const handlePay = async () => {
        const { uid } = user;

        try {
            const response = await axios.post('http://192.168.0.106:5000/api/bookDetails/purchaseBook', { uid, data, counter });
            console.log(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }
    return (
        <View style={[styles.buyNowModalContainer]}>
            <GestureHandlerRootView>
                <View style={[styles.billCont]}>
                    <View style={[styles.header]}>
                        <Text style={{ fontSize: 22, color: 'black', fontWeight: '500', fontFamily: 'Poppins' }}>{data.bookName}</Text>
                        <Text style={{ fontSize: 15, color: 'grey', fontWeight: '500', fontFamily: 'Poppins', marginTop: -10 }}>{data.author}</Text>
                    </View>
                    <View style={[styles.billDetails]}>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: '500' }}>Category : {data.category}</Text>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: '500' }}>Price : Rs.{data.price} </Text>
                        <Text style={{ fontSize: 17, color: 'black', fontWeight: '500' }}>Number Of Books : {counter} </Text>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: '700' }}>Total : {data.price * counter} </Text>



                    </View>
                </View>
                <Animated.View style={[styles.CounterCont]}>
                    <PanGestureHandler onGestureEvent={handleGesture}>
                        <Animated.View style={[styles.Counter]}>
                            <TouchableOpacity onPress={decrementCount}>
                                <FontAwesome5 name='minus' size={15} color='white' style={{}} />
                            </TouchableOpacity>
                            <Animated.View style={[styles.countDesign, dragContainer]}>
                                <AnimatedText>{counter}</AnimatedText>
                            </Animated.View>
                            <TouchableOpacity onPress={incrementCount}>

                                <FontAwesome5 name='plus' size={15} color='white' style={{}} />
                            </TouchableOpacity>




                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
                <View style={[styles.payCont]}>
                    <TouchableOpacity style={styles.bookBtn} onPress={handlePay}>
                        <Text style={{ fontSize: 17, color: 'white', fontWeight: '500', fontFamily: 'Poppins' }}>
                            Pay
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 3 }}>
                            <FontAwesome5 name='rupee-sign' size={17} color='white' style={{}} />
                            <Text style={{ fontSize: 17, color: 'white', fontWeight: '500', fontFamily: 'Poppins' }}>
                                {data.price * counter}
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.cancelBtn} onPress={onClose} >
                        <Text style={{ fontSize: 17, color: 'white', fontWeight: '500', fontFamily: 'Poppins' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </GestureHandlerRootView>
        </View>
    )
}
export default BuyNowModal
const styles = StyleSheet.create({
    buyNowModalContainer: {
        height: height / 2.3,

        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    billCont: {
        gap: 20
    },
    CounterCont: {
        flex: 1,
        marginRight: 20,
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
    },
    payCont: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    bookBtn: {
        width: width / 2.6,
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: '#D4A056',
        padding: 10,
        gap: 10,
        borderRadius: 10,
        flexDirection: 'row',
        PaddingTop: 10

    },
    cancelBtn: {
        width: width / 2.6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',

    },
    header: {
        flexDirection: 'column',

    }
})