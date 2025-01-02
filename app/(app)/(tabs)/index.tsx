import { Image, StyleSheet, Platform, View, Button } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Link,
  useFocusEffect,
  useNavigation,
  useNavigationContainerRef,
  usePathname,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useAuth } from "@/context/auth";

export default function HomeScreen() {
  const { setUser } = useAuth();
  return (
    <View style={styles.container}>
      <ThemedText type="title" testID="home">
        Home
      </ThemedText>
      <Link href={"/"}>Go to deeplink screen</Link>
      <Button title="Sign out" color="red" onPress={() => setUser(undefined)} />
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
