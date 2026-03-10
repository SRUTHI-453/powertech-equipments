/**
 * api.js — centralised API client
 * All HTTP calls to the Express backend live here.
 */

const BASE_URL = "/api";

/**
 * POST /api/enquiry
 * Sends the enquiry form data to the backend for validation.
 * Returns: { success, message, whatsappLink?, errors? }
 */
export async function submitEnquiry(payload) {
  const response = await fetch(`${BASE_URL}/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  // Attach HTTP status for caller to check
  return { ...data, status: response.status };
}

/**
 * GET /api/health
 * Simple health-check ping.
 */
export async function checkHealth() {
  const response = await fetch(`${BASE_URL}/health`);
  return response.json();
}
