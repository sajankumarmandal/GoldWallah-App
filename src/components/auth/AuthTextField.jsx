import { StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "../../theme/colors";

export default function AuthTextField({
  label,
  error,
  value,
  onChangeText,
  secureTextEntry = false,
  rightAccessory,
  ...inputProps
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputShell, error ? styles.inputShellError : null]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholderTextColor="rgba(74, 90, 83, 0.58)"
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={value}
          {...inputProps}
        />
        {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
  label: {
    color: colors.emerald,
    fontSize: 14,
    fontWeight: "800"
  },
  inputShell: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center"
  },
  inputShellError: {
    borderColor: colors.copper
  },
  input: {
    flex: 1,
    minHeight: 52,
    color: colors.emerald,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  accessory: {
    paddingRight: 10
  },
  error: {
    color: colors.copper,
    fontSize: 12,
    fontWeight: "700"
  }
});
