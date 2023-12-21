import { createClient } from "contentful";

const space = process.env.CTF_SPACE!;
const accessToken = process.env.CTF_DELIVERY_API_TOKEN!;

export const client = createClient({
  space,
  accessToken,
});
