import { useCallback, useMemo } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import heroImage from "../assets/goldwallah-marketplace-hero.png";
import ActionButton from "../components/ActionButton.jsx";
import InfoCard from "../components/InfoCard.jsx";
import MetricPill from "../components/MetricPill.jsx";
import TrustItem from "../components/TrustItem.jsx";
import { metrics, processSteps, trustItems } from "../data/homeContent";
import { colors } from "../theme/colors";

const protectedFlowMessage =
  "Connect authenticated backend APIs before collecting KYC, bids, payments, or seller documents.";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 820;
  const isNarrow = width < 430;

  const showProtectedFlowNotice = useCallback(() => {
    if (Platform.OS === "web" && typeof window !== "undefined") {
      window.alert(protectedFlowMessage);
      return;
    }

    Alert.alert("Protected flow required", protectedFlowMessage);
  }, []);

  const layout = useMemo(
    () => ({
      content: [styles.content, isWide && styles.contentWide],
      nav: [styles.nav, isNarrow && styles.navNarrow],
      hero: [styles.hero, isWide && styles.heroWide],
      heroCopy: [styles.heroCopy, isWide && styles.heroCopyWide],
      actions: [styles.actions, isWide && styles.actionsWide],
      heroImage: [styles.heroImage, isWide && styles.heroImageWide],
      cards: [styles.cards, isWide && styles.cardsWide],
      cardShell: [styles.cardShell, isWide && styles.cardShellWide]
    }),
    [isNarrow, isWide]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={layout.content} showsVerticalScrollIndicator={false}>
        <View style={layout.nav}>
          <View>
            <Text style={styles.brand}>GoldWallah</Text>
            <Text style={styles.brandSubline}>Private gold marketplace</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>Secure by design</Text>
          </View>
        </View>

        <View style={layout.hero}>
          <View style={layout.heroCopy}>
            <Text style={styles.eyebrow}>Verified jeweller bidding</Text>
            <Text style={styles.heading}>Sell gold with privacy, control, and verified bids.</Text>
            <Text style={styles.lede}>
              GoldWallah helps sellers list gold securely while approved jewellers compete through
              private, auditable offers.
            </Text>
            <View style={layout.actions}>
              <ActionButton onPress={showProtectedFlowNotice}>Start seller onboarding</ActionButton>
              <ActionButton variant="secondary" onPress={showProtectedFlowNotice}>
                Jeweller access
              </ActionButton>
            </View>
          </View>

          <Image accessibilityIgnoresInvertColors source={heroImage} style={layout.heroImage} />
        </View>

        <View style={styles.metrics}>
          {metrics.map((metric) => (
            <MetricPill key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trust controls expected from day one</Text>
          <View style={styles.trustList}>
            {trustItems.map((item) => (
              <TrustItem key={item.label} label={item.label} detail={item.detail} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketplace flow</Text>
          <View style={layout.cards}>
            {processSteps.map((step) => (
              <View key={step.number} style={layout.cardShell}>
                <InfoCard eyebrow={step.number} title={step.title} body={step.body} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityTitle}>Production security baseline</Text>
          <Text style={styles.securityBody}>
            This app shell contains no embedded secrets and does not persist sensitive tokens on
            device storage. KYC, bidding, commission, and payout features should only be enabled
            after authenticated APIs, RBAC, rate limits, audit logs, and private document storage are
            implemented server-side.
          </Text>
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
    paddingTop: Platform.OS === "android" ? 36 : 12,
    paddingBottom: 36,
    gap: 24
  },
  contentWide: {
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 32
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16
  },
  navNarrow: {
    alignItems: "flex-start",
    flexDirection: "column"
  },
  brand: {
    color: colors.emerald,
    fontSize: 24,
    fontWeight: "900"
  },
  brandSubline: {
    color: colors.inkMuted,
    fontSize: 12,
    marginTop: 2
  },
  statusPill: {
    borderRadius: 999,
    backgroundColor: colors.goldSoft,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  statusText: {
    color: colors.emerald,
    fontSize: 12,
    fontWeight: "800"
  },
  hero: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  heroWide: {
    minHeight: 510,
    flexDirection: "row",
    alignItems: "stretch"
  },
  heroCopy: {
    padding: 22,
    gap: 14
  },
  heroCopyWide: {
    flex: 0.95,
    justifyContent: "center",
    padding: 44
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  heading: {
    color: colors.ink,
    fontSize: 33,
    lineHeight: 39,
    fontWeight: "900"
  },
  lede: {
    color: colors.inkMuted,
    fontSize: 16,
    lineHeight: 24
  },
  actions: {
    gap: 10,
    marginTop: 4
  },
  actionsWide: {
    flexDirection: "row",
    alignItems: "center"
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover"
  },
  heroImageWide: {
    flex: 1.05,
    width: 0,
    height: "100%"
  },
  metrics: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap"
  },
  section: {
    gap: 14
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900"
  },
  trustList: {
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    gap: 18
  },
  cards: {
    gap: 12
  },
  cardsWide: {
    flexDirection: "row"
  },
  cardShell: {
    width: "100%"
  },
  cardShellWide: {
    flex: 1
  },
  securityNote: {
    borderRadius: 8,
    backgroundColor: colors.emerald,
    padding: 18,
    gap: 8
  },
  securityTitle: {
    color: colors.goldSoft,
    fontSize: 17,
    fontWeight: "900"
  },
  securityBody: {
    color: "#f6f0e4",
    fontSize: 14,
    lineHeight: 21
  }
});
