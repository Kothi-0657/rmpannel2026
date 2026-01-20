export async function validateRMEmail(email: string): Promise<boolean> {
  const res = await fetch(
    `https://script.google.com/macros/s/AKfycbzd-GnVfs1BcgL6TJM22vQw0KaW-8PEcUgaPkuxnkZ8yqKI87ncu7bBHEz6bu34Lid0/exec?action=validateRM&email=${encodeURIComponent(
      email
    )}`
  );

  if (!res.ok) {
    throw new Error("API error");
  }

  const data = await res.json();
  return data.allowed === true;
}
