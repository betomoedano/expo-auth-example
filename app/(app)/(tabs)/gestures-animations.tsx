import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { appleBlue, appleGreen, appleRed } from "@/constants/Colors";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Directions,
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated from "react-native-reanimated";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const Box = ({
  style,
  children,
}: {
  style?: ViewStyle;
  children?: React.ReactNode;
}) => {
  return (
    <Animated.View
      style={
        StyleSheet.compose(
          {
            width: 200,
            height: 200,
            backgroundColor: appleBlue,
            borderRadius: 16,
          },
          style
        ) as ViewStyle
      }
    >
      {children}
    </Animated.View>
  );
};

// Pan gesture
const PanGestureExample = () => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd((e) => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value.x,
      },
      {
        translateY: offset.value.y,
      },
    ],
  }));

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Pan Gesture</ThemedText>
      <ThemedText>Drag the box around</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={panGesture}>
          <Box style={animatedStyle} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Tap gesture
const TapGestureExample = () => {
  const scale = useSharedValue(1);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onBegin((e) => {
      scale.value = withSpring(1.5);
    })
    .onFinalize((e) => {
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Tap Gesture</ThemedText>
      <ThemedText>Tap the box</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={tapGesture}>
          <Box style={animatedStyle} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Long Press Gesture Example
const LongPressGestureExample = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scale.value = withSpring(1.3);
      opacity.value = withTiming(0.5);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      opacity.value = withTiming(1);
    });

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Long Press Gesture</ThemedText>
      <ThemedText>Tap the box</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={longPressGesture}>
          <Box style={animatedStyles} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Rotation Gesture Example
const RotationGestureExample = () => {
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}rad` }],
  }));

  const rotationGesture = Gesture.Rotation().onUpdate((e) => {
    rotation.value = e.rotation;
  });

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Rotation Gesture</ThemedText>
      <ThemedText>Rotation the box</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={rotationGesture}>
          <Box style={animatedStyles} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Pinch Gesture Example
const PinchGestureExample = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Pinch Gesture</ThemedText>
      <ThemedText>Pinch the box</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={pinchGesture}>
          <Box style={animatedStyles} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Fling Gesture Example
const FlingGestureExample = () => {
  const position = useSharedValue(0);
  const flingGesture = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onStart((e) => {
        position.value = withTiming(position.value + 10, { duration: 100 });
      }),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onStart((e) => {
        position.value = withTiming(position.value - 10, { duration: 100 });
      })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Fling Gesture</ThemedText>
      <ThemedText>Quickly swipe left or right to fling the box.</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={flingGesture}>
          <Box style={animatedStyle} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Composed Gestures Example
const ComposedGesturesExample = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
      {
        translateX: offset.value.x,
      },
      {
        translateY: offset.value.y,
      },
    ],
  }));
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd((e) => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    pinchGesture,
    Gesture.Simultaneous(rotationGesture, panGesture)
  );

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Composed Gesture</ThemedText>
      <ThemedText>Pinch and rotate the box simultaneously</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={composed}>
          <Box style={animatedStyles} />
        </GestureDetector>
      </View>
    </View>
  );
};

// Race Gestures Example
const RaceGesturesExample = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${rotation.value}rad` }],
  }));

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Race(pinchGesture, rotationGesture);

  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Race Gesture</ThemedText>
      <ThemedText>Race between pinch and rotate</ThemedText>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureDetector gesture={composed}>
          <Box style={animatedStyles} />
        </GestureDetector>
      </View>
    </View>
  );
};

const SwipeableComponent = () => {
  const RightAction = (
    prog: SharedValue<number>,
    drag: SharedValue<number>
  ) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value + 50 }],
    }));

    return (
      <Pressable onPress={() => alert("You have pressed right action!")}>
        <Animated.View
          style={[
            styleAnimation,
            {
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              borderWidth: 1,
              backgroundColor: "white",
              borderLeftWidth: 0,
            },
          ]}
        >
          <IconSymbol name="trash" color={appleRed} />
        </Animated.View>
      </Pressable>
    );
  };
  const LeftAction = (prog: SharedValue<number>, drag: SharedValue<number>) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [{ translateX: drag.value - 50 }],
    }));

    return (
      <Pressable onPress={() => alert("You have pressed left action!")}>
        <Animated.View
          style={[
            styleAnimation,
            {
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              borderWidth: 1,
              backgroundColor: "white",
              borderRightWidth: 0,
            },
          ]}
        >
          <IconSymbol name="checkmark" color={appleGreen} />
        </Animated.View>
      </Pressable>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ThemedText type="subtitle">Swipeable Component</ThemedText>
      <ScrollView contentContainerStyle={{ rowGap: 12, marginTop: 16 }}>
        {["😅 item 1", "🚀 item 2", "📢 new course!"].map((item) => (
          <ReanimatedSwipeable
            key={item}
            renderRightActions={RightAction}
            renderLeftActions={LeftAction}
            friction={2}
            rightThreshold={40}
            enableTrackpadTwoFingerGesture
          >
            <View
              style={{
                width: "100%",
                height: 50,
                borderWidth: 1,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText>{item}</ThemedText>
            </View>
          </ReanimatedSwipeable>
        ))}
      </ScrollView>
    </View>
  );
};
export default function GesturesAndAnimations() {
  const [selectedExample, setSelectedExample] = useState("pan");

  const examples = {
    pan: <PanGestureExample />,
    tap: <TapGestureExample />,
    longPress: <LongPressGestureExample />,
    rotation: <RotationGestureExample />,
    pinch: <PinchGestureExample />,
    fling: <FlingGestureExample />,
    composed: <ComposedGesturesExample />,
    race: <RaceGesturesExample />,
    swipeable: <SwipeableComponent />,
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, gap: 6 }}>
        <ThemedText type="subtitle">Select an example</ThemedText>
        <ScrollView
          horizontal
          style={{ maxHeight: 50 }}
          contentContainerStyle={{ gap: 8, marginTop: 3 }}
        >
          {Object.keys(examples).map((example) => (
            <Button
              key={example}
              onPress={() => setSelectedExample(example)}
              variant={example === selectedExample ? "filled" : "outline"}
            >
              {example}
            </Button>
          ))}
        </ScrollView>
        {examples[selectedExample as keyof typeof examples]}
      </View>
    </SafeAreaView>
  );
}
