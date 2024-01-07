import { z } from "zod";

export type EmailForm = z.infer<typeof schema>;

export const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }),
  name: z.string().trim().min(1, "Enter your name"),
  message: z.string().trim().min(1, "Enter a message"),
});

export const sendEmail = async (form: EmailForm) => {
  const response = await fetch(`${process.env.URL}/api/email`, {
    method: "POST",
    body: JSON.stringify(form),
  });

  const data = await response.json();

  return data;
};
