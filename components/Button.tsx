import { zincColors } from "@/constants/Colors";
import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testId?: string | undefined;
}

export default function Button({
  children,
  disabled,
  loading,
  onPress,
  size = "md",
  variant = "filled",
  style,
  textStyle = {},
  testId,
}: ButtonProps) {
  const theme = useColorScheme();
  const isDarkMode = theme === "dark";
  const sizeSyles: Record<
    ButtonSize,
    { height: number; fontSize: number; padding: number }
  > = {
    sm: { height: 36, fontSize: 14, padding: 12 },
    md: { height: 44, fontSize: 16, padding: 16 },
    lg: { height: 55, fontSize: 18, padding: 20 },
  };

  function getTextColor(): string {
    switch (variant) {
      case "filled":
        return isDarkMode ? zincColors["950"] : zincColors["50"];
      case "outline":
        return isDarkMode ? zincColors["50"] : zincColors["950"];
      default:
        return isDarkMode ? zincColors["50"] : zincColors["950"];
    }
  }

  function getVariantStyle(): ViewStyle {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: isDarkMode ? zincColors["50"] : zincColors["950"],
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: zincColors["500"],
        };
      default:
        return {
          backgroundColor: "transparent",
        };
    }
  }

  return (
    <Pressable
      testID={testId}
      onPress={onPress}
      style={StyleSheet.flatten([
        getVariantStyle(),
        {
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: sizeSyles[size].height,
          paddingHorizontal: sizeSyles[size].padding,
          opacity: disabled || loading ? 0.5 : 1,
        },
        style,
      ])}
      disabled={disabled || loading}
    >
      <ThemedText
        style={[
          { color: getTextColor(), fontSize: sizeSyles[size].fontSize },
          textStyle,
        ]}
      >
        {loading ? <ActivityIndicator /> : children}
      </ThemedText>
    </Pressable>
  );
}
