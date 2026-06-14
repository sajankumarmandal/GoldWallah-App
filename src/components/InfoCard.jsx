import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export default function InfoCard({ eyebrow, title, body }) {
  return (
    <View style={styles.card}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 8
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase"
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800"
  },
  body: {
    color: colors.inkMuted,
    fontSize: 14,
    lineHeight: 21
  }
});
