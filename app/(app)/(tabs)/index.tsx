import {
  Image,
  StyleSheet,
  Platform,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
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
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";

import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { CustomerPlan } from "@/components/CustomerPlan";
export default function HomeScreen() {
  const { setUser } = useAuth();
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();
  const [updateCheckResult, setUpdateCheckResult] =
    useState<Updates.UpdateCheckResult>();
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering>();

  // IAP
  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: "appl_MMPvfhqyKfJjYxTTOYpDropIVDZ" });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: "goog_ywIUzSnNtyuLFsMqaFfnKFgEhbV" });
    }
    Purchases.getOfferings().then((offerings) => {
      setCurrentOffering(offerings.current);
    });
  }, []);

  async function handlePurchasePackage(packageId: PurchasesPackage) {
    try {
      const { customerInfo } = await Purchases.purchasePackage(packageId);
      if (
        typeof customerInfo.entitlements.active["my_entitlement_identifier"] !==
        "undefined"
      ) {
        alert("Purchase successful");
      } else {
        alert("You already have access to this package");
      }
    } catch (e) {
      // @ts-ignore
      if (!e.userCancelled) {
        alert("Purchase failed");
      }
    }
  }

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

        <CustomerPlan />

        {currentOffering && (
          <View style={styles.offeringsSection}>
            <ThemedText style={styles.sectionTitle}>
              Available Packages
            </ThemedText>

            {currentOffering.monthly && (
              <View style={styles.packageContainer}>
                <ThemedText style={styles.packageTitle}>
                  Monthly Subscription
                </ThemedText>
                <ThemedText>{currentOffering.monthly.product.title}</ThemedText>
                <ThemedText>
                  {currentOffering.monthly.product.description}
                </ThemedText>
                <ThemedText style={styles.price}>
                  {currentOffering.monthly.product.priceString} / month
                </ThemedText>
                <Button
                  title="Subscribe Monthly"
                  onPress={() => {
                    if (!currentOffering.monthly) {
                      alert("No monthly offering found");
                      return;
                    }
                    handlePurchasePackage(currentOffering.monthly);
                  }}
                  color="#2196F3"
                />
              </View>
            )}

            {currentOffering.lifetime && (
              <View style={styles.packageContainer}>
                <ThemedText style={styles.packageTitle}>
                  Lifetime Access
                </ThemedText>
                <ThemedText>
                  {currentOffering.lifetime.product.title}
                </ThemedText>
                <ThemedText>
                  {currentOffering.lifetime.product.description}
                </ThemedText>
                <ThemedText style={styles.price}>
                  {currentOffering.lifetime.product.priceString}
                </ThemedText>
                <Button
                  title="Buy Lifetime Access"
                  onPress={() => {
                    if (!currentOffering.lifetime) {
                      alert("No lifetime offering found");
                      return;
                    }
                    handlePurchasePackage(currentOffering.lifetime);
                  }}
                  color="#4CAF50"
                />
              </View>
            )}
          </View>
        )}

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
  offeringsSection: {
    marginBottom: 24,
  },
  packageContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    color: "#2196F3",
    marginVertical: 8,
  },
});
