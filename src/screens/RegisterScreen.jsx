import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AuthMethodTabs from "../components/auth/AuthMethodTabs.jsx";
import AuthNotice from "../components/auth/AuthNotice.jsx";
import AuthShell from "../components/auth/AuthShell.jsx";
import AuthTextField from "../components/auth/AuthTextField.jsx";
import PasswordField from "../components/auth/PasswordField.jsx";
import RoleSelector from "../components/auth/RoleSelector.jsx";
import {
  AUTH_METHODS,
  authMethodOptions,
  DEFAULT_AUTH_ROLE,
  normalizeAuthRole
} from "../constants/auth";
import { colors } from "../theme/colors";
import { validateRegisterEmail, validateRegisterOtp } from "../utils/authValidation";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: DEFAULT_AUTH_ROLE,
  otp: "",
  otpRequested: false,
  acceptTerms: false
};

export default function RegisterScreen({ initialRole = DEFAULT_AUTH_ROLE, onBack, onLoginPress }) {
  const [activeMethod, setActiveMethod] = useState(AUTH_METHODS.email);
  const [values, setValues] = useState({
    ...initialValues,
    role: normalizeAuthRole(initialRole) || DEFAULT_AUTH_ROLE
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");

  const clearFeedback = useCallback(() => {
    setErrors({});
    setStatusMessage("");
  }, []);

  const updateField = useCallback((field, value) => {
    const nextValue = field === "role" ? normalizeAuthRole(value) : value;

    setValues((current) => ({ ...current, [field]: nextValue }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatusMessage("");
  }, []);

  const handleEmailRegister = useCallback(() => {
    const nextErrors = validateRegisterEmail(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("");
      return;
    }

    setStatusMessage(
      "Connect the authenticated registration API before creating accounts. No data was sent."
    );
  }, [values]);

  const handleOtpRegister = useCallback(() => {
    const nextErrors = validateRegisterOtp(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("");
      return;
    }

    if (!values.otpRequested) {
      setValues((current) => ({ ...current, otpRequested: true }));
      setStatusMessage(
        "Connect the backend OTP endpoint before sending registration codes. No OTP was sent."
      );
      return;
    }

    setStatusMessage(
      "Connect the backend OTP verification endpoint before creating phone-backed accounts."
    );
  }, [values]);

  return (
    <AuthShell
      eyebrow="Verified onboarding"
      title="Create your GoldWallah account with confidence."
      description="Choose the right role so your KYC, business verification, and marketplace access stay clear from day one."
      cardTitle="Create account"
      cardDescription="Seller accounts need KYC before listing. Jeweller accounts need KYC and business review before bidding."
      footer={
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable accessibilityRole="button" onPress={onLoginPress}>
            <Text style={styles.footerLink}>Sign in</Text>
          </Pressable>
        </View>
      }
      onBack={onBack}
    >
      <AuthMethodTabs
        activeMethod={activeMethod}
        methods={authMethodOptions}
        onChange={(method) => {
          setActiveMethod(method);
          clearFeedback();
        }}
      />

      {activeMethod === AUTH_METHODS.email ? (
        <View style={styles.formGroup}>
          <AuthTextField
            autoCapitalize="words"
            autoComplete="name"
            error={errors.fullName}
            label="Full name"
            onChangeText={(value) => updateField("fullName", value)}
            placeholder="Your legal name"
            textContentType="name"
            value={values.fullName}
          />
          <AuthTextField
            autoComplete="email"
            error={errors.email}
            inputMode="email"
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => updateField("email", value)}
            placeholder="name@example.com"
            textContentType="emailAddress"
            value={values.email}
          />
          <AuthTextField
            autoComplete="tel"
            error={errors.phone}
            inputMode="tel"
            keyboardType="phone-pad"
            label="Phone number"
            onChangeText={(value) => updateField("phone", value)}
            placeholder="+91 98765 43210"
            textContentType="telephoneNumber"
            value={values.phone}
          />
          <PasswordField
            autoComplete="new-password"
            error={errors.password}
            label="Password"
            onChangeText={(value) => updateField("password", value)}
            placeholder="Minimum 10 characters"
            textContentType="newPassword"
            value={values.password}
          />
          <PasswordField
            autoComplete="new-password"
            error={errors.confirmPassword}
            label="Confirm password"
            onChangeText={(value) => updateField("confirmPassword", value)}
            placeholder="Repeat password"
            textContentType="newPassword"
            value={values.confirmPassword}
          />
          <RoleSelector
            error={errors.role}
            onChange={(role) => updateField("role", role)}
            value={values.role}
          />
          <TermsToggle
            checked={values.acceptTerms}
            error={errors.acceptTerms}
            onPress={() => updateField("acceptTerms", !values.acceptTerms)}
          />
          <SubmitButton onPress={handleEmailRegister}>Create account</SubmitButton>
        </View>
      ) : (
        <View style={styles.formGroup}>
          <AuthTextField
            autoCapitalize="words"
            autoComplete="name"
            error={errors.fullName}
            label="Full name"
            onChangeText={(value) => updateField("fullName", value)}
            placeholder="Your legal name"
            textContentType="name"
            value={values.fullName}
          />
          <AuthTextField
            autoComplete="tel"
            error={errors.phone}
            inputMode="tel"
            keyboardType="phone-pad"
            label="Phone number"
            onChangeText={(value) => updateField("phone", value)}
            placeholder="+91 98765 43210"
            textContentType="telephoneNumber"
            value={values.phone}
          />
          <RoleSelector
            error={errors.role}
            onChange={(role) => updateField("role", role)}
            value={values.role}
          />
          {values.otpRequested ? (
            <AuthTextField
              autoComplete="one-time-code"
              error={errors.otp}
              inputMode="numeric"
              keyboardType="number-pad"
              label="OTP"
              maxLength={6}
              onChangeText={(value) => updateField("otp", value)}
              placeholder="Enter OTP"
              textContentType="oneTimeCode"
              value={values.otp}
            />
          ) : null}
          <TermsToggle
            checked={values.acceptTerms}
            error={errors.acceptTerms}
            onPress={() => updateField("acceptTerms", !values.acceptTerms)}
          />
          <SubmitButton onPress={handleOtpRegister}>
            {values.otpRequested ? "Verify and create account" : "Send OTP"}
          </SubmitButton>
        </View>
      )}

      <SocialAuthSection />
      <AuthNotice>{statusMessage}</AuthNotice>
    </AuthShell>
  );
}

function TermsToggle({ checked, error, onPress }) {
  return (
    <View style={styles.termsContainer}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        onPress={onPress}
        style={styles.termsRow}
      >
        <View style={[styles.checkbox, checked ? styles.checkboxChecked : null]}>
          <Text style={[styles.checkboxText, checked ? styles.checkboxTextChecked : null]}>
            {checked ? "OK" : ""}
          </Text>
        </View>
        <Text style={styles.termsText}>
          I agree to GoldWallah verification requirements for my selected account role.
        </Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

function SocialAuthSection() {
  return (
    <View style={styles.socialSection}>
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or create with</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialGrid}>
        <DisabledSocialButton label="Google" />
        <DisabledSocialButton label="Facebook" />
      </View>
      <Text style={styles.socialNote}>
        Social registration requires provider credentials and backend token verification.
      </Text>
    </View>
  );
}

function DisabledSocialButton({ label }) {
  return (
    <View style={styles.socialButton}>
      <View style={styles.socialMark}>
        <Text style={styles.socialMarkText}>{label.slice(0, 1)}</Text>
      </View>
      <Text style={styles.socialText}>{label} unavailable</Text>
    </View>
  );
}

function SubmitButton({ children, onPress }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.submitButton}>
      <Text style={styles.submitText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    gap: 14
  },
  submitButton: {
    minHeight: 52,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.emerald,
    paddingHorizontal: 20,
    paddingVertical: 14
  },
  submitText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "900"
  },
  termsContainer: {
    gap: 8
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface
  },
  checkboxChecked: {
    backgroundColor: colors.emerald,
    borderColor: colors.emerald
  },
  checkboxText: {
    fontSize: 9,
    fontWeight: "900"
  },
  checkboxTextChecked: {
    color: colors.background
  },
  termsText: {
    flex: 1,
    color: colors.inkMuted,
    fontSize: 13,
    lineHeight: 20
  },
  error: {
    color: colors.copper,
    fontSize: 12,
    fontWeight: "700"
  },
  socialSection: {
    gap: 13
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border
  },
  dividerText: {
    color: colors.inkMuted,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  socialGrid: {
    gap: 10
  },
  socialButton: {
    minHeight: 50,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    opacity: 0.72
  },
  socialMark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.emerald
  },
  socialMarkText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: "900"
  },
  socialText: {
    color: colors.inkMuted,
    fontSize: 14,
    fontWeight: "800"
  },
  socialNote: {
    color: colors.inkMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center"
  },
  footerRow: {
    alignItems: "center",
    gap: 8
  },
  footerText: {
    color: colors.inkMuted,
    fontSize: 14
  },
  footerLink: {
    color: colors.emerald,
    fontSize: 14,
    fontWeight: "900",
    textDecorationLine: "underline"
  }
});
