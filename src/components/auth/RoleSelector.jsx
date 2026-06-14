import { Pressable, StyleSheet, Text, View } from "react-native";

import { roleOptions } from "../../constants/auth";
import { colors } from "../../theme/colors";

export default function RoleSelector({ value, onChange, error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Account role</Text>
      <View style={styles.options}>
        {roleOptions.map((role) => {
          const isSelected = value === role.value;

          return (
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              key={role.value}
              onPress={() => onChange(role.value)}
              style={[styles.option, isSelected ? styles.optionSelected : null]}
            >
              <View style={[styles.roleMark, isSelected ? styles.roleMarkSelected : null]}>
                <Text style={[styles.roleMarkText, isSelected ? styles.roleMarkTextSelected : null]}>
                  {role.label.slice(0, 1)}
                </Text>
              </View>
              <View style={styles.optionCopy}>
                <Text style={styles.optionTitle}>{role.label}</Text>
                <Text style={styles.optionDetail}>{role.detail}</Text>
              </View>
            </Pressable>
          );
        })}
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
  options: {
    gap: 10
  },
  option: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14
  },
  optionSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.goldSoft
  },
  roleMark: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted
  },
  roleMarkSelected: {
    backgroundColor: colors.emerald
  },
  roleMarkText: {
    color: colors.emerald,
    fontSize: 14,
    fontWeight: "900"
  },
  roleMarkTextSelected: {
    color: colors.goldSoft
  },
  optionCopy: {
    flex: 1,
    gap: 4
  },
  optionTitle: {
    color: colors.emerald,
    fontSize: 15,
    fontWeight: "900"
  },
  optionDetail: {
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 18
  },
  error: {
    color: colors.copper,
    fontSize: 12,
    fontWeight: "700"
  }
});
