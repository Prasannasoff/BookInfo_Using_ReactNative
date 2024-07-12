import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation } from 'react-native-reanimated';

function RenderItem({ item, index, x }) {
    const { width: WSIZE, height: HSIZE } = Dimensions.get('window')
    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [
                (index - 1) * WSIZE,
                index * WSIZE,
                (index + 1) * WSIZE,
            ],
            [1, 4, 4],
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ scale: scale }],
        };
    });


    return (
        <View style={[styles.itemContainer]}>

            <View style={[styles.CircleAnimation]}>
                <Animated.View
                    style={[
                        {
                            width: WSIZE,
                            height: WSIZE,
                            borderRadius: WSIZE / 2,
                            backgroundColor: item.backgroundColor,
                        },
                        circleAnimation,
                    ]}
                />
            </View>
            <View>
                <View style={[styles.imageFrame]}>
                    <Image source={item.image} style={[styles.bgImage]}></Image>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'black', fontFamily: 'Poppins' }}>{item.category}</Text>

                </View>
            </View>


        </View>

    )
};
export default RenderItem;
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 120,
    },
    imageFrame: {
        width: 300 / 1.2,
        height: 400 / 1.7,
        borderRadius: 20,
        overflow: 'hidden',


    },
    bgImage: {
        width: '100%',
        height: '100%'
    },
    CircleAnimation: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',


    }
})