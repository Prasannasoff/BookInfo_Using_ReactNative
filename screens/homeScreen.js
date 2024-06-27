import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Image,
    Animated,
    ActivityIndicator // Import ActivityIndicator for loading state
} from 'react-native';


function HomeScreen({ navigation }) {

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    // Create an animated value
    const translateY = useRef(new Animated.Value(windowHeight)).current;

    // Run the animation when the component mounts
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    // Show loading indicator until fonts are loaded


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.img}>
                <Image source={require('../assets/man-reading-book-white-background-removebg-preview 1.png')} style={{ width: 350, height: 380, top: 76 }} />
            </View>
            <View style={styles.Container}>
                <Animated.View style={[styles.design, {
                    height: windowHeight > 500 ? 380 : 500,
                    width: windowWidth > 500 ? windowWidth : windowWidth,
                    transform: [{ translateY }] // Apply the animated value to the transform
                }]}>
                    <View style={styles.header}>
                        <Text style={{ fontFamily: 'Poppins', fontSize: 35, fontWeight: '300' }}>Read EveryTime</Text>
                        <View>
                            <View style={{ width: 230, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '200', color: '#808080' }}>
                                    Buy and read your favourite
                                </Text>
                            </View>
                            <View style={{ width: 200, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '200', color: '#808080' }}>book with best price</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 50, width: 320 }}>
                        <TouchableOpacity style={styles.Homebtn} onPress={() => navigation.navigate("BookList")}>
                            <Text style={{ fontSize: 17, color: 'white', fontWeight: '500', fontFamily: 'Poppins' }}>
                                Get Started
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        height: 510,
    },
    Container: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    design: {
        elevation: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopStartRadius: 80,
        borderTopEndRadius: 80,
        zIndex: 2,
        elevation: 5,
        position: 'absolute',
        bottom: 0, // Ensure the initial position is at the bottom
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        gap: 1,
    },
    Homebtn: {
        backgroundColor: '#D4A056',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 17,
        borderRadius: 50,
    },
});
