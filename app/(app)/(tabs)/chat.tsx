import {
  SafeAreaView,
  ScrollView,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { usePathname } from "expo-router";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { fetch as expoFetch } from "expo/fetch";
import { generateAPIUrl } from "@/utils/origin-helper";

export default function ChatScreen() {
  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl("/api/chat"),
    onError: (error) => console.error(error, "ERROR"),
  });
  const theme = useColorScheme();

  if (error) return <ThemedText>{error.message}</ThemedText>;
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View
        style={{
          height: "95%",
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 8,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {messages.map((m) => (
            <View key={m.id} style={{ marginVertical: 8 }}>
              <View>
                <ThemedText style={{ fontWeight: 700 }}>{m.role}</ThemedText>
                <ThemedText>{m.content}</ThemedText>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={{ marginTop: 8 }}>
          <TextInput
            style={{
              backgroundColor: theme === "dark" ? "#2C2C2E" : "white",
              padding: 12,
              marginBottom: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: theme === "dark" ? "#3A3A3C" : "#E5E5EA",
              color: theme === "dark" ? "white" : "black",
              fontSize: 16,
              shadowColor: theme === "dark" ? "#000" : "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            placeholder="Type your message..."
            placeholderTextColor={theme === "dark" ? "#8E8E93" : "#8E8E93"}
            value={input}
            onChange={(e) =>
              handleInputChange({
                ...e,
                target: {
                  ...e.target,
                  value: e.nativeEvent.text,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            onSubmitEditing={(e) => {
              handleSubmit(e);
              e.preventDefault();
            }}
            autoFocus={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
