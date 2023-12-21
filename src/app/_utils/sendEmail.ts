import { z } from "zod";

export type EmailForm = z.infer<typeof schema>;

export const schema = z.object({
  email: z.string().email(),
  name: z.string(),
  message: z.string(),
});

export const sendEmail = async (form: EmailForm) => {
  const response = await fetch(`${process.env.URL}/api/email`, {
    method: "POST",
    body: JSON.stringify(form),
  });

  const data = await response.json();

  return data;
};
