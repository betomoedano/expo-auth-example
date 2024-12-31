import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";

export default function Auth() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedText type="title">Sign In</ThemedText>
    </View>
  );
}
