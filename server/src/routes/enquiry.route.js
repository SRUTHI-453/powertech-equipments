const express = require("express");
const { enquirySchema } = require("../validators/enquiry.validator");

const router = express.Router();

/**
 * Validation middleware
 * Runs Joi schema against req.body and returns structured errors if invalid.
 */
function validateEnquiry(req, res, next) {
  const { error, value } = enquirySchema.validate(req.body, {
    abortEarly: false,   // collect ALL errors, not just the first
    stripUnknown: true,  // remove any extra fields the client sends
  });

  if (error) {
    // Build a field-keyed error map: { name: "...", phone: "..." }
    const errors = {};
    error.details.forEach((detail) => {
      const field = detail.path[0];
      if (!errors[field]) errors[field] = detail.message;
    });

    return res.status(422).json({
      success: false,
      message: "Validation failed. Please correct the errors below.",
      errors,
    });
  }

  // Attach sanitised value to request for downstream use
  req.validatedBody = value;
  next();
}

/**
 * POST /api/enquiry
 * Accepts a validated enquiry and builds the WhatsApp deep-link URL.
 * In production you could also: save to DB, send an email, call Twilio, etc.
 */
router.post("/", validateEnquiry, (req, res) => {
  const { name, phone, service, message } = req.validatedBody;

  // Normalise phone – strip leading + for wa.me
  const normalised = phone.replace(/^\+/, "");
  const waNumber = "919381005788";

  const waText = [
    `Hello, I am ${name} (${phone}).`,
    `I am enquiring about: *${service}*.`,
    message ? `\nMessage: ${message}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

  // Log the enquiry (replace with DB write / email in production)
  console.log(`[ENQUIRY] ${new Date().toISOString()} | ${name} | ${phone} | ${service}`);

  return res.status(200).json({
    success: true,
    message: "Enquiry received. Redirecting to WhatsApp.",
    whatsappLink: waLink,
    data: { name, phone, service, message },
  });
});

module.exports = router;
