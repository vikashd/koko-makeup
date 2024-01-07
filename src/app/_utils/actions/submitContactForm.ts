"use server";

import { schema, type EmailForm, sendEmail } from "@/app/_utils/sendEmail";
import { ZodFormattedError } from "zod";

export type EmailFormErrors = ZodFormattedError<EmailForm>;

export type SubmitResponse =
  | { type: "invalid"; validated: EmailFormErrors }
  | { type: "submitted" | "error" | "valid"; message?: string };

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
  } catch (e: any) {
    return {
      type: "error",
      message: `get recaptcha, ${e.toString()}, token: ${token}`,
    };
  }

  try {
    const recaptchaResponse = await response.json();
    console.log(recaptchaResponse);

    if (recaptchaResponse?.success && recaptchaResponse?.score > 0.5) {
      await sendEmail(data);
    } else {
      return {
        type: "error",
        message: `send email, ${JSON.stringify(recaptchaResponse)}`,
      };
    }

    return { type: "submitted" };
  } catch (e: any) {
    return { type: "error", message: `fetch email, ${e.toString()}` };
  }
};
