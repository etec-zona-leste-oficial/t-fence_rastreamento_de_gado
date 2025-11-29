import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const PulsingMarker = () => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale, opacity]);

  const animatedPulseStyle = {
    transform: [
      {
        scale: scale,
      },
    ],
    opacity: opacity,
  };

  return (
    <View style={styles.container}>
        
        <View style={styles.dot}>
          <Animated.View style={[styles.pulse, animatedPulseStyle]} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  pulse: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderRadius: 25,
  },

  dot: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    position: "absolute",
    top: "20%",
    left: "20%",
  },
});

export default PulsingMarker;