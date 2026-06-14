import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../../theme/colors";
import AuthTextField from "./AuthTextField.jsx";

export default function PasswordField(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <AuthTextField
      secureTextEntry={!isVisible}
      textContentType="password"
      rightAccessory={
        <Pressable
          accessibilityLabel={isVisible ? "Hide password" : "Show password"}
          accessibilityRole="button"
          onPress={() => setIsVisible((current) => !current)}
          style={styles.toggle}
        >
          <Text style={styles.toggleText}>{isVisible ? "Hide" : "Show"}</Text>
        </Pressable>
      }
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  toggle: {
    minHeight: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  toggleText: {
    color: colors.emerald,
    fontSize: 12,
    fontWeight: "900"
  }
});
