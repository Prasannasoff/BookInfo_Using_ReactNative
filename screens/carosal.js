import React from 'react';
import { Dimensions, StyleSheet, View, Text, Image, FlatList, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
const { width: WSIZE, height: HSIZE } = Dimensions.get('window')

const CategoryData = [
  {
    id: 1,
    category: "AutoBiography",
    image: require('../assets/autobiography.jpg')
  },
  {
    id: 2,
    category: "Thriller",
    image: require('../assets/GHOST CATEGORY.jpg')
  },
  {
    id: 3,
    category: "Comics",
    image: require('../assets/Comics.jpg')
  }
];
const { width } = Dimensions.get('window');

const Carousel = () => {

  const displayData = ({ item }) => {

    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <ImageBackground source={item.image} style={{ width: WSIZE, height: HSIZE }}>
          <View style={{ alignItems: 'center', justifyContent: 'center',flex:1 }}>
            <Text style={{fontSize:50,color:'white'}}>{item.category}</Text>
          </View>
        </ImageBackground>


      </View>
    )


  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <FlatList data={CategoryData} 
        renderItem={displayData} 
        keyExtractor={(item) => item.id} 
        horizontal={true} 
        showsHorizontalScrollIndicator
        bounces={false}
        pagingEnabled //This helps to move the carousal page by pagy.The flow will not be stopped in the middle

          ></FlatList>
      </View>

    </GestureHandlerRootView>
  );
};


export default Carousel;
