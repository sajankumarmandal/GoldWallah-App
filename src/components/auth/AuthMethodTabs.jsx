import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";

export default function AuthMethodTabs({ activeMethod, methods, onChange }) {
  return (
    <View accessibilityRole="tablist" style={styles.container}>
      {methods.map((method) => {
        const isActive = activeMethod === method.value;

        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            key={method.value}
            onPress={() => onChange(method.value)}
            style={[styles.tab, isActive ? styles.tabActive : null]}
          >
            <Text style={[styles.tabText, isActive ? styles.tabTextActive : null]}>
              {method.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    padding: 4
  },
  tab: {
    flex: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  tabActive: {
    backgroundColor: colors.emerald
  },
  tabText: {
    color: colors.inkMuted,
    fontSize: 14,
    fontWeight: "800"
  },
  tabTextActive: {
    color: colors.background
  }
});
