export const toDataURL = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.clone().blob();
  const text = await response.arrayBuffer();

  const buffer = Buffer.from(text);
  const base64 = buffer.toString("base64");

  return `data:${blob.type};base64,${base64}`;
};
