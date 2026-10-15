"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { sendContact, type ContactState } from "@/app/actions/contact";

export function ContactForm() {
  const t = useTranslations("form");
  const [state, action, pending] = useActionState<ContactState | null, FormData>(
    sendContact,
    null,
  );

  return (
    <form className="contact-form" action={action} noValidate>
      <div className="name-row">
        <label>
          <span>{t("firstName")}</span>
          <input name="firstName" type="text" autoComplete="given-name" required />
        </label>
        <label>
          <span>{t("lastName")}</span>
          <input name="lastName" type="text" autoComplete="family-name" required />
        </label>
      </div>
      <label>
        <span>{t("email")}</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        <span>{t("message")}</span>
        <textarea name="message" rows={6} required />
      </label>
      <label className="honey" aria-hidden="true">
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" disabled={pending}>
        {pending ? t("sending") : t("submit")}
      </button>
      {state ? (
        <p
          className={state.status === "success" ? "form-note ok" : "form-note"}
          role="status"
        >
          {t(state.status)}
        </p>
      ) : null}
    </form>
  );
}
