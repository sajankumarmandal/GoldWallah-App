import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../theme/colors";

export default function ActionButton({ children, onPress, variant = "primary", disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" ? styles.secondary : styles.primary,
        disabled && styles.disabled,
        pressed && !disabled ? styles.pressed : null
      ]}
    >
      <Text style={[styles.label, variant === "secondary" ? styles.secondaryLabel : null]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  primary: {
    backgroundColor: colors.emerald
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  disabled: {
    opacity: 0.48
  },
  pressed: {
    transform: [{ scale: 0.98 }]
  },
  label: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryLabel: {
    color: colors.emerald
  }
});
