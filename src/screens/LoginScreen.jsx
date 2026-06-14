import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AuthMethodTabs from "../components/auth/AuthMethodTabs.jsx";
import AuthNotice from "../components/auth/AuthNotice.jsx";
import AuthShell from "../components/auth/AuthShell.jsx";
import AuthTextField from "../components/auth/AuthTextField.jsx";
import PasswordField from "../components/auth/PasswordField.jsx";
import { AUTH_METHODS, authMethodOptions } from "../constants/auth";
import { loginUser, sendLoginOtp, verifyLoginOtp } from "../services/authService";
import { colors } from "../theme/colors";
import { validateLoginEmail, validateLoginOtp } from "../utils/authValidation";

const initialEmailValues = {
  email: "",
  password: ""
};

const initialOtpValues = {
  phone: "",
  otp: "",
  otpRequested: false
};

export default function LoginScreen({ onAuthenticated, onBack, onRegisterPress }) {
  const [activeMethod, setActiveMethod] = useState(AUTH_METHODS.email);
  const [emailValues, setEmailValues] = useState(initialEmailValues);
  const [otpValues, setOtpValues] = useState(initialOtpValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState("info");

  const clearFeedback = useCallback(() => {
    setErrors({});
    setStatusMessage("");
    setStatusTone("info");
  }, []);

  const updateEmailField = useCallback((field, value) => {
    setEmailValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatusMessage("");
    setStatusTone("info");
  }, []);

  const updateOtpField = useCallback((field, value) => {
    setOtpValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setStatusMessage("");
    setStatusTone("info");
  }, []);

  const submitRequest = useCallback(
    async (action, successMessage) => {
      if (isSubmitting) {
        return false;
      }

      setIsSubmitting(true);
      setStatusMessage("");
      setStatusTone("info");

      try {
        const result = await action();
        const user = result?.data?.user || null;
        const accessToken = result?.data?.accessToken || null;

        if (user && accessToken) {
          onAuthenticated?.({ user, accessToken });
          return true;
        }

        setStatusMessage(successMessage);
        return true;
      } catch (error) {
        setStatusTone("error");
        setStatusMessage(error.message || "Unable to complete request. Please try again.");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSubmitting, onAuthenticated]
  );

  const handleEmailSubmit = useCallback(async () => {
    const nextErrors = validateLoginEmail(emailValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("");
      return;
    }

    await submitRequest(
      () =>
        loginUser({
          email: emailValues.email.trim(),
          password: emailValues.password
        }),
      "Login successful."
    );
  }, [emailValues, submitRequest]);

  const handleOtpSubmit = useCallback(async () => {
    const nextErrors = validateLoginOtp(otpValues);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("");
      return;
    }

    if (!otpValues.otpRequested) {
      const wasOtpSent = await submitRequest(
        () => sendLoginOtp({ phone: otpValues.phone.trim() }),
        "OTP request sent if an account exists for this phone."
      );

      if (wasOtpSent) {
        setOtpValues((current) => ({ ...current, otp: "", otpRequested: true }));
      }

      return;
    }

    await submitRequest(
      () =>
        verifyLoginOtp({
          phone: otpValues.phone.trim(),
          otp: otpValues.otp.trim()
        }),
      "OTP verified."
    );
  }, [otpValues, submitRequest]);

  return (
    <AuthShell
      eyebrow="Secure access"
      title="Sign in to a verified gold marketplace."
      description="Access your seller or jeweller account through a role-ready authentication flow built for privacy."
      cardTitle="Welcome back"
      cardDescription="Use email and password or mobile OTP. Private bidding data remains inside verified account areas."
      footer={
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>New to GoldWallah?</Text>
          <Pressable accessibilityRole="button" onPress={() => onRegisterPress("seller")}>
            <Text style={styles.footerLink}>Create an account</Text>
          </Pressable>
        </View>
      }
      onBack={onBack}
    >
      <AuthMethodTabs
        activeMethod={activeMethod}
        methods={authMethodOptions}
        onChange={(method) => {
          if (isSubmitting) {
            return;
          }

          setActiveMethod(method);
          clearFeedback();
        }}
      />

      {activeMethod === AUTH_METHODS.email ? (
        <View style={styles.formGroup}>
          <AuthTextField
            autoComplete="email"
            error={errors.email}
            inputMode="email"
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => updateEmailField("email", value)}
            placeholder="name@example.com"
            textContentType="emailAddress"
            value={emailValues.email}
          />
          <PasswordField
            error={errors.password}
            label="Password"
            onChangeText={(value) => updateEmailField("password", value)}
            placeholder="Enter your password"
            textContentType="password"
            value={emailValues.password}
          />
          <Pressable accessibilityRole="button" style={styles.forgotButton}>
            <Text style={styles.inlineLink}>Forgot password?</Text>
          </Pressable>
          <SubmitButton disabled={isSubmitting} onPress={handleEmailSubmit}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </SubmitButton>
        </View>
      ) : (
        <View style={styles.formGroup}>
          <AuthTextField
            autoComplete="tel"
            error={errors.phone}
            inputMode="tel"
            keyboardType="phone-pad"
            label="Phone number"
            onChangeText={(value) => updateOtpField("phone", value)}
            placeholder="+91 98765 43210"
            textContentType="telephoneNumber"
            value={otpValues.phone}
            editable={!isSubmitting && !otpValues.otpRequested}
          />
          {otpValues.otpRequested ? (
            <AuthTextField
              autoComplete="one-time-code"
              error={errors.otp}
              inputMode="numeric"
              keyboardType="number-pad"
              label="OTP"
              maxLength={6}
              onChangeText={(value) => updateOtpField("otp", value)}
              placeholder="Enter OTP"
              textContentType="oneTimeCode"
              value={otpValues.otp}
              editable={!isSubmitting}
            />
          ) : null}
          <SubmitButton disabled={isSubmitting} onPress={handleOtpSubmit}>
            {isSubmitting ? "Please wait..." : otpValues.otpRequested ? "Verify OTP" : "Send OTP"}
          </SubmitButton>
        </View>
      )}

      <SocialAuthSection mode="login" />
      <AuthNotice tone={statusTone}>{statusMessage}</AuthNotice>
    </AuthShell>
  );
}

function SocialAuthSection({ mode }) {
  return (
    <View style={styles.socialSection}>
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>{mode === "login" ? "Or continue with" : "Or create with"}</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialGrid}>
        <DisabledSocialButton label="Google" />
        <DisabledSocialButton label="Facebook" />
      </View>
      <Text style={styles.socialNote}>
        Social authentication requires provider credentials and backend token verification.
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

function SubmitButton({ children, disabled = false, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.submitButton, disabled ? styles.submitButtonDisabled : null]}
    >
      <Text style={styles.submitText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    gap: 14
  },
  forgotButton: {
    alignSelf: "flex-end",
    minHeight: 36,
    justifyContent: "center"
  },
  inlineLink: {
    color: colors.emerald,
    fontSize: 13,
    fontWeight: "900",
    textDecorationLine: "underline"
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
  submitButtonDisabled: {
    opacity: 0.7
  },
  submitText: {
    color: colors.background,
    fontSize: 15,
    fontWeight: "900"
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
