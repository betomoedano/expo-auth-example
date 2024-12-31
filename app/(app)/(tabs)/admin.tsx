import { ThemedText } from "@/components/ThemedText";
import { useAuth, User, UserRole } from "@/context/auth";
import { Button, StyleSheet, View } from "react-native";

export default function AdminScreen() {
  const { user, setUser } = useAuth();

  if (user?.role !== UserRole.Admin) {
    return (
      <View style={styles.container}>
        <ThemedText>You don't have access</ThemedText>
        <Button
          title="Become and Admin"
          onPress={() =>
            setUser((prev) => ({ ...prev, role: UserRole.Admin } as User))
          }
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ThemedText>Hello {user?.name}</ThemedText>
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
