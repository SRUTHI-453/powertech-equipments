/**
 * validation.js
 * Client-side validation that mirrors the backend Joi schema exactly.
 * This gives instant feedback; the backend remains the authoritative source.
 */

export const SERVICES = [
  "UPS Supply & Installation",
  "Inverter Purchase",
  "UPS Repair / Service",
  "Inverter Repair / Service",
  "General Enquiry",
];

/**
 * Validates the enquiry form fields.
 * @param {{ name: string, phone: string, service: string, message: string }} fields
 * @returns {{ [field]: string }} — object of field-keyed error messages (empty = valid)
 */
export function validateEnquiry({ name = "", phone = "", service = "", message = "" }) {
  const errors = {};

  // ── Name ──────────────────────────────────────────────────────────────────
  const trimmedName = name.trim();
  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (trimmedName.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (trimmedName.length > 80) {
    errors.name = "Name must be at most 80 characters.";
  } else if (!/^[a-zA-Z\s.'\-]+$/.test(trimmedName)) {
    errors.name = "Name can only contain letters and basic punctuation.";
  }

  // ── Phone ─────────────────────────────────────────────────────────────────
  const trimmedPhone = phone.trim().replace(/[\s\-()]/g, "");
  if (!trimmedPhone) {
    errors.phone = "Phone number is required.";
  } else if (!/^(\+91)?[6-9]\d{9}$/.test(trimmedPhone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (starting with 6–9).";
  }

  // ── Service ───────────────────────────────────────────────────────────────
  if (!service || !SERVICES.includes(service)) {
    errors.service = "Please select a valid service.";
  }

  // ── Message (optional but bounded) ───────────────────────────────────────
  if (message && message.trim().length > 1000) {
    errors.message = "Message must be at most 1000 characters.";
  }

  return errors;
}
