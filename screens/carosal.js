import React, { useState, useRef } from 'react';
import { Dimensions, Animated, StyleSheet, View, Text, Image, FlatList, ImageBackground } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Pagination from '../components/Pagination';
const { width: WSIZE, height: HSIZE } = Dimensions.get('window')

const CategoryData = [
  {
    id: 1,
    category: "AutoBiography",
    image: require('./images/autobiography.jpg')
  },
  {
    id: 2,
    category: "Thriller",
    image: require('./images/GHOST CATEGORY.jpg')
  },
  {
    id: 3,
    category: "Comics",
    image: require('./images/Comics.jpg')
  }
];
const { width } = Dimensions.get('window');

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current; // first animated.Value for Scroll X is 0 then when user swipe, the scrollX value also moves since we are updating in Animated event

  const handleOnScroll = event => {
    Animated.event( // It allows you to map native events (such as scroll, gesture, and pan events) directly to animated values. This is particularly useful when you need to drive animations based on user interactions or other dynamic events. 
      [
        {
          nativeEvent: {
            contentOffset: { //contentOffset refers to the current scroll position of the list.
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;


  const displayData = ({ item }) => {

    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <ImageBackground source={item.image} style={{ width: WSIZE, height: HSIZE }}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 50, color: 'white' }}>{item.category}</Text>
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
          pagingEnabled //This helps to move the carousal page by page.The flow will not be stopped in the middle

          snapToAlignment="center"

          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged} // An array of items that are currently viewable which means when we scroll to 2nd page the content in second page can be used.Here we are doing to get the index.
           // view area coverage percentage
        />
        <Pagination data={CategoryData} scrollX={scrollX} index={index}></Pagination>
      </View>

    </GestureHandlerRootView>
  );
};


export default Carousel;
