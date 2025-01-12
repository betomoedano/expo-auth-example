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
import { supabase } from "@/utils/supabase";

export default function HomeScreen() {
  const { setUser } = useAuth();

  async function fetchTodos() {
    const { data } = (await supabase.from("todos").select("*")) as {
      data: { text: string; id: number; is_completed: boolean }[];
    };
    console.log(data);
  }

  async function createTodo() {
    const { status } = await supabase.from("todos").insert([
      {
        text: `${Math.random()} New Todo from clien`,
      },
    ]);
    console.log(status);
  }
  return (
    <View style={styles.container}>
      <ThemedText type="title" testID="home">
        Supabase Todos
      </ThemedText>
      <Button title="Fetch Todos" onPress={fetchTodos} />
      <Button title="Create Todo" onPress={createTodo} />
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
