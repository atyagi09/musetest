import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [visible, setVisible] = useState(false);
  const pop = useRef(new Animated.Value(0)).current; // entrance spring
  const dance = useRef(new Animated.Value(0)).current; // continuous dance
  const loopRef = useRef(null);

  const handlePush = () => {
    setVisible(true);
    pop.setValue(0);
    dance.setValue(0);

    Animated.spring(pop, {
      toValue: 1,
      friction: 4,
      tension: 120,
      useNativeDriver: true,
    }).start();

    if (loopRef.current) {
      loopRef.current.stop();
    }
    loopRef.current = Animated.loop(
      Animated.timing(dance, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      }),
    );
    loopRef.current.start();
  };

  const bounce = dance.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -32, 0, -16, 0],
  });
  const wiggle = dance.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '-12deg', '10deg', '-6deg', '0deg'],
  });
  const groove = dance.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.22, 1],
  });
  const scale = Animated.multiply(pop, groove);

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handlePush}
      >
        <Text style={styles.buttonText}>Push</Text>
      </Pressable>

      {visible && (
        <Animated.Text
          style={[
            styles.shutUp,
            { transform: [{ translateY: bounce }, { rotate: wiggle }, { scale }] },
          ]}
        >
          Shut Up!!
        </Animated.Text>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
  },
  button: {
    backgroundColor: '#ff3b30',
    paddingVertical: 18,
    paddingHorizontal: 64,
    borderRadius: 999,
  },
  buttonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
  },
  shutUp: {
    fontSize: 54,
    fontWeight: '900',
    color: '#111',
  },
});
