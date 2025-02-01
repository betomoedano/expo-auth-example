import {
  Image,
  StyleSheet,
  Platform,
  View,
  Button,
  ScrollView,
} from "react-native";

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

import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const { setUser } = useAuth();
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();
  const [updateCheckResult, setUpdateCheckResult] =
    useState<Updates.UpdateCheckResult>();

  // useEffect(() => {
  //   if (isUpdateAvailable) {
  //     Updates.reloadAsync();
  //   }
  // }, [isUpdateAvailable]);

  async function chekcForUpdates() {
    const result = await Updates.checkForUpdateAsync();
    setUpdateCheckResult(result);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ThemedText type="title" testID="home" style={{ color: "orange" }}>
          Home
        </ThemedText>
        <Button
          title="Sign out"
          color="red"
          onPress={() => setUser(undefined)}
        />
        <Button
          title="Fetch updates"
          onPress={async () => await Updates.fetchUpdateAsync()}
        />
        <Button title="Check for updates" onPress={chekcForUpdates} />
        <ThemedText>{JSON.stringify(updateCheckResult, null, 2)}</ThemedText>
      </ScrollView>
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
