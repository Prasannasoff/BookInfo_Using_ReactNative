import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Animated,
    Dimensions,
    ActivityIndicator // Import ActivityIndicator for loading state
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/authSlice';
import { CommonActions } from '@react-navigation/native';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
function HomeScreen({ navigation }) {
    console.log('useDispatch:', useDispatch);
    const user = useSelector(state => state.auth.user);  //useSelector is a hook to pick data from store

    // console.log(user.uid)

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogOut = async () => {
        setLoading(true);
        try {
            // Check if the user is logged in before trying to clear
            if (user) {
                await dispatch(clearUser());
                navigation.navigate("userAuthentication");
            } else {
                console.log("User is not logged in");
                navigation.navigate("userAuthentication");
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };


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
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                <View style={styles.img}>
                    <View style={{ alignItems: 'flex-end', width: windowWidth, marginTop: 50, position: 'absolute', paddingRight: 10 }}>
                        <Button onPress={handleLogOut} title="LogOut"></Button>
                    </View>
                    <Image source={require('./images/man-reading-book-white-background-removebg-preview 1.png')} style={{ width: 350, height: 420, top: 76 }} />

                </View>
            }
            <View style={styles.Container}>
                <Animated.View style={[styles.design, {
                    height: windowHeight > 500 ? 340 : 500,
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
                        <TouchableOpacity style={styles.Homebtn} onPress={() => navigation.navigate("BookTabs")}>
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
        height: windowHeight,
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
