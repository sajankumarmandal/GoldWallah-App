import { normalizeAuthRole } from "../constants/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIAN_PHONE_PATTERN = /^(\+91[\s-]?)?[6-9]\d{9}$/;
const OTP_PATTERN = /^(\d{4}|\d{6})$/;
const FULL_NAME_PATTERN = /^[\p{L}\p{M}.' -]+$/u;
const MIN_PASSWORD_LENGTH = 10;
const MAX_PASSWORD_LENGTH = 128;

function validateFullName(fullName) {
  const trimmedName = fullName.trim();

  if (!trimmedName) {
    return "Full name is required.";
  }

  if (trimmedName.length < 2) {
    return "Full name must be at least 2 characters.";
  }

  if (trimmedName.length > 120) {
    return "Full name is too long.";
  }

  if (!FULL_NAME_PATTERN.test(trimmedName)) {
    return "Use letters, spaces, apostrophes, periods, or hyphens only.";
  }

  return "";
}

function validatePassword(password) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (password.length > MAX_PASSWORD_LENGTH) {
    return "Password is too long.";
  }

  if (/^\s|\s$/.test(password)) {
    return "Password cannot start or end with spaces.";
  }

  return "";
}

function validateEmail(email) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Email is required.";
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return "Enter a valid email address.";
  }

  return "";
}

function validatePhone(phone) {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    return "Phone number is required.";
  }

  if (!INDIAN_PHONE_PATTERN.test(trimmedPhone)) {
    return "Enter a valid Indian mobile number.";
  }

  return "";
}

function validateOtp(otp) {
  const trimmedOtp = otp.trim();

  if (!trimmedOtp) {
    return "OTP is required.";
  }

  if (!OTP_PATTERN.test(trimmedOtp)) {
    return "OTP must be 4 or 6 digits.";
  }

  return "";
}

function validateRole(role) {
  return normalizeAuthRole(role) ? "" : "Choose a valid account role.";
}

export function validateLoginEmail(values) {
  const errors = {};
  const emailError = validateEmail(values.email);

  if (emailError) {
    errors.email = emailError;
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }

  return errors;
}

export function validateLoginOtp(values) {
  const errors = {};
  const phoneError = validatePhone(values.phone);

  if (phoneError) {
    errors.phone = phoneError;
  }

  if (values.otpRequested) {
    const otpError = validateOtp(values.otp);

    if (otpError) {
      errors.otp = otpError;
    }
  }

  return errors;
}

export function validateRegisterEmail(values) {
  const errors = {};
  const fullNameError = validateFullName(values.fullName);
  const emailError = validateEmail(values.email);
  const phoneError = validatePhone(values.phone);
  const passwordError = validatePassword(values.password);
  const roleError = validateRole(values.role);

  if (fullNameError) {
    errors.fullName = fullNameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (phoneError) {
    errors.phone = phoneError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords must match.";
  }

  if (roleError) {
    errors.role = roleError;
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "Accept the verification terms to continue.";
  }

  return errors;
}

export function validateRegisterOtp(values) {
  const errors = {};
  const fullNameError = validateFullName(values.fullName);
  const phoneError = validatePhone(values.phone);
  const roleError = validateRole(values.role);

  if (fullNameError) {
    errors.fullName = fullNameError;
  }

  if (phoneError) {
    errors.phone = phoneError;
  }

  if (roleError) {
    errors.role = roleError;
  }

  if (values.otpRequested) {
    const otpError = validateOtp(values.otp);

    if (otpError) {
      errors.otp = otpError;
    }
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "Accept the verification terms to continue.";
  }

  return errors;
}
