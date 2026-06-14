import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import logoImage from "../../assets/goldwallah-logo.png";
import { colors } from "../../theme/colors";

const trustItems = [
  {
    title: "Verified access",
    detail: "Role-aware onboarding for sellers and jewellers."
  },
  {
    title: "Privacy first",
    detail: "Private bids and verification details stay protected."
  },
  {
    title: "High-value trust",
    detail: "Built for gold, identity checks, and auditable actions."
  }
];

export default function AuthShell({
  eyebrow,
  title,
  description,
  cardTitle,
  cardDescription,
  footer,
  children,
  onBack
}) {
  const { width } = useWindowDimensions();
  const isWide = width >= 920;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={[styles.content, isWide && styles.contentWide]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.shell, isWide && styles.shellWide]}>
            <View style={[styles.brandPanel, isWide && styles.brandPanelWide]}>
              <View style={styles.topRow}>
                <View style={styles.brandLockup}>
                  <Image
                    accessibilityIgnoresInvertColors
                    accessibilityLabel="GoldWallah logo"
                    source={logoImage}
                    style={styles.logo}
                  />
                  <View>
                    <Text style={styles.brand}>GoldWallah</Text>
                    <Text style={styles.brandTag}>Verified gold marketplace</Text>
                  </View>
                </View>

                <Pressable accessibilityRole="button" onPress={onBack} style={styles.backButton}>
                  <Text style={styles.backButtonText}>Back</Text>
                </Pressable>
              </View>

              <View style={styles.brandCopy}>
                <Text style={styles.eyebrow}>{eyebrow}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>

              <View style={styles.trustList}>
                {trustItems.map((item) => (
                  <View key={item.title} style={styles.trustCard}>
                    <View style={styles.trustDot}>
                      <Text style={styles.trustDotText}>GW</Text>
                    </View>
                    <Text style={styles.trustTitle}>{item.title}</Text>
                    <Text style={styles.trustDetail}>{item.detail}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.cardTitle}>{cardTitle}</Text>
              <Text style={styles.cardDescription}>{cardDescription}</Text>
              <View style={styles.formBody}>{children}</View>
              {footer ? <View style={styles.footer}>{footer}</View> : null}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.emerald
  },
  keyboardView: {
    flex: 1
  },
  content: {
    flexGrow: 1,
    padding: 18,
    paddingTop: Platform.OS === "android" ? 30 : 18
  },
  contentWide: {
    alignSelf: "center",
    maxWidth: 1180,
    width: "100%",
    justifyContent: "center"
  },
  shell: {
    gap: 18
  },
  shellWide: {
    minHeight: 680,
    flexDirection: "row",
    alignItems: "stretch",
    gap: 26
  },
  brandPanel: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(253, 252, 249, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: 20,
    gap: 28
  },
  brandPanelWide: {
    flex: 0.94,
    justifyContent: "space-between",
    padding: 30
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14
  },
  brandLockup: {
    minWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(209, 156, 76, 0.65)"
  },
  brand: {
    color: colors.background,
    fontSize: 23,
    fontWeight: "900"
  },
  brandTag: {
    color: "rgba(253, 252, 249, 0.62)",
    fontSize: 12,
    marginTop: 2
  },
  backButton: {
    minHeight: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(253, 252, 249, 0.24)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16
  },
  backButtonText: {
    color: colors.goldSoft,
    fontSize: 13,
    fontWeight: "800"
  },
  brandCopy: {
    gap: 14
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    color: colors.background,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900"
  },
  description: {
    color: "rgba(253, 252, 249, 0.7)",
    fontSize: 15,
    lineHeight: 23
  },
  trustList: {
    gap: 10
  },
  trustCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(253, 252, 249, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 15,
    gap: 7
  },
  trustDot: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(209, 156, 76, 0.18)"
  },
  trustDotText: {
    color: colors.goldSoft,
    fontSize: 10,
    fontWeight: "900"
  },
  trustTitle: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "900"
  },
  trustDetail: {
    color: "rgba(253, 252, 249, 0.62)",
    fontSize: 12,
    lineHeight: 18
  },
  formCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: 20
  },
  cardTitle: {
    color: colors.emerald,
    fontSize: 24,
    fontWeight: "900"
  },
  cardDescription: {
    color: colors.inkMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8
  },
  formBody: {
    marginTop: 24,
    gap: 16
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 22,
    paddingTop: 18
  }
});
