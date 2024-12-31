import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />{" "}
      </View>
    );
  if (user) {
    return <Redirect href={"/(app)/(tabs)"} />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
