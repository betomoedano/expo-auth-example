import { Image, StyleSheet, Platform, View, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams } from "expo-router";

export default function DeeplinkScreen() {
  const { deeplink } = useLocalSearchParams();
  console.log(deeplink);
  return (
    <View style={styles.container}>
      <ThemedText type="title">Deep link</ThemedText>
      <ThemedText type="subtitle">{deeplink}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
