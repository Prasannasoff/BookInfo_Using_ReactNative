import React, { useEffect, useRef, useState } from 'react';
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


const BookInfo = ({ navigation, route }) => {
    const likePng = require('./images/like (1).png');
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);
    const scale = useSharedValue(0);
    const scale2 = useSharedValue(1);
    const opacity2 = useSharedValue(1);







    const opacityValue = useSharedValue(1)
    const doubleTapRef = useRef(null)
    const reanimatedStyle2 = useAnimatedStyle(() => {
        return {

            opacity: opacityValue.value

        }
    });
    const reanimatedStyle3 = useAnimatedStyle(() => {
        return {
            opacity: opacity2.value,
            transform: [{ scale: Math.max(1, scale2.value) }] //Here why we are giving Math.max means due to spring effect the scale of heart will come to -1 to 0 (i.e Upside down). Inorder to avoid that we are giving this.





        }
    })
    const reanimatedStyle = useAnimatedStyle(() => {
        return {

            transform: [{ scale: Math.max(0, scale.value) }] //Here why we are giving Math.max means due to spring effect the scale of heart will come to -1 to 0 (i.e Upside down). Inorder to avoid that we are giving this.

        }
    })
    const { data } = route.params;

    const onSingleTap = () => {
        console.log("Pressed")
        if (opacityValue.value === 1) {

            opacityValue.value = withSpring(0.3);
            opacity2.value = withSpring(1),
                scale2.value = withSpring(1.5)
        }
        else {

            opacityValue.value = withSpring(1)
            scale2.value = withSpring(1)


        }

    }
    const onDoubleTap = () => {
        scale.value = withSpring(1, undefined, () => {
            scale.value = 0
        })
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView>
                <ScrollView>

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
                                        <AnimatedBackground source={{ uri: data.image }} style={[styles.bookImage, reanimatedStyle3]}
                                            onError={(e) => console.log('Error loading image:', e.nativeEvent.error)} />
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
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>{data.averageRating}/5</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey' }}>({data.ratingsCount} Rated)</Text>
                            </View>
                            <View style={[styles.desc]}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 20 }}>Description</Text>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 12, color: 'grey', marginLeft: 23 }}>{data.description}</Text>

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
        backgroundColor: 'grey'

    },
    bookImage: {
        borderRadius: 20,
        width: 260,
        height: 360



    },
    bookDetails: {
        paddingLeft: 30,
        paddingRight: 20

    },
    Rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        
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

    }
})