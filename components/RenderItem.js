import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolation } from 'react-native-reanimated';
const { width: WSIZE, height: HSIZE } = Dimensions.get('window')
function RenderItem({ item, index, x, navigation }) {

    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(
            x.value,
            [
                (index - 1) * WSIZE,
                index * WSIZE,
                (index + 1) * WSIZE,
            ],
            [0.2, 2, 0], //Atfirst the scale will be middle(i.e when not scrolling the scale will be 2),When we scroll from first page to second page,Then during scrolling the right end output range (i.e 0.2) scale will be applied to first page and left end(i.e 1) applied to second page
            Extrapolation.CLAMP,
        );

        return {
            transform: [{ scale: scale }],
        };
    });


    return (
        <View style={[styles.itemContainer]}>


            <Animated.View
                style={[
                    styles.CircleAnimation,
                    {

                        backgroundColor: item.backgroundColor,

                    },
                    circleAnimation,
                ]}
            />
            <View>
                <View style={[styles.imageFrame]}>
                    <Image source={item.image} style={[styles.bgImage]}></Image>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, color: 'black', fontFamily: 'Poppins' }}>{item.category}</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={[styles.buttonFrame]} onPress={() => navigation.navigate("BookList")}>
                        <Text style={{ fontFamily: 'Poppins' }}>Select Category</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>




    )
};
export default RenderItem;
const styles = StyleSheet.create({
    itemContainer: {
        width: WSIZE,
        height: HSIZE,
        justifyContent: 'center',
        alignItems: 'center',



    },
    imageFrame: {
        width: WSIZE / 1.3,
        height: HSIZE / 1.8,
        borderRadius: 20,
        overflow: 'hidden',


    },
    bgImage: {
        width: '100%',
        height: '100%'
    },
    CircleAnimation: {
        position: 'absolute',
        alignItems: 'center',
        width: WSIZE / 2.2,
        height: HSIZE / 2.4,
        borderRadius:10,
       


    },
    buttonFrame: {
        width: 140,
        elevation: 2,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'

    }
})