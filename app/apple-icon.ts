import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = {
  width: 1254,
  height: 1254,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await readFile(
    path.join(process.cwd(), "public", "images", "logobb.png"),
  );

  return new Response(new Uint8Array(logo), {
    headers: {
      "Content-Type": contentType,
    },
  });
}
