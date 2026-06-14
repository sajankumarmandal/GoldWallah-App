import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

export default function AuthNotice({ children, tone = "info" }) {
  if (!children) {
    return null;
  }

  return (
    <View style={[styles.notice, tone === "error" ? styles.errorNotice : null]}>
      <Text style={[styles.noticeText, tone === "error" ? styles.errorText : null]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    borderRadius: 18,
    backgroundColor: colors.goldSoft,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  errorNotice: {
    backgroundColor: colors.copperSoft
  },
  noticeText: {
    color: colors.emerald,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700"
  },
  errorText: {
    color: colors.danger
  }
});
