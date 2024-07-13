import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, interpolateColor, Extrapolation } from 'react-native-reanimated';
import React from 'react';

const { width } = Dimensions.get('screen');

const Pagination = ({ data, scrollX }) => {
    return (
        <View style={styles.container}>
            {data.map((_, idx) => {
                //(idx - 1) * screenWidth: This calculates the start of the range for the current dot. 
                // /idx * screenWidth: This represents the middle point of the range for the current dot.
                //(idx + 1) * screenWidth: This calculates the end of the range for the current dot
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
                const animatedStyle = useAnimatedStyle(() => {
                    //interpolate is used to convert an input value (e.g., scroll position, animation progress) into a desired output value (e.g., position, scale, rotation).
                    const dotWidth = interpolate(
                        scrollX.value,
                        // The inputRange specifies the range of the animated value, and the outputRange specifies the range of the desired output values. The interpolate function then maps the input values to the output values accordingly.
                        inputRange,
                        [12, 40, 12],//output range  is the final dot width.
                        Extrapolation.CLAMP,
                    );




                    const backgroundColor = interpolateColor(
                        scrollX.value,
                        inputRange,
                        ['#ccc', '#000', '#ccc'],

                    );

                    return {
                        width: dotWidth,
                        backgroundColor: backgroundColor,
                    };
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            styles.dot,
                            animatedStyle
                            // idx === index && styles.dotActive,
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {

        position: 'absolute',
        bottom: 35,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,

    },

});