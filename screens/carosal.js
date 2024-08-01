import React, { useState, useRef } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, FlatList, ImageBackground } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Pagination from '../components/Pagination';
import RenderItem from '../components/RenderItem';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef } from 'react-native-reanimated';
const { width: WSIZE, height: HSIZE } = Dimensions.get('window')

const CategoryData = [
  {
    id: 1,
    category: "AutoBiography",
    image: require('./images/autobiography.jpg'),
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    category: "Thriller",
    image: require('./images/GHOST CATEGORY.jpg'),
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    category: "Comics",
    image: require('./images/Comics.jpg'),
    backgroundColor: '#faeb8a',

  }
];
const { width } = Dimensions.get('window');

const Carousel = ({navigation}) => {

  const flatListIndex = useSharedValue(0);

  const x = useSharedValue(0); // first animated.Value for Scroll X is 0 then when user swipe, the scrollX value also moves since we are updating in Animated event
const index=useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });


  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0]?.index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };



  return (


    <View style={styles.container}>
      <Animated.FlatList
        data={CategoryData}

        onScroll={onScroll}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} x={x} navigation={navigation} />;
        }}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        pagingEnabled //This helps to move the carousal page by page.The flow will not be stopped in the middle

        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={0.5} // Modify this value to reduce the scroll speed
        onViewableItemsChanged={onViewableItemsChanged} // An array of items that are currently viewable which means when we scroll to 2nd page the content in second page can be used.Here we are doing to get the index.
        // view area coverage percentage
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <Pagination data={CategoryData} scrollX={x} ></Pagination>
    </View>


  );
};


export default Carousel;
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
