import { View, Text, Button, FlatList, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from 'react-native-reanimated';
const { width } = Dimensions.get('window')

function FavouriteScreen() {
    const user = useSelector(state => state.auth.user);
    const [data, setData] = useState('');
    const [reload, setReLoad] = useState(false);
    useEffect(() => {
        const getData = async () => {

            const uid = user.uid;
            try {
                const getFavourites = await axios.get("http://192.168.0.105:5000/api/bookDetails/getFavourites", { params: { uid } });
                setData(getFavourites.data);

            }
            catch (error) {
                console.log(error);
            }


        }
        getData();
    }, [reload]); //getData function is called whenever reload button is pressed i.e reload state variable changes;
    const UpdateList = (bookId) => {
        setData((prevData) => prevData.filter(item => item._id !== bookId)); //This function is called in DragableCards Component.
    }
    const displayFavourites = ({ item }) => {
        return <DragableCards item={item} UpdateList={UpdateList} />
    }
    const HandleReLoad = () => {
        setReLoad(!reload)
    }

    return (

        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 50, flex: 1, padding: 5 }}>
                <Text style={{ fontSize: 20 }}>Favourite List</Text>
                <View style={{ width: 70, marginLeft: width / 1.4 }}>
                    <Button title='reload' onPress={HandleReLoad}></Button>
                </View>
                <View style={[styles.list, { alignItems: 'center', justifyContent: 'center' }]}>
                    <FlatList
                        data={data}
                        renderItem={displayFavourites}
                        keyExtractor={(item) => item._id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

            </View>
        </View>
    )
}
const DragableCards = ({ item, UpdateList }) => {

    const user = useSelector(state => state.auth.user);
    // const [deleteFav, setDeleteFav] = useState(false);
    const uid = user.uid;
    const bookId = item._id;
    const thresHold = -width * 0.4 //This given when we swipe left side by 40% of width then deletion should perform
    const dragX = useSharedValue(0);
    const handleDelete = async () => {
        try {
            console.log("Deleting favourite:", uid, bookId);
            const response = await axios.delete("http://192.168.0.105:5000/api/bookDetails/deleteFavourites", { params: { uid, bookId } });
            console.log(response.data);
            runOnJS(UpdateList)(bookId)//UpdateList function is called here
        } catch (error) {
            console.error('Error deleting favourite:', error);
        }
    };

    const GestureHandler = useAnimatedGestureHandler({
        onActive: (e) => {
            dragX.value = e.translationX;
        },
        onEnd: (e) => {
            if (e.translationX < thresHold) {
                dragX.value = withTiming(-width, {}, () => {
                    runOnJS(handleDelete)(); //Reanimated does not allow axios request.So we are using runOnJS.This function allows you to call regular JavaScript functions, like removeFavouriteFromState, from within a Reanimated worklet. Since handleDelete involves an Axios request and state update, it must be called on the JavaScript thread using runOnJS.
                });

            } else {
                dragX.value = withTiming(0);
            }
        }
    });
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const AnimatedText = Animated.createAnimatedComponent(Text);



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
    return (
        <GestureHandlerRootView>

            <PanGestureHandler onGestureEvent={GestureHandler}>
                <Animated.View style={[styles.card, dragContainer]}>

                    <Animated.View style={[styles.cardDetails]}>
                        <AnimatedImage source={{ uri: item.image }} style={{ width: 60, height: 100 }} resizeMode='contain'></AnimatedImage>
                        <Animated.View style={{ flex: 1, flexDirection: 'column' }}>
                            <AnimatedText style={{ fontFamily: 'Poppins', fontSize: 15 }}>{item.bookName}</AnimatedText>
                            <AnimatedText style={{ fontSize: 12 }}>{item.author}</AnimatedText>
                            <Animated.View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: 5 }}>
                                <Button title='Delete' onPress={handleDelete} color='red' />
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    )


}
export default FavouriteScreen
const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    card: {
        width: width / 1.1,
        backgroundColor: '#D9D9D9',
        flex: 1,
        marginTop: 15,
        borderRadius: 15,
        padding: 5,
        paddingLeft: 10

    },
    cardDetails: {
        flex: 1,
        gap: 10,
        flexDirection: 'row',


    }
})