"use server";

import { schema, type EmailForm, sendEmail } from "@/app/_utils/sendEmail";
import { ZodFormattedError } from "zod";

export type EmailFormErrors = ZodFormattedError<EmailForm>;

export type SubmitResponse =
  | { type: "invalid"; validated: EmailFormErrors }
  | { type: "submitted" | "error" | "valid" };

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export const submitContactForm = async (
  previous: any,
  formData: FormData
): Promise<SubmitResponse> => {
  const data: EmailForm = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    message: formData.get("message") as string,
  };

  const validated = schema.safeParse(data);

  if (!validated.success) {
    return { type: "invalid", validated: validated.error.format() };
  }

  const token = formData.get("recaptcha-token");
  let response;

  try {
    response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  } catch (e) {
    return { type: "error" };
  }

  try {
    const recaptchaResponse = await response.json();

    if (recaptchaResponse?.success && recaptchaResponse?.score > 0.5) {
      await sendEmail(data);
    } else {
      return { type: "error" };
    }

    return { type: "submitted" };
  } catch (e) {
    return { type: "error" };
  }
};
