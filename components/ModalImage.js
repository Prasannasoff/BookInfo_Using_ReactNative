import React from 'react';
import { View, Image, Dimensions, Button, StyleSheet } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width: Wsize, height: Hsize } = Dimensions.get('window');

export default function ModalImage({ img, onClose }) {
    // const AnimatedImage = Animated.createAnimatedComponent(Image);

    // // Shared values for scale and focal points
    // const scale = useSharedValue(1);
    // const focalX = useSharedValue(0);
    // const focalY = useSharedValue(0);

    // // Gesture handler for pinch gesture
    // const pinchHandler = useAnimatedGestureHandler({
    //     onStart: (event, ctx) => {
    //         // Store initial scale and focal points for calculations
    //         ctx.initialScale = scale.value;
    //         ctx.initialFocalX = focalX.value;
    //         ctx.initialFocalY = focalY.value;
    //     },
    //     onActive: (event, ctx) => {
    //         // Update scale and focal points based on pinch gesture
    //         scale.value = ctx.initialScale * event.scale;
    //         focalX.value = event.focalX;
    //         focalY.value = event.focalY;
    //     },
    //     onEnd: () => {
    //         // Reset scale using withTiming when gesture ends
    //         scale.value = withTiming(1);
    //     },
    // });

    // // Animated style for image transformation
    // const rStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [
    //             { translateX: focalX.value },
    //             { translateY: focalY.value },
    //             { translateX: -Wsize / 2 },
    //             { translateY: -Hsize / 2 },
    //             { scale: scale.value },
    //             { translateX: -focalX.value * scale.value },
    //             { translateY: -focalY.value * scale.value },
    //             { translateX: Wsize / 2 },
    //             { translateY: Hsize / 2 },
    //         ],
    //     };
    // });

    return (
        <View style={{ flex1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            {/* <PinchGestureHandler onGestureEvent={pinchHandler}> */}
            <View style={{ flex: 1 }}>
                <Image source={{ uri: img }} style={[{ width: Wsize / 1.2, height: Hsize / 1.5 }]} resizeMode='contain' />
            </View>
            {/* </PinchGestureHandler> */}
            <Button title="close" onPress={onClose} />
        </View>
    );
}

const styles = StyleSheet.create({
    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
    },
});
