"use server";

import { schema, type EmailForm, sendEmail } from "@/app/_utils/sendEmail";

export const submitContactForm = async (previous: any, formData: FormData) => {
  const data: EmailForm = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    message: formData.get("message") as string,
  };

  const validated = schema.safeParse(data);

  if (!validated.success) {
    console.log(validated);
    return { type: "Invalid" };
  }

  try {
    const response = await sendEmail(data);

    return { type: "submitted" };
  } catch (e) {
    return { type: "error" };
  }
};
