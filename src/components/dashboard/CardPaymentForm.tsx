import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormValues {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface FormErrors {
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
  return digits;
}

function detectNetwork(number: string): "visa" | "mastercard" | "amex" | null {
  const n = number.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  return null;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const digits = values.cardNumber.replace(/\s/g, "");

  if (!digits) {
    errors.cardNumber = "Card number is required.";
  } else if (digits.length < 16) {
    errors.cardNumber = "Enter a valid 16-digit card number.";
  }

  if (!values.expiry) {
    errors.expiry = "Expiry date is required.";
  } else {
    const [mm, yy] = values.expiry.split("/");
    const month = parseInt(mm, 10);
    const year = parseInt("20" + yy, 10);
    const now = new Date();
    const expDate = new Date(year, month - 1, 1);
    if (!mm || !yy || yy.length < 2 || month < 1 || month > 12) {
      errors.expiry = "Enter a valid expiry (MM/YY).";
    } else if (expDate < new Date(now.getFullYear(), now.getMonth(), 1)) {
      errors.expiry = "Card has expired.";
    }
  }

  if (!values.cvv) {
    errors.cvv = "CVV is required.";
  } else if (values.cvv.length < 3) {
    errors.cvv = "CVV must be 3–4 digits.";
  }

  return errors;
}

// ─── Network icon ─────────────────────────────────────────────────────────────

const NetworkIcon: React.FC<{ network: ReturnType<typeof detectNetwork> }> = ({ network }) => {
  if (!network) return null;

  if (network === "visa") {
    return (
      <img
        src="https://storage.googleapis.com/tempo-image-previews/figma-exports%2Fuser_35fimNlXhOium67GLLJVWNU4rKV-1776729518532-node-3%3A855-1776729517167.png"
        alt="Visa"
        className="h-4 w-auto object-contain shrink-0"
      />
    );
  }

  if (network === "mastercard") {
    return (
      <div className="flex shrink-0">
        <div className="w-4 h-4 bg-[#e33a24] rounded-full" />
        <div className="w-4 h-4 bg-[#f7cb2e]/80 rounded-full -ml-2" />
      </div>
    );
  }

  if (network === "amex") {
    return (
      <span className="text-brand text-[9px] font-bold font-inter shrink-0 tracking-wider">
        AMEX
      </span>
    );
  }

  return null;
};

// ─── Input field ──────────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  error?: string;
  touched: boolean;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, error, touched, children }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-ink-secondary text-[13px] font-normal font-inter">{label}</p>
    {children}
    {touched && error && (
      <p className="text-danger text-[10px] font-inter leading-tight">{error}</p>
    )}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

type Status = "idle" | "success" | "draft";

const CardPaymentForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({ cardNumber: "", expiry: "", cvv: "" });
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    cardNumber: false,
    expiry: false,
    cvv: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [showCvv, setShowCvv] = useState(false);

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;
  const network = detectNetwork(values.cardNumber);

  function handleBlur(field: keyof FormValues) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function handleCardNumber(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus("idle");
    setValues((v) => ({ ...v, cardNumber: formatCardNumber(e.target.value) }));
  }

  function handleExpiry(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus("idle");
    setValues((v) => ({ ...v, expiry: formatExpiry(e.target.value) }));
  }

  function handleCvv(e: React.ChangeEvent<HTMLInputElement>) {
    setStatus("idle");
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setValues((v) => ({ ...v, cvv: raw }));
  }

  function touchAll() {
    setTouched({ cardNumber: true, expiry: true, cvv: true });
  }

  function handleSend() {
    touchAll();
    if (!isValid) return;
    setStatus("success");
  }

  function handleDraft() {
    setStatus("draft");
  }

  const inputBase =
    "w-full bg-surface-icon rounded-md px-4 py-2.5 text-white text-[12.8px] font-normal font-inter outline-none transition-all placeholder:text-ink-muted focus:ring-1";

  return (
    <div className="flex flex-col gap-4 mt-1">

      {/* Card Number */}
      <Field label="Card Number" error={errors.cardNumber} touched={touched.cardNumber}>
        <div
          className={`flex items-center gap-2 bg-surface-icon rounded-md px-4 py-2.5 transition-all
            focus-within:ring-1 ${touched.cardNumber && errors.cardNumber
              ? "ring-1 ring-danger"
              : "focus-within:ring-brand"
            }`}
        >
          <input
            type="text"
            inputMode="numeric"
            placeholder="XXXX XXXX XXXX XXXX"
            value={values.cardNumber}
            onChange={handleCardNumber}
            onBlur={() => handleBlur("cardNumber")}
            maxLength={19}
            className="flex-1 bg-transparent text-white text-[12.8px] font-normal font-inter outline-none placeholder:text-ink-muted min-w-0"
          />
          <NetworkIcon network={network} />
        </div>
      </Field>

      {/* Expiry + CVV */}
      <div className="flex gap-3">
        <Field label="Expiry Date" error={errors.expiry} touched={touched.expiry}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            value={values.expiry}
            onChange={handleExpiry}
            onBlur={() => handleBlur("expiry")}
            maxLength={5}
            className={`${inputBase} ${touched.expiry && errors.expiry
              ? "ring-1 ring-danger"
              : "focus:ring-brand"
              }`}
          />
        </Field>

        <Field label="CVV" error={errors.cvv} touched={touched.cvv}>
          <div
            className={`flex items-center bg-surface-icon rounded-md px-4 py-2.5 transition-all
              focus-within:ring-1 ${touched.cvv && errors.cvv
                ? "ring-1 ring-danger"
                : "focus-within:ring-brand"
              }`}
          >
            <input
              type={showCvv ? "text" : "password"}
              inputMode="numeric"
              placeholder="•••"
              value={values.cvv}
              onChange={handleCvv}
              onBlur={() => handleBlur("cvv")}
              maxLength={4}
              className="flex-1 bg-transparent text-white text-[12.8px] font-normal font-inter outline-none placeholder:text-ink-muted min-w-0 w-0"
            />
            <button
              type="button"
              onClick={() => setShowCvv((s) => !s)}
              className="text-ink-muted hover:text-white transition-colors text-[10px] shrink-0 ml-1"
              tabIndex={-1}
              aria-label={showCvv ? "Hide CVV" : "Show CVV"}
            >
              {showCvv ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </Field>
      </div>

      {/* Status feedback */}
      {status === "success" && (
        <div className="bg-brand/15 border border-brand/40 rounded-md px-4 py-2.5 text-center">
          <p className="text-brand text-[11px] font-inter">Payment sent successfully!</p>
        </div>
      )}
      {status === "draft" && (
        <div className="bg-surface-icon border border-white/10 rounded-md px-4 py-2.5 text-center">
          <p className="text-ink-secondary text-[11px] font-inter">Draft saved.</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSend}
          className={`flex-1 text-white text-[10.1px] font-normal font-inter py-2.5 rounded-[5px] transition-opacity
            ${isValid ? "bg-brand hover:opacity-90" : "bg-brand/50 cursor-not-allowed"}`}
        >
          Send Money
        </button>
        <button
          type="button"
          onClick={handleDraft}
          className="flex-1 bg-surface-icon hover:bg-surface-hover text-white text-[10.1px] font-normal font-inter py-2.5 rounded-[5px] transition-colors"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default CardPaymentForm;
