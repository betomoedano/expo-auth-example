import {
  Image,
  StyleSheet,
  Platform,
  View,
  Button,
  ScrollView,
  SafeAreaView,
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" testID="home" style={styles.title}>
          Welcome Home
        </ThemedText>

        <View style={styles.updateSection}>
          <ThemedText style={styles.sectionTitle}>App Updates</ThemedText>
          <View style={styles.buttonContainer}>
            <Button
              title="Check for updates"
              onPress={chekcForUpdates}
              color="#4CAF50"
            />
            <Button
              title="Fetch updates"
              onPress={async () => await Updates.fetchUpdateAsync()}
              color="#2196F3"
            />
          </View>
          {updateCheckResult && (
            <View style={styles.updateInfo}>
              <ThemedText style={styles.updateText}>Update Status:</ThemedText>
              <ThemedText style={styles.updateDetails}>
                {JSON.stringify(updateCheckResult, null, 2)}
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.accountSection}>
          <Button
            title="Sign out"
            color="#f44336"
            onPress={() => setUser(undefined)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#2196F3",
    marginBottom: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  updateSection: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  updateInfo: {
    marginTop: 16,
  },
  updateText: {
    fontSize: 16,
    marginBottom: 8,
  },
  updateDetails: {
    padding: 12,
    borderRadius: 6,
    fontSize: 14,
  },
  accountSection: {
    marginTop: 8,
  },
});
