export const AUTH_METHODS = {
  email: "email",
  mobile: "mobile"
};

export const AUTH_ROLES = {
  seller: "seller",
  jeweller: "jeweller"
};

export const DEFAULT_AUTH_ROLE = AUTH_ROLES.seller;

export const authMethodOptions = [
  { value: AUTH_METHODS.email, label: "Email" },
  { value: AUTH_METHODS.mobile, label: "Mobile OTP" }
];

export const roleOptions = [
  {
    value: AUTH_ROLES.seller,
    label: "Seller",
    detail: "KYC required before listing gold."
  },
  {
    value: AUTH_ROLES.jeweller,
    label: "Jeweller",
    detail: "KYC and business review required before bidding."
  }
];

export function normalizeAuthRole(role) {
  if (typeof role !== "string") {
    return "";
  }

  const normalizedRole = role.trim().toLowerCase();

  if (normalizedRole === AUTH_ROLES.seller) {
    return AUTH_ROLES.seller;
  }

  if (normalizedRole === AUTH_ROLES.jeweller || normalizedRole === "jeweler") {
    return AUTH_ROLES.jeweller;
  }

  return "";
}
