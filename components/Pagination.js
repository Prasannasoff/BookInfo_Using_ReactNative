import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('screen');

const Pagination = ({ data, scrollX, index }) => {
    return (
        <View style={styles.container}>
            {data.map((_, idx) => {
                //(idx - 1) * screenWidth: This calculates the start of the range for the current dot. 
                // /idx * screenWidth: This represents the middle point of the range for the current dot.
                //(idx + 1) * screenWidth: This calculates the end of the range for the current dot
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
                //interpolate is used to convert an input value (e.g., scroll position, animation progress) into a desired output value (e.g., position, scale, rotation).
                const dotWidth = scrollX.interpolate({
                    // The inputRange specifies the range of the animated value, and the outputRange specifies the range of the desired output values. The interpolate function then maps the input values to the output values accordingly.
                    inputRange,
                    outputRange: [12, 40, 12],//output range  is the final dot width.Which means after scrolling the width of 3 dots
                    extrapolate: 'clamp',
                });




                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#ccc', '#000', '#ccc'],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor },
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
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: '#000',
    },
});