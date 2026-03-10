import { useState } from "react";
import { submitEnquiry } from "../services/api";
import { validateEnquiry, SERVICES } from "../utils/validation";
import WAIcon from "./WAIcon";
import styles from "./ContactForm.module.css";

const INITIAL_FORM = {
  name: "",
  phone: "",
  service: SERVICES[0],
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});    // field-keyed error messages
  const [touched, setTouched] = useState({});  // tracks which fields user has visited
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null); // top-level server error
  const [success, setSuccess] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const getFieldError = (field) => touched[field] && errors[field];

  const revalidateField = (field, value) => {
    const errs = validateEnquiry({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) revalidateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    revalidateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // 1. Run client-side validation first (fast feedback)
    const allTouched = { name: true, phone: true, service: true, message: true };
    setTouched(allTouched);
    const clientErrors = validateEnquiry(form);
    setErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) return; // stop — don't hit network

    setSubmitting(true);

    try {
      // 2. Send to backend — authoritative validation happens here
      const result = await submitEnquiry(form);

      if (result.success && result.whatsappLink) {
        // Open WhatsApp with the pre-filled message
        window.open(result.whatsappLink, "_blank");
        setSuccess(true);
        setForm(INITIAL_FORM);
        setTouched({});
        setErrors({});
        setTimeout(() => setSuccess(false), 5000);
      } else if (result.status === 422 && result.errors) {
        // Backend returned field-level validation errors
        setErrors(result.errors);
        setTouched(allTouched); // show all errors
      } else if (result.status === 429) {
        setServerError("Too many submissions. Please wait a few minutes and try again.");
      } else {
        setServerError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const fieldClass = (field) =>
    [styles.input, getFieldError(field) ? styles.inputError : touched[field] && !errors[field] ? styles.inputSuccess : ""]
      .filter(Boolean)
      .join(" ");

  return (
    <div className={styles.box}>
      <h3 className={styles.heading}>Quick Enquiry</h3>

      {success && (
        <div className={styles.banner + " " + styles.bannerSuccess}>
          ✅ Enquiry sent! Opening WhatsApp for you…
        </div>
      )}

      {serverError && (
        <div className={styles.banner + " " + styles.bannerError}>
          ⚠ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className={styles.group}>
          <label className={styles.label}>
            Your Name <span className={styles.required}>*</span>
          </label>
          <input
            className={fieldClass("name")}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Ravichandran"
            autoComplete="name"
          />
          {getFieldError("name") && (
            <p className={styles.error}>⚠ {errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div className={styles.group}>
          <label className={styles.label}>
            Phone Number <span className={styles.required}>*</span>
          </label>
          <input
            className={fieldClass("phone")}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+91 XXXXX XXXXX"
            autoComplete="tel"
          />
          {getFieldError("phone") && (
            <p className={styles.error}>⚠ {errors.phone}</p>
          )}
        </div>

        {/* Service */}
        <div className={styles.group}>
          <label className={styles.label}>Service Required</label>
          <select
            className={styles.input}
            name="service"
            value={form.service}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className={styles.group}>
          <label className={styles.label}>Message</label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="message"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe your requirement…"
          />
          {getFieldError("message") && (
            <p className={styles.error}>⚠ {errors.message}</p>
          )}
          {form.message.length > 800 && (
            <p className={styles.charCount}>
              {form.message.length}/1000
            </p>
          )}
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={submitting}
        >
          {submitting ? (
            <span className={styles.spinner}>Sending…</span>
          ) : (
            <>
              <WAIcon size={18} color="#0D0D0D" />
              Send via WhatsApp →
            </>
          )}
        </button>

        <p className={styles.hint}>* Name and phone number are required</p>
      </form>
    </div>
  );
}
