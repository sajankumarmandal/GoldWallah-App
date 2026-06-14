import { AUTH_ROLES, normalizeAuthRole } from "../constants/auth";
import { apiRequest } from "./apiClient";

const ROLE_API_VALUES = {
  [AUTH_ROLES.seller]: "SELLER",
  [AUTH_ROLES.jeweller]: "JEWELLER"
};

function toApiRole(role) {
  const normalizedRole = normalizeAuthRole(role);

  if (!normalizedRole) {
    throw new Error("Choose a valid account role.");
  }

  return ROLE_API_VALUES[normalizedRole];
}

function withApiRole(payload) {
  return {
    ...payload,
    role: toApiRole(payload.role)
  };
}

function normalizeAuthResponse(result) {
  const data = result?.data || {};
  const accessToken =
    data.accessToken ||
    data.token ||
    data.access_token ||
    data.tokens?.accessToken ||
    data.tokens?.access_token ||
    null;
  const user = data.user || result?.user || null;

  if (user && !accessToken) {
    throw new Error("Login session could not be created. Please check server JWT configuration.");
  }

  return {
    ...result,
    data: {
      ...data,
      user,
      accessToken
    }
  };
}

export async function loginUser(payload) {
  return normalizeAuthResponse(
    await apiRequest("auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    })
  );
}

export async function registerUser(payload) {
  return normalizeAuthResponse(
    await apiRequest("auth/register", {
      method: "POST",
      body: JSON.stringify(withApiRole(payload))
    })
  );
}

export async function sendLoginOtp(payload) {
  return apiRequest("auth/otp/login/send", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function verifyLoginOtp(payload) {
  return normalizeAuthResponse(
    await apiRequest("auth/otp/login/verify", {
      method: "POST",
      body: JSON.stringify(payload)
    })
  );
}

export async function sendRegisterOtp(payload) {
  return apiRequest("auth/otp/register/send", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function verifyRegisterOtp(payload) {
  return normalizeAuthResponse(
    await apiRequest("auth/otp/register/verify", {
      method: "POST",
      body: JSON.stringify(withApiRole(payload))
    })
  );
}
