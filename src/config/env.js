const publicEnv = typeof process !== "undefined" ? process.env : {};

export const env = {
  apiBaseUrl: publicEnv.EXPO_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  appName: publicEnv.EXPO_PUBLIC_APP_NAME || "GoldWallah"
};

export function buildApiUrl(path, query) {
  const baseUrl =
    env.apiBaseUrl.startsWith("http") || typeof globalThis.location === "undefined"
      ? env.apiBaseUrl
      : `${globalThis.location.origin}${env.apiBaseUrl}`;
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const queryString = query
    ? Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null && value !== "")
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join("&")
    : "";

  return `${normalizedBaseUrl}${normalizedPath}${queryString ? `?${queryString}` : ""}`;
}
