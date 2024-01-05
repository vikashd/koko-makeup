"use server";

import { schema, type EmailForm, sendEmail } from "@/app/_utils/sendEmail";
import { ZodFormattedError } from "zod";

export type EmailFormErrors = ZodFormattedError<EmailForm>;

export type SubmitResponse =
  | { type: "invalid"; validated: EmailFormErrors }
  | { type: "submitted" | "error" | "valid" };

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

  try {
    await sendEmail(data);

    return { type: "submitted" };
  } catch (e) {
    return { type: "error" };
  }
};
