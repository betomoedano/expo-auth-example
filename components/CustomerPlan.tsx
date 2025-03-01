import { View, StyleSheet } from "react-native";
import Purchases, { CustomerInfo } from "react-native-purchases";
import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";

export function CustomerPlan() {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  useEffect(() => {
    Purchases.getCustomerInfo().then(setCustomerInfo);
  }, []);

  if (!customerInfo) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Customer Information</ThemedText>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Active Entitlements</ThemedText>
        {Object.entries(customerInfo.entitlements.active).map(
          ([key, value]) => (
            <View key={key} style={styles.entitlement}>
              <ThemedText>ID: {key}</ThemedText>
              <ThemedText>
                Will Renew: {value.willRenew ? "Yes" : "No"}
              </ThemedText>
              <ThemedText>Period Type: {value.periodType}</ThemedText>
            </View>
          )
        )}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Purchase History</ThemedText>
        {customerInfo.nonSubscriptionTransactions.map((transaction) => (
          <View
            key={transaction.transactionIdentifier}
            style={styles.transaction}
          >
            <ThemedText>Product: {transaction.productId}</ThemedText>
            <ThemedText>
              Purchase Date:{" "}
              {new Date(transaction.purchaseDate).toLocaleDateString()}
            </ThemedText>
            <ThemedText>
              Transaction ID: {transaction.transactionIdentifier}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>User Details</ThemedText>
        <ThemedText>User ID: {customerInfo.originalAppUserId}</ThemedText>
        <ThemedText>
          First Seen: {new Date(customerInfo.firstSeen).toLocaleDateString()}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  entitlement: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    gap: 4,
  },
  transaction: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    gap: 4,
  },
});
