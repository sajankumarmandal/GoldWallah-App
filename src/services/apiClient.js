import { Platform } from "react-native";

import { buildApiUrl } from "../config/env";

let csrfToken = "";
let csrfTokenPromise = null;

function isUnsafeHttpMethod(method) {
  return !["GET", "HEAD", "OPTIONS"].includes(method);
}

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json().catch(() => null);
  }

  return response.text().catch(() => "");
}

async function fetchCsrfToken() {
  if (!csrfTokenPromise) {
    csrfTokenPromise = fetch(buildApiUrl("auth/csrf"), {
      credentials: "include"
    })
      .then(async (response) => {
        const body = await parseResponseBody(response);

        if (!response.ok || !body?.data?.csrfToken) {
          throw new Error("Unable to initialize request protection.");
        }

        csrfToken = body.data.csrfToken;
        return csrfToken;
      })
      .finally(() => {
        csrfTokenPromise = null;
      });
  }

  return csrfTokenPromise;
}

async function csrfHeaderFor(method) {
  if (!isUnsafeHttpMethod(method) || Platform.OS !== "web") {
    return {};
  }

  return {
    "X-CSRF-Token": csrfToken || (await fetchCsrfToken())
  };
}

function createApiError(response, body) {
  const message =
    body?.message ||
    body?.error?.message ||
    "Request failed. Please try again.";
  const error = new Error(message);
  error.status = response.status;
  error.code = body?.error?.code || "";
  error.details = body?.error?.details;
  return error;
}

async function executeApiRequest(path, options, allowCsrfRetry) {
  const { query, headers, body, ...fetchOptions } = options;
  const method = (fetchOptions.method || "GET").toUpperCase();
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const csrfHeaders = await csrfHeaderFor(method);
  const response = await fetch(buildApiUrl(path, query), {
    credentials: "include",
    ...fetchOptions,
    method,
    body,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...csrfHeaders,
      ...headers
    }
  });
  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    const errorCode = responseBody?.error?.code || "";

    if (
      allowCsrfRetry &&
      response.status === 403 &&
      ["INVALID_CSRF_TOKEN", "CSRF_HEADER_REQUIRED"].includes(errorCode)
    ) {
      csrfToken = "";
      await fetchCsrfToken();
      return executeApiRequest(path, options, false);
    }

    throw createApiError(response, responseBody);
  }

  return responseBody;
}

export async function apiRequest(path, options = {}) {
  return executeApiRequest(path, options, true);
}
