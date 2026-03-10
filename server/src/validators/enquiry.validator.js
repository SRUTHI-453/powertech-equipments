const Joi = require("joi");

const SERVICES = [
  "UPS Supply & Installation",
  "Inverter Purchase",
  "UPS Repair / Service",
  "Inverter Repair / Service",
  "General Enquiry",
];

/**
 * Joi schema for POST /api/enquiry
 * Mirrors the client-side validation — this is the authoritative backend source of truth.
 */
const enquirySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(80)
    .pattern(/^[a-zA-Z\s.'\-]+$/)
    .required()
    .messages({
      "string.empty": "Name is required.",
      "any.required": "Name is required.",
      "string.min": "Name must be at least 2 characters.",
      "string.max": "Name must be at most 80 characters.",
      "string.pattern.base": "Name can only contain letters and basic punctuation.",
    }),

  phone: Joi.string()
    .trim()
    .replace(/[\s\-()]/g, "")
    .pattern(/^(\+91)?[6-9]\d{9}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
      "string.pattern.base":
        "Enter a valid 10-digit Indian mobile number (starting with 6–9).",
    }),

  service: Joi.string()
    .valid(...SERVICES)
    .required()
    .messages({
      "any.only": "Please select a valid service.",
      "any.required": "Service is required.",
    }),

  message: Joi.string().trim().max(1000).allow("").optional().messages({
    "string.max": "Message must be at most 1000 characters.",
  }),
});

module.exports = { enquirySchema, SERVICES };
