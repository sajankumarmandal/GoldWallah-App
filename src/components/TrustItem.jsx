import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export default function TrustItem({ label, detail }) {
  return (
    <View style={styles.row}>
      <View style={styles.mark}>
        <Text style={styles.markText}>✓</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  mark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.goldSoft
  },
  markText: {
    color: colors.emerald,
    fontSize: 14,
    fontWeight: "900"
  },
  copy: {
    flex: 1,
    gap: 3
  },
  label: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800"
  },
  detail: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 19
  }
});
