import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (process.env.CTF_WEBHOOK_TOKEN !== req.headers.get("token")) {
    return new Response("Invalid token", { status: 400 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/(portfolio)/gallery/[id]");
  revalidatePath("/(portfolio)/image/[id]");
  revalidatePath("/about");

  return new Response("Success!", { status: 200 });
}
