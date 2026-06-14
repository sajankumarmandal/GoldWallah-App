import { useMemo } from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import heroImage from "../assets/goldwallah-web-hero.jpg";
import logoImage from "../assets/goldwallah-logo.png";
import ActionButton from "../components/ActionButton.jsx";
import { journeyCards, marketRates, openingStats, trustHighlights } from "../data/homeContent";
import { colors } from "../theme/colors";

export default function HomeScreen({ onLoginPress, onRegisterPress, session }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;
  const isCompact = width < 430;
  const isAuthenticated = Boolean(session?.user && session?.accessToken);

  const layout = useMemo(
    () => ({
      content: [styles.content, isWide && styles.contentWide],
      header: [styles.header, isCompact && styles.headerCompact],
      hero: [styles.hero, isWide && styles.heroWide],
      heroCopy: [styles.heroCopy, isWide && styles.heroCopyWide],
      actions: [styles.actions, isWide && styles.actionsWide],
      visualPanel: [styles.visualPanel, isWide && styles.visualPanelWide],
      stats: [styles.stats, isCompact && styles.statsCompact],
      trustGrid: [styles.trustGrid, isWide && styles.trustGridWide],
      journeyGrid: [styles.journeyGrid, isWide && styles.journeyGridWide]
    }),
    [isCompact, isWide]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={layout.content} showsVerticalScrollIndicator={false}>
        <View style={layout.header}>
          <View style={styles.brandLockup}>
            <Image
              accessibilityIgnoresInvertColors
              accessibilityLabel="GoldWallah logo"
              source={logoImage}
              style={styles.logo}
            />
            <View>
              <Text style={styles.brand}>GoldWallah</Text>
              <Text style={styles.brandSubline}>Private gold marketplace</Text>
            </View>
          </View>

          <View style={styles.headerPill}>
            <Text style={styles.headerPillText}>{isAuthenticated ? "Signed in" : "KYC first"}</Text>
          </View>
          {isAuthenticated ? null : (
            <Pressable accessibilityRole="button" onPress={onLoginPress} style={styles.signInButton}>
              <Text style={styles.signInText}>Sign in</Text>
            </Pressable>
          )}
        </View>

        <View style={layout.hero}>
          <View style={layout.heroCopy}>
            <Text style={styles.eyebrow}>Old gold, new value</Text>
            <Text style={styles.heading}>
              Sell your old gold to verified jewellers, at the fairest price.
            </Text>
            <Text style={styles.lede}>
              List jewellery after verification, receive private offers from nearby jewellers, and
              compare bids with market-rate context before moving ahead.
            </Text>

            <View style={layout.actions}>
              <ActionButton onPress={() => onRegisterPress("seller")}>Sell your gold</ActionButton>
              <ActionButton variant="secondary" onPress={() => onRegisterPress("jeweller")}>
                Join as jeweller
              </ActionButton>
            </View>

            <View style={layout.stats}>
              {openingStats.map((item) => (
                <View key={item.label} style={styles.statItem}>
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={layout.visualPanel}>
            <Image accessibilityIgnoresInvertColors source={heroImage} style={styles.heroImage} />
            <View style={styles.imageCaption}>
              <Text style={styles.imageCaptionEyebrow}>From heirloom</Text>
              <Text style={styles.imageCaptionTitle}>to fair offer</Text>
            </View>
          </View>
        </View>

        <View style={styles.ratePanel}>
          <View style={styles.rateHeader}>
            <View>
              <Text style={styles.rateEyebrow}>24K reference - INR / gram</Text>
              <Text style={styles.rateValue}>INR 7,850</Text>
            </View>
            <View style={styles.rateBadge}>
              <Text style={styles.rateBadgeText}>Indicative</Text>
            </View>
          </View>

          <View style={styles.rateGrid}>
            {marketRates.map((rate) => (
              <View key={rate.purity} style={styles.rateTile}>
                <Text style={styles.ratePurity}>{rate.purity}</Text>
                <Text style={styles.rateTileValue}>{rate.value}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.rateNote}>
            Market rates are context only. Final offers depend on purity, weight, condition, and
            verified jeweller bids.
          </Text>
        </View>

        <View style={layout.trustGrid}>
          {trustHighlights.map((item) => (
            <View key={item.title} style={styles.trustCard}>
              <View style={styles.trustMark}>
                <Text style={styles.trustMarkText}>GW</Text>
              </View>
              <Text style={styles.trustTitle}>{item.title}</Text>
              <Text style={styles.trustDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEyebrow}>Two verified journeys</Text>
          <Text style={styles.sectionTitle}>Start with the right path.</Text>
        </View>

        <View style={layout.journeyGrid}>
          {journeyCards.map((item) => (
            <View key={item.badge} style={styles.journeyCard}>
              <Text style={styles.journeyBadge}>{item.badge}</Text>
              <Text style={styles.journeyTitle}>{item.title}</Text>
              <Text style={styles.journeyBody}>{item.body}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 30 : 12,
    paddingBottom: 34,
    gap: 22
  },
  contentWide: {
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 32,
    paddingTop: 28
  },
  header: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16
  },
  headerCompact: {
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 12
  },
  brandLockup: {
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: colors.border
  },
  brand: {
    color: colors.emerald,
    fontSize: 25,
    fontWeight: "900"
  },
  brandSubline: {
    color: colors.inkMuted,
    fontSize: 12,
    marginTop: 2
  },
  headerPill: {
    borderRadius: 999,
    backgroundColor: colors.goldSoft,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  headerPillText: {
    color: colors.emerald,
    fontSize: 12,
    fontWeight: "900"
  },
  signInButton: {
    minHeight: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.emerald,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16
  },
  signInText: {
    color: colors.emerald,
    fontSize: 13,
    fontWeight: "900"
  },
  hero: {
    gap: 20
  },
  heroWide: {
    minHeight: 560,
    flexDirection: "row",
    alignItems: "center",
    gap: 34
  },
  heroCopy: {
    gap: 16
  },
  heroCopyWide: {
    flex: 1.04,
    paddingRight: 18
  },
  eyebrow: {
    color: colors.copper,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  heading: {
    color: colors.emerald,
    fontSize: 38,
    lineHeight: 44,
    fontWeight: "900"
  },
  lede: {
    maxWidth: 680,
    color: colors.inkMuted,
    fontSize: 16,
    lineHeight: 25
  },
  actions: {
    gap: 12,
    marginTop: 4
  },
  actionsWide: {
    flexDirection: "row",
    alignItems: "center"
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 8
  },
  statsCompact: {
    gap: 10
  },
  statItem: {
    minWidth: 112,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingLeft: 14
  },
  statValue: {
    color: colors.emerald,
    fontSize: 21,
    fontWeight: "900"
  },
  statLabel: {
    color: colors.inkMuted,
    fontSize: 13,
    marginTop: 3
  },
  visualPanel: {
    height: 430,
    overflow: "hidden",
    borderRadius: 28,
    backgroundColor: colors.emerald,
    borderWidth: 1,
    borderColor: colors.border
  },
  visualPanelWide: {
    flex: 0.92,
    height: 540
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  imageCaption: {
    position: "absolute",
    left: 22,
    right: 22,
    bottom: 22,
    borderRadius: 22,
    backgroundColor: "rgba(26, 54, 45, 0.74)",
    padding: 18
  },
  imageCaptionEyebrow: {
    color: "rgba(253, 252, 249, 0.78)",
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  imageCaptionTitle: {
    color: colors.background,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 4
  },
  ratePanel: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    gap: 18
  },
  rateHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16
  },
  rateEyebrow: {
    color: colors.inkMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  rateValue: {
    color: colors.emerald,
    fontSize: 36,
    fontWeight: "900",
    marginTop: 8
  },
  rateBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  rateBadgeText: {
    color: colors.inkMuted,
    fontSize: 12,
    fontWeight: "800"
  },
  rateGrid: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  rateTile: {
    flex: 1,
    minWidth: 96,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: 14,
    gap: 6
  },
  ratePurity: {
    color: colors.inkMuted,
    fontSize: 10,
    fontWeight: "900"
  },
  rateTileValue: {
    color: colors.emerald,
    fontSize: 14,
    fontWeight: "900"
  },
  rateNote: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 20
  },
  trustGrid: {
    gap: 12
  },
  trustGridWide: {
    flexDirection: "row"
  },
  trustCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 10
  },
  trustMark: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.goldSoft
  },
  trustMarkText: {
    color: colors.emerald,
    fontSize: 12,
    fontWeight: "900"
  },
  trustTitle: {
    color: colors.emerald,
    fontSize: 17,
    fontWeight: "900"
  },
  trustDetail: {
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 20
  },
  sectionHeader: {
    gap: 8,
    marginTop: 4
  },
  sectionEyebrow: {
    color: colors.copper,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  sectionTitle: {
    color: colors.emerald,
    fontSize: 25,
    fontWeight: "900"
  },
  journeyGrid: {
    gap: 12
  },
  journeyGridWide: {
    flexDirection: "row"
  },
  journeyCard: {
    flex: 1,
    borderRadius: 26,
    backgroundColor: colors.emerald,
    padding: 20,
    gap: 10
  },
  journeyBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "rgba(243, 228, 191, 0.18)",
    color: colors.goldSoft,
    fontSize: 11,
    fontWeight: "900",
    paddingHorizontal: 12,
    paddingVertical: 8,
    textTransform: "uppercase"
  },
  journeyTitle: {
    color: colors.background,
    fontSize: 19,
    fontWeight: "900"
  },
  journeyBody: {
    color: "#e7efe9",
    fontSize: 14,
    lineHeight: 21
  }
});
