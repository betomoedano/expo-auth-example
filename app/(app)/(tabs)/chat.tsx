import { SafeAreaView, ScrollView, TextInput, View } from "react-native";

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
            style={{ backgroundColor: "white", padding: 8, marginBottom: 20 }}
            placeholder="Say something..."
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
