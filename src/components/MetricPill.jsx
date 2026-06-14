import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export default function MetricPill({ value, label }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    minWidth: 96,
    borderRadius: 8,
    backgroundColor: colors.emeraldSoft,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 4
  },
  value: {
    color: colors.emerald,
    fontSize: 18,
    fontWeight: "900"
  },
  label: {
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 16
  }
});
