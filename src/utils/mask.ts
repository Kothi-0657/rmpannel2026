// src/utils/mask.ts
export const maskPhoneNumber = (number: string | undefined) => {
  if (!number) return "";
  const str = number.toString();
  if (str.length <= 4) return "*".repeat(str.length);
  return str.slice(0, 2) + "*".repeat(str.length - 4) + str.slice(-2);
};
