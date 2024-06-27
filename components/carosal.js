import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Carousel = () => {
 
  return (
<View style={{alignItems:'center',justifyContent:'center',flex:1}}><Text>Comming Soon!!!</Text></View>
  );
};


export default Carousel;
